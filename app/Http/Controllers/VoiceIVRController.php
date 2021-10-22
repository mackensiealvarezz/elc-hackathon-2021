<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Twilio\TwiML\VoiceResponse;
use App\Events\CartUpdatedEvent;
use App\Events\SearchProductListEvent;
use App\Events\ShowProductDetailEvent;

class VoiceIVRController extends Controller
{

    public function greetings(Request $request)
    {

        $userId = Str::after($request->UserIdentifier, 'client:');
        $user = User::find($userId);

        return [
            'actions' => [
                [
                    'say' => "Welcome to Tom Ford Beauty. I can help you with shopping or viewing your cart. What can I help you with {$user->name}?"
                ],
                [
                    'listen' => true
                ]
            ]
        ];
    }

    public function shopping(Request $request)
    {
        return [
            'actions' => [
                [
                    'say' => "Would you like to filter by categories or search a certain product?"
                ],
                [
                    'listen' => true
                ]
            ]
        ];
    }


    public function getCategoryProducts($user_id, $category)
    {
        event(new SearchProductListEvent($user_id, [strtolower($category)]));

        $products = Product::whereJsonContains('categories', [strtolower($category)])
            ->limit(9)
            ->pluck('name')
            ->toArray();

        $productNames = implode(',', $products);

        return [
            'actions' => [
                [
                    'say' => "We have {$productNames}. Which one are you interested in?"
                ],
                [
                    "listen" => true
                ]
            ]
        ];
    }



    public function categories(Request $request)
    {
        $category = $request->Field_category_Value ?? null;

        if ($category) {
            return $this->getCategoryProducts(Str::after($request->UserIdentifier, 'client:'), $category);
        }

        event(new SearchProductListEvent(Str::after($request->UserIdentifier, 'client:'), []));

        return [

            "actions" => [
                [
                    "collect" => [
                        "name" => "collect_category",
                        "questions" => [

                            [
                                "question" => "What categories are you interested in?",
                                "name" => "category",
                                "type" => "Category",
                                "validate" => [
                                    "on_failure" => [
                                        "messages" => [
                                            [
                                                "say" => "Sorry, that's not a category that we have. We currently have products for fragrance, best sellers, signature and candles"
                                            ]
                                        ],
                                        "repeat_question" => true
                                    ],
                                    "on_success" => [
                                        "say" => "Great, I've got the category type you want."
                                    ],
                                    "max_attempts" => [
                                        "redirect" => "task://collect_fallback",
                                        "num_attempts" => 3
                                    ]
                                ]
                            ],

                        ],
                        "on_complete" => [
                            "redirect" => "https://8693-108-50-216-233.ngrok.io/api/voice/process_categories"
                        ]
                    ]
                ]
            ]
        ];
    }

    public function process_categories(Request $request)
    {

        $json = $request->Memory;
        $data = json_decode($json, true);
        $category = $data['twilio']['collected_data']['collect_category']['answers']['category']['answer'];
        return $this->getCategoryProducts(Str::after($request->UserIdentifier, 'client:'), $category);
    }

    public function viewProduct(Request $request)
    {

        $product_name = $request->Field_product_Value ?? null;
        event(new ShowProductDetailEvent(Str::after($request->UserIdentifier, 'client:'), $product_name));

        $product = Product::whereName($product_name)->first();

        return [
            'actions' => [
                [
                    'say' => "{$product->name}. {$product->description}. Product details, {$product->item_detail}. This product cost {$product->price}."
                ],
                [
                    'say' => "To Add to cart say: Purchase {$product->name}."
                ],
                [
                    'listen' => true
                ]
            ]
        ];
    }


    public function purchase(Request $request)
    {
        $product_name = $request->Field_product_Value ?? null;
        $user = User::find(Str::after($request->UserIdentifier, 'client:'));
        $product = Product::whereName($product_name)->first();
        $user->currentCart()->addProduct($product->id);

        return [
            'actions' => [
                [
                    'say' => "Awesome, we added {$product->name} to your cart."
                ],
                [
                    'say' => 'Would you like to continue shopping or view your cart?'
                ],
                [
                    'listen' => true
                ]
            ]
        ];
    }

    public function viewCart(Request $request)
    {

        $user = User::find(Str::after($request->UserIdentifier, 'client:'));
        $cart = $user->currentCart()->load('products');

        $products = $cart->products;

        return [
            'actions' => [
                [
                    'say' => "You have {$products->count()} products in your cart."
                ],
                [
                    'listen' => true
                ]
            ]
        ];
    }

    public function validate_pin(Request $request)
    {
        $user = User::where('pin', $request->CurrentInput)->first();
        if ($user) {
            return ['valid' => true];
        }
        return ['valid' => false];
    }

    public function collect(Request $request)
    {
        $json = $request->Memory;
        $data = json_decode($json, true);

        $user = User::where('pin', $data['twilio']['collected_data']['collect_clothes_order']['answers']['pin']['answer'])->first();
        $parentCategory = $data['twilio']['collected_data']['collect_clothes_order']['answers']['gender']['answer'];

        event(new SearchProductListEvent($user->id, [$parentCategory]));

        return [
            "actions" => [
                [
                    "collect" => [
                        "name" => "collect_clothes_order",
                        "questions" => [
                            [
                                "question" => "Welcome {$user->name}",
                                "name" => "pin",
                                "type" => "Twilio.NUMBER",
                                "validate" => [
                                    "webhook" => [
                                        "url" => "https://8693-108-50-216-233.ngrok.io/api/voice/validate_pin",
                                        "method" => "POST"
                                    ]
                                ]
                            ],
                            [
                                "question" => "What type of clothes would you like?",
                                "name" => "clothes_type",
                                "type" => "Clothing",
                                "validate" => [
                                    "on_failure" => [
                                        "messages" => [
                                            [
                                                "say" => "Sorry, that's not a clothing type we have. We have shirts, shoes, pants, skirts, and dresses."
                                            ]
                                        ],
                                        "repeat_question" => true
                                    ],
                                    "on_success" => [
                                        "say" => "Great, I've got the clothing type you want."
                                    ],
                                    "max_attempts" => [
                                        "redirect" => "task://collect_fallback",
                                        "num_attempts" => 3
                                    ]
                                ]
                            ],
                            [
                                "question" => "How many would you like to order?",
                                "name" => "num_clothes",
                                "type" => "Twilio.NUMBER"
                            ]
                        ],
                        "on_complete" => [
                            "redirect" => "https://8693-108-50-216-233.ngrok.io/api/voice/collect"
                        ]
                    ]
                ]
            ]
        ];
    }

    public function dynamicsay()
    {
        return [

            "actions" => [
                [
                    "collect" => [
                        "name" => "collect_clothes_order",
                        "questions" => [
                            [
                                "question" => "what is your pin?",
                                "name" => "pin",
                                "type" => "Twilio.NUMBER",
                                "validate" => [
                                    "webhook" => [
                                        "url" => "https://8693-108-50-216-233.ngrok.io/api/voice/validate_pin",
                                        "method" => "POST"
                                    ]
                                ]
                            ],
                            [
                                "question" => "Are you interested in shopping for women or men?",
                                "name" => "gender",
                                "type" => "Gender",
                                "validate" => [
                                    "on_failure" => [
                                        "messages" => [
                                            [
                                                "say" => "Sorry, our categories are broken down into women or men"
                                            ]
                                        ],
                                        "repeat_question" => true
                                    ],
                                    "on_success" => [
                                        "say" => "Great, Let me gather that information."
                                    ],
                                    "max_attempts" => [
                                        "redirect" => "task://collect_fallback",
                                        "num_attempts" => 3
                                    ]
                                ]
                            ],
                        ],
                        "on_complete" => [
                            "redirect" => "https://8693-108-50-216-233.ngrok.io/api/voice/collect"
                        ]
                    ]
                ]
            ]
        ];
    }



    public function answer()
    {
        $response = new VoiceResponse;
        $gather = $response->gather(
            [
                'numDigits' => 3,
                'action' => route('voice.pin')
            ]
        );

        $gather->say(
            'Welcome Tom Ford Beauty, please enter in your pin to continune.' .
                'Your pin is located on the top right of the site '
        );

        return $response;
    }

    public function pin(Request $request)
    {
        $pin = $request->input('Digits');
        //find a user with this pin
        $user = User::where('pin', $pin)->first();

        //found user
        if ($user) {
            return $this->accessibilityMode($user);
        }

        //wrong pin
        $response = new VoiceResponse;
        $response->say('Returning to the main menu');
        $response->redirect(route('voice.answer'));
        return $response;
    }

    public function accessibilityMode(User $user)
    {
        $response = new VoiceResponse();
        $gather = $response->gather(
            [
                'numDigits' => '1',
                'action' => route('voice.greetings', ["user_id" => $user->id])
            ]
        );
        $gather->say(
            'Would you like to enable accessibility mode? This mode will read the products describes and describe the product. Press 1 to enable. Press 2 To continue without enabling.',
        );

        return $response;
    }

    public function greetingsx(Request $request)
    {

        $selectedOptionForAcc = $request->input('Digits');


        $response = new VoiceResponse();
        //entered wrong options
        if ($selectedOptionForAcc != 1 && $selectedOptionForAcc != 2) {
            $response->say('Returning to the main menu');
            $response->redirect(route('voice.answer'));
            return $response;
        }

        $user = User::find($request->user_id);
        $gather = $response->gather(
            [
                'numDigits' => '1',
                'action' => route('voice.menu', ["user_id" => $user->id, 'accessibilityMode' => $selectedOptionForAcc])
            ]
        );
        $gather->say("Hello {$user->name}, Press 1 for women products. Press 2 for men products. Press 3 to view your cart.");

        return $response;
    }

    public function menu(Request $request)
    {
        $selectedOption = $request->input('Digits');
        $user_id = $request->user_id;
        $accessibilityMode = $request->accessibilityMode;
        switch ($selectedOption) {
            case 1:
                //women
                return $this->getWomenParentCategories($user_id, $accessibilityMode);
                break;
            case 2:
                //men

                break;
            case 3:
                //view to cart

                break;
            default:
                break;
        }
    }

    public function getWomenParentCategories($user_id, $accessibilityMode)
    {

        $response = new VoiceResponse();
        $gather = $response->gather(
            [
                'numDigits' => '1',
                'action' => route('voice.getWomenSubCategories', ["user_id" => $user_id, 'accessibilityMode' => $accessibilityMode])
            ]
        );
        $gather->say('Press 1 for Fragrance. Press 2 for face. Press 3 for lips.');
        return $response;
    }

    public function getWomenSubCategories(Request $request)
    {

        $selectedOption = $request->input('Digits');
        $user_id = $request->user_id;
        $accessibilityMode = $request->accessibilityMode;
        $response = new VoiceResponse();
        switch ($selectedOption) {
            case 1:
                //Fragrance
                $gather = $response->gather(
                    [
                        'numDigits' => '1',
                        'action' => route('voice.productlist', [
                            "user_id" => $user_id,
                            'accessibilityMode' => $accessibilityMode,
                            "parentCategory" => 'fragrance',
                        ])
                    ]
                );
                $gather->say('Press 1 for Best Sellers. Press 2 for DISCOVER PRIVATE BLEND. Press 3 for PRIVATE BLEND. Press 4 for SIGNATURE. Press 5 for CANDLES');
                return $response;
                break;
            case 2:
                //face
                $gather = $response->gather(
                    [
                        'numDigits' => '1',
                        'action' => route('voice.productlist', [
                            "user_id" => $user_id,
                            'accessibilityMode' => $accessibilityMode,
                            "parentCategory" => 'face',
                        ])
                    ]
                );
                $gather->say('Press 1 for bronzer. Press 2 for brushes. Press 3 for CHEEK COLOR. Press 4 for CONCEALER. Press 5 for FOUNDATION');
                return $response;

                break;
            case 3:
                $gather = $response->gather(
                    [
                        'numDigits' => '1',
                        'action' => route('voice.productlist', [
                            "user_id" => $user_id,
                            'accessibilityMode' => $accessibilityMode,
                            "parentCategory" => 'lips',
                        ])
                    ]
                );
                $gather->say('Press 1 for LIP COLOR. Press 2 for BOYS & GIRLS. Press 3 for LIP LACQUER. Press 4 for LIP GLOSS. Press 5 for FOUNDATION');

                break;
            default:
                break;
        }
    }


    public function productlist(Request $request)
    {
        $response = new VoiceResponse();
        $parentCategory = $request->parentCategory;
        $category = $this->getCategoryName($parentCategory, $request->Digits);
        $categories = [$parentCategory, $category];


        //Get the products?
        $products = Product::whereJsonContains('categories', $categories)
            ->limit(9)
            ->pluck('name');

        $sayProducts = '';

        for ($i = 1; $i < $products->count() + 1; $i++) {
            $sayProducts .= " Press {$i} for {$products[$i - 1]}.";
        }


        $response->say($sayProducts);
        return $response;
    }

    public function getCategoryName($parentCategory, $digit)
    {
        $categories = [
            'fragrance' => [
                1 => 'best_sellers',
                2 => 'discover_private_blend',
                3 => 'private_blend',
                4 => 'signature',
                5 => 'candles'
            ],
            ''
        ];

        return $categories[$parentCategory][$digit];
    }
}
