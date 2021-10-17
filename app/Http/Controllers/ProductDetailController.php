<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductDetailController extends Controller
{
    public function index()
    {

        return Inertia::render('ProductDetail/ProductDetail');
    }
}
