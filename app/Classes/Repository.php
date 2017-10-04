<?php

namespace App\Classes;

class Repository {

    public function getMessage($name)
    {
        return 'Hello, ' . $name;
    }

    public function addPost($request)
    {
        $parse_down = new \ParsedownExtra();
        $html = $parse_down->text(request('body_markdown'));
         
        $post = new \App\Post();
        $post->title = request('title');
        $post->body_html = $html;
        $post->body_markdown = request('body_markdown');

        $post->abstract = request('abstract');
        $post->seo_description = ''; 
        $post->seo_keywords = ''; 
        $post->status = 0;
        $post->date_to_publish = new \DateTime('1959-06-02');

        $post->save();
    }
}