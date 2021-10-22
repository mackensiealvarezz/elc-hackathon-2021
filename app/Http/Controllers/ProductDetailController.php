<?php

namespace App\Http\Controllers;

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

        $cart->addProduct($request->product_id);

        return back();
    }
}
