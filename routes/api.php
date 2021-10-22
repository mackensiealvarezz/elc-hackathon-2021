<?php

use App\Http\Controllers\VoiceIVRController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('voice/greetings', [VoiceIVRController::class, 'greetings'])->name('voice.greetings');
Route::post('voice/shopping', [VoiceIVRController::class, 'shopping'])->name('voice.shopping');
Route::post('voice/categories', [VoiceIVRController::class, 'categories'])->name('voice.categories');
Route::post('voice/process_categories', [VoiceIVRController::class, 'process_categories'])->name('voice.process_categories');
Route::post('voice/viewProduct', [VoiceIVRController::class, 'viewProduct'])->name('voice.viewProduct');
Route::post('voice/purchase', [VoiceIVRController::class, 'purchase'])->name('voice.purchase');
Route::post('voice/viewCart', [VoiceIVRController::class, 'viewCart'])->name('voice.viewCart');
