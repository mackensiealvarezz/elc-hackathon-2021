<?php

namespace App\Http\Controllers;

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
}
