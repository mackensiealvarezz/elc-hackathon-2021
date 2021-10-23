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
        $user = $request->user();
        $user->currentCart()->addProduct($request->product_id);
        return back();
    }
}
