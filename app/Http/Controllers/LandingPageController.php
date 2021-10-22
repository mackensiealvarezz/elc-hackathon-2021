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
            // 'donors' => array_chunk(User::where('donor',true)->get('name'),4)
            'donors' =>  User::where('donor',true)->get('name')[0]
        ]);
    }

    public function donorChunk($donors,$num) {
        return array_chunk($donors,$num);
    }
}
