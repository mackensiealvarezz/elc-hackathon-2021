<?php

namespace App\Models;

use App\Models\Cart;
use Twilio\Jwt\AccessToken;
use Laravel\Sanctum\HasApiTokens;
use Twilio\Jwt\Grants\VoiceGrant;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'pin'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    // protected $with = ['cart'];



    public function cart()
    {
        return $this->hasOne(Cart::class);
    }


    public function currentCart()
    {
        return Cart::firstOrCreate([
            'user_id' => $this->id
        ]);
    }

    public function generateToken()
    {
        $accountSid = config('services.twilio.accountSid');
        $apiKey = config('services.twilio.apiKey');
        $apiSecret = config('services.twilio.apiSecret');
        $applicationSid = config('services.twilio.applicationSid');

        $accessToken = new AccessToken($accountSid, $apiKey, $apiSecret, 3600, 'identity');
        $accessToken->setIdentity($this->id);

        $voiceGrant = new VoiceGrant();
        $voiceGrant->setOutgoingApplicationSid($applicationSid);
        $voiceGrant->setIncomingAllow(true);
        $accessToken->addGrant($voiceGrant);

        return $accessToken->toJWT();
    }


}
