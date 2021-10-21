<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;
use Twilio\TwiML\VoiceResponse;

class VoiceIVRController extends Controller
{
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

    public function pin(Request $request){
        $pin = $request->input('Digits');
        //find a user with this pin
        $user = User::where('pin', $pin)->first();

        //found user
        if($user)
        {
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

    public function greetings(Request $request)
    {

        $selectedOptionForAcc = $request->input('Digits');


        $response = new VoiceResponse();
        //entered wrong options
        if($selectedOptionForAcc != 1 && $selectedOptionForAcc != 2 )
        {
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
            ->pluck('name')
            ;

        $sayProducts = '';

        for($i = 1; $i < $products->count() + 1; $i++){
            $sayProducts .= " Press {$i} for {$products[$i-1]}.";
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
