<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

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
        $cart->products()->detach($request->product_id);
        $cart->updateTotal();
        return back();
    }

    public function checkout(Request $request) {
        $user = $request->user();
        $cart = Cart::where('user_id',$user->id)->first();
        $user->makeDonor();
        $cart->setDonate($request->donation);
        $cart->updateTotal();
        return back();
    }

    public function clearCart(Request $request) {
        $user = $request->user();
        $cart = Cart::where('user_id',$user->id)->first();
        $cart->products()->detach();
        $cart->save();
        $cart->setDonate(null);
        $cart->updateTotal();
        return Redirect::route('landing');
    }
}
