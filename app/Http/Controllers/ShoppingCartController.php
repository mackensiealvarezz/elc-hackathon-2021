<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Events\CartUpdatedEvent;
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
        $request->user()->currentCart()->deleteProduct($request->product_id);
        return back();
    }

    public function checkout(Request $request) {
        $request->user()->currentCart()->checkout($request->donation);
        return back();
    }

    public function clearCart(Request $request) {

        $request->user()->currentCart()->clearCart();
        return Redirect::route('landing');
    }
}
