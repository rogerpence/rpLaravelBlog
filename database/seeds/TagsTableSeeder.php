<?php

use Illuminate\Database\Seeder;
      
class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = ['javascript','laravel','php', 
                  'database', 'mysql', 'python',
                  'devops', 'nginx', 'css',
                  'ubuntu', 'virtualbox', 'motorcycle'];  
                     
        foreach($tags as $tag) {
            App\Tag::create([
                'name' => $tag
            ]);
        }                    
    }  
}
