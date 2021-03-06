<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Twilio\Jwt\AccessToken;
use Illuminate\Http\Request;
use App\Models\User;
use Twilio\Jwt\Grants\VoiceGrant;

class LandingPageController extends Controller
{
    public function index()
    {
        $donors = User::where('donor',true)->get('name');

        $names = array();

        for ($i=0;$i<sizeof($donors);$i++) {
            array_push($names,$donors[$i]);
        }

        return Inertia::render('LandingPage/LandingPage', [
            'donors' => array_chunk($names,3)
        ]);
    }

    public function instructions()
    {
        return Inertia::render('Instructions/InstructionsPage');
    }
}
