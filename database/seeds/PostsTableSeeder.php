<?php

use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //DB::statement("insert into posts (`author_id`, `title`, `abstract`, `seo_description`, `seo_keywords`, `body`, `status`, `date_to_publish`, `created_at`, `updated_at`) values (1, 'rhoncus aliquam lacus morbi quis tortor', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla.', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis li', 'congue,eget,semper', 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.', 2, '2017-05-15 06:23:09', '2017-01-05 03:57:02', '2017-02-13 21:46:30'); insert into posts (author_id, title, abstract, seo_description, seo_keywords, body, status, date_to_publish, created_at, updated_at) values (2, 'in felis eu sapien cursus', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.', 'cubilia,curae,duis,faucibus', 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.', 2, '2017-06-24 01:06:34', '2017-01-14 01:17:21', '2016-12-26 09:53:33'); insert into posts (author_id, title, abstract, seo_description, seo_keywords, body, status, date_to_publish, created_at, updated_at) values (1, 'sapien cum sociis natoque penatibus et', 'Nulla mollis molestie lorem.', 'Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.', 'tristique,in', 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.', 1, '2017-08-25 19:53:02', '2016-10-21 08:52:26', '2017-02-02 01:23:08'); insert into posts (author_id, title, abstract, seo_description, seo_keywords, body, status, date_to_publish, created_at, updated_at) values (2, 'aenean auctor gravida sem', 'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis ', 'turpis,integer', 'Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue.', 3, '2017-06-23 00:54:42', '2017-03-17 06:00:34', '2016-10-27 16:45:34');");   

        $faker = Faker\Factory::create();        

        for($i = 0; $i < 3; $i++) {
            $title = $faker->text(32);
            App\Post::create([
                'title' => $title,
                'slug' => $faker->randomLetter() . '-' . $faker->randomLetter(), 
                'abstract' => $faker->text(280),
                'abstract_html' => $faker->text(280),
                'seo_description' => $faker->text(30),
                'seo_keywords' => $faker->text(18),
                'body_html' => $faker->text(240),
                'body_markdown' => $faker->text(200),
                'status' => 1,
                'date_to_publish' => $faker->datetime()
            ]);
        }        
    }  
}


