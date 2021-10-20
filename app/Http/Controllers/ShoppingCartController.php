<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ShoppingCartController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('ShoppingCart/ShoppingCart', [
            'cart' =>  Cart::firstOrCreate([
                'user_id' => $request->user()->id
            ])->load('products'),
            'relatedProduct' => Product::inRandomOrder()->first()
        ]);
    }


    public function deleteFromBag(Request $request)
    {
        $cart = Cart::find($request->cart_id);
        // dd($request);
        $cart->products()->detach($request->product_id);
        $cart->updateTotal();
        return back();
    }

    public function addDonation(Request $request) {
        $cart = Cart::find($request->cart_id);
        // dd($request);
        $cart->setDonate($request->donation);
        // $cart->donate = $request->donation;
        return back();
    }

}
