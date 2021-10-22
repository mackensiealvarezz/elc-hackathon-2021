<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {

        $cartId = $request->user()->cart->id ?? null;
        $count = 0;
        if($cartId){
            $count = $request->user()->cart->products('id')->count();
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'cartInfo' => [
                    'id' => $cartId,
                    'count' => $count
                ],
                'voiceToken' => optional($request->user())->generateToken()

            ],
        ]);
    }
}
