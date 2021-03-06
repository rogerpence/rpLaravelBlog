<?php

namespace App\Classes;

class DataBaseUtility {

    public function getMessage($name)
    {
        print_r('hi there');
        return 'Hello, ' . $name;
    }

    public function storePost($request)
    {
        if (isset($request['postid'])) {
            $id = $request['postid']; 
            $post = \App\Post::find($id);
        }
        else {
            $post = new \App\Post();
        }
            
        $parse_down = new \ParsedownExtra();
        $html = $parse_down->text(request('body'));
        
        $post->title = request('title');
        $post->subtitle = request('subtitle');
        $post->slug = request('slug');
        $post->body_html = $html;
        $post->body_markdown = request('body');

        $post->abstract = request('abstract');
        $post->seo_description = request('seo_description');
        $post->seo_keywords = ''; 
        $post->status = request('status');
        $post->date_to_publish = new \DateTime('1959-06-02');

        $tags = explode(',', $tagstr);



        $post->save();
    }
}