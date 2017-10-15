<?php

use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();        

        App\Comment::create([
                'post_id' => 1,
                'text' => $faker->text(40),
                'from' => $faker->firstNameMale(),
            ]);

            App\Comment::create([
                'post_id' => 1,
                'text' => $faker->text(40),
                'from' => $faker->firstNameMale(),
            ]);

            App\Comment::create([
                'post_id' => 1,
                'comment_id' => 2,
                'text' => 'Thanks for the feedback',
                'from' => 'rp',
            ]);
        }
}
