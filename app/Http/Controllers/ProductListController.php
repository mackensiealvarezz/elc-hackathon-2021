<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class ProductListController extends Controller
{
    public function index()
    {
        return Inertia::render('ProductList/ProductList', [
            'filters' => Request::only('categories')
        ]);
    }
}
