<?php

use App\Models\Cart;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('Cart.{id}', function($user, $id){
    return (int) $user->id === Cart::find($id)->user_id;
});


Broadcast::channel('User.{id}.Search', function($user, $id){
    return (int) $user->id === (int) $id;
});


Broadcast::channel('User.{id}.ShowProduct', function($user, $id){
    return (int) $user->id === (int) $id;
});

Broadcast::channel('User.{id}.ShowCart', function($user, $id){
    return (int) $user->id === (int) $id;
});

Broadcast::channel('User.{id}.AddedProductToCart', function($user, $id){
    return (int) $user->id === (int) $id;
});

Broadcast::channel('User.{id}.RemovedProductToCart', function($user, $id){
    return (int) $user->id === (int) $id;
});
