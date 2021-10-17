<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\Request;

class ProductListController extends Controller
{
    public function index()
    {
        return Inertia::render('ProductList/ProductList', [
            'filters' => Request::only('categories'),
            'products' => Product::whereJsonContains('categories', Request::get('categories', []))->get()
        ]);
    }
}
