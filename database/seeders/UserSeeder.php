<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Nette\Utils\Random;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Michael Smith',
            'email' => 'demo@estee.com',
            'password' => Hash::make('demo'),
            'pin' => Random::generate(3, '0-9')
        ]);

        User::create([
            'name' => 'Shawn Weigand',
            'email' => 'shawn@estee.com',
            'password' => Hash::make('shawn'),
            'pin' => Random::generate(3, '0-9')
        ]);

        User::create([
            'name' => 'Mackensie Alvarez',
            'email' => 'mackensie@estee.com',
            'password' => Hash::make('mackensie'),
            'pin' => Random::generate(3, '0-9')
        ]);

        User::create([
            'name' => 'Kishan Patel',
            'email' => 'kishan@estee.com',
            'password' => Hash::make('kishan'),
            'pin' => Random::generate(3, '0-9')
        ]);
    }
}
