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
Route::get('/ProductDetail', [ProductDetailController::class, 'index']);
Route::get('/ShoppingCart', [ShoppingCartController::class, 'index']);
Route::get('/search', [ProductListController::class, 'index'])->name('search');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');



require __DIR__ . '/auth.php';
