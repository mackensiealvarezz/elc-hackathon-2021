<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;

class LandingPageController extends Controller
{
    public function index()
    {
        return Inertia::render('LandingPage/LandingPage', [
            'donors' =>  User::where('donor',true)->get('name')
        ]);
    }
}
