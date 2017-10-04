<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\User::create([
            'name' => 'rp',
            'email' => 'roger.pence@gmail.com',
            'password' => bcrypt('Ss4v52^33Kez'),
            'remember_token' => str_random(10)        
        ]);
    }  
}
