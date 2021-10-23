<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Events\ShowCartEvent;
use Twilio\TwiML\VoiceResponse;
use App\Events\CartUpdatedEvent;
use App\Events\UpdateDonationEvent;
use App\Events\SearchProductListEvent;
use App\Events\ShowProductDetailEvent;
use App\Events\AddedProductToCartEvent;
use App\Events\DonatedEvent;
use App\Events\RemovedProductToCartEvent;

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
                            "redirect" => "https://elc.mackensiealvarez.com/api/voice/process_categories"
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
        event(new ShowCartEvent($user->id));
        $cart = $user->currentCart()->load('products');
        $products = $cart->products;


        if ($products->count() == 0) {
            return [
                'actions' => [
                    [
                        'say' => "You don't have any items in your cart. Can i help you with shopping? If so, Say Shopping"
                    ],
                    [
                        'listen' => true
                    ]
                ]
            ];
        }


        $actions = [];
        $products_word = Str::plural('products',  $products->count());

        //Count
        $actions[] =  [
            'say' => "You have {$products->count()} {$products_word} in your cart."
        ];

        //Say every product
        foreach ($products as $product) {
            $actions[] = [
                'say' => "{$product->name}, {$product->price} dollars."
            ];
        }

        // show how to remove
        $actions[] =  [
            'say' => "To remove a product say, Remove then the product name. For example: Remove {$products->first()->name}."
        ];

        //Checkout
        $actions[] =  [
            'say' => "To checkout say: Checkout"
        ];

        $actions[] = [
            'listen' => true
        ];

        return [
            'actions' => $actions
        ];
    }

    public function remove(Request $request)
    {
        $product_name = $request->Field_product_Value ?? null;
        $user = User::find(Str::after($request->UserIdentifier, 'client:'));
        $product = Product::whereName($product_name)->first();
        $cart = $user->currentCart()->load('products');

        $cart->deleteProduct($product->id);

        return [
            'actions' => [
                [
                    'say' => "We removed the product from your cart.Anything else we can help you with? Or say checkout to finish your order."
                ],
                [
                    'listen' => true
                ]
            ]
        ];
    }


    public function checkout(Request $request)
    {

        $user = User::find(Str::after($request->UserIdentifier, 'client:'));
        event(new ShowCartEvent($user->id));
        $cart = $user->currentCart()->load('products');
        $products_count = $cart->products->count();

        if ($products_count == 0) {
            return [
                'actions' => [
                    [
                        'say' => "You don't have any items in your cart. Can i help you with shopping? If so, Say Shopping"
                    ],
                    [
                        'listen' => true
                    ]
                ]
            ];
        }

        return [
            'actions' => [
              [
                "collect" => [
                    "name" => "collect_checkout",
                    "questions" => [
                        [
                            "question" => "Would you like to donate to our breast cancer research fund? Please say YES OR NO",
                            "name" => "selected_donation",
                            "type" => "Twilio.YES_NO",
                            "validate" => [
                                "max_attempts" => [
                                    "redirect" => "task://collect_fallback",
                                    "num_attempts" => 3
                                ]
                            ]
                        ],

                    ],
                    "on_complete" => [
                        "redirect" => "https://elc.mackensiealvarez.com/api/voice/process_checkout"
                    ]
                ]
              ]
            ]
        ];
    }

    public function process_checkout(Request $request)
    {

        $json = $request->Memory;
        $data = json_decode($json, true);
        //Yes Or No
        $selected_donation = $data['twilio']['collected_data']['collect_checkout']['answers']['selected_donation']['answer'];

        if($selected_donation == 'Yes')
        {

            return [
                'actions' => [
                  [
                    "collect" => [
                        "name" => "collect_donation",
                        "questions" => [
                            [
                                "question" => "How much would you like to donate?",
                                "name" => "donation_amount",
                                "type" => "Twilio.NUMBER",
                                "validate" => [
                                    "max_attempts" => [
                                        "redirect" => "task://collect_fallback",
                                        "num_attempts" => 3
                                    ]
                                ]
                            ],
                        ],
                        "on_complete" => [
                            "redirect" => "https://elc.mackensiealvarez.com/api/voice/process_donation"
                        ]
                    ]
                  ]
                ]
            ];

        }

        $user = User::find(Str::after($request->UserIdentifier, 'client:'));
        $user->currentCart()->clearCart();

        return [
            'actions' => [
                [
                    'say' => "Thank you for shopping with us today. We have completed your order."
                ]
            ]
        ];
    }



    public function process_donation(Request $request)
    {

        $json = $request->Memory;
        $data = json_decode($json, true);
        //Yes Or No
        $selected_donation = $data['twilio']['collected_data']['collect_donation']['answers']['donation_amount']['answer'];

        $user = User::find(Str::after($request->UserIdentifier, 'client:'));
        $cart = $user->currentCart();
        event(new UpdateDonationEvent($cart, $selected_donation));
        event(new CartUpdatedEvent($cart));


        return [
            'actions' => [
                [
                    'say' => "Thank you for choosing to donate \${$selected_donation}."
                ],
                [
                    "redirect" => "https://elc.mackensiealvarez.com/api/voice/donated"
                ]
            ]
        ];
    }

    public function donated(Request $request)
    {

        $user = User::find(Str::after($request->UserIdentifier, 'client:'));
        $user->currentCart()->clearCart();
        event(new DonatedEvent(Str::after($request->UserIdentifier, 'client:')));

        return [
            'actions' => [
                [
                    'say' => "You have also been added to our banner of donors."
                ],
                [
                    'say' => "As a gift from us, here is a message from our CIO at Estee Lauder Companies"
                ],
                [
                    'play' => "https://elc.mackensiealvarez.com/mp3/thankyou_donation.mp3"
                ],
            ]
        ];
    }

}
