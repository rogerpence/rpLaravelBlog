<?php

namespace App\Classes;

class Repository {

    public function getMessage($name)
    {
        return 'Hello, ' . $name;
    }

    public function addPost($request)
    {
        // try {
            $parse_down = new \ParsedownExtra();
            $html = $parse_down->text(request('body'));
            
            $post = new \App\Post();
            $post->title = request('title');
            $post->body_html = $html;
            $post->body_markdown = request('body');

            $post->abstract = request('abstract');
            $post->seo_description = request('seo_description');
            $post->seo_keywords = ''; 
            $post->status = request('status');
            $post->date_to_publish = new \DateTime('1959-06-02');

            $post->save();
        // }
        // catch (Illuminate\Database\QueryException $e){
        //     $errorCode = $e->errorInfo[1];
  
        //     if($errorCode == 1062) {
        //     // houston, we have a duplicate entry problem                
        //     }                    
        // }
    }
}