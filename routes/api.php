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

Route::post('voice/answer', [VoiceIVRController::class, 'answer'])->name('voice.answer');
Route::post('voice/pin', [VoiceIVRController::class, 'pin'])->name('voice.pin');
Route::post('voice/greetings', [VoiceIVRController::class, 'greetings'])->name('voice.greetings');
Route::post('voice/menu', [VoiceIVRController::class, 'menu'])->name('voice.menu');
Route::post('voice/getWomenSubCategories', [VoiceIVRController::class, 'getWomenSubCategories'])->name('voice.getWomenSubCategories');
Route::post('voice/productlist', [VoiceIVRController::class, 'productlist'])->name('voice.productlist');
