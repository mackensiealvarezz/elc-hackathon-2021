<?php

namespace App\Http\Controllers;

use App\Events\AddProduct;
use App\Events\ProductAddedToCart;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductDetailController extends Controller
{
    public function index($name)
    {
        return Inertia::render('ProductDetail/ProductDetail', [
            'product' =>  Product::where('name', $name)->first()
        ]);
    }

    public function addToBag(Request $request)
    {
        $cart = Cart::firstOrCreate([
            'user_id' => $request->user()->id
        ]);

        $cart->products()->attach($request->product_id);

        event(new ProductAddedToCart($cart->id,$cart->products()->count()));

        $cart->updateTotal();

        return back();
    }
}
