<?php

use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\ProductDetailController;
use App\Http\Controllers\ProductListController;
use App\Http\Controllers\ShoppingCartController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [LandingPageController::class, 'index'])->name('landing');
Route::get('/product/{name}', [ProductDetailController::class, 'index'])->name('product');
Route::post('/addToBag', [ProductDetailController::class, 'addToBag'])->middleware(['auth', 'verified'])->name('addToBag');
Route::post('/deleteFromBag', [ShoppingCartController::class, 'deleteFromBag'])->middleware(['auth', 'verified'])->name('deleteFromBag');
Route::get('/cart', [ShoppingCartController::class, 'index'])->middleware(['auth', 'verified'])->name('cart');
Route::get('/search', [ProductListController::class, 'index'])->name('search');
Route::post('/addDonation', [ShoppingCartController::class, 'addDonation'])->middleware(['auth', 'verified'])->name('addDonation');

require __DIR__ . '/auth.php';
