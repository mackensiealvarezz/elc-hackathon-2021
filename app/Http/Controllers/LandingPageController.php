<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Twilio\Jwt\AccessToken;
use Illuminate\Http\Request;
use Twilio\Jwt\Grants\VoiceGrant;

class LandingPageController extends Controller
{
    public function index()
    {


        return Inertia::render('LandingPage/LandingPage');
    }
}
