<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;

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
}
