<?php

namespace App\Classes;

class PostsRepository {

    public function getMessage($name)
    {
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
        $post->save();
        
        \DB::table('post_tag')->where('post_id','=', $post->id)->delete();
        $tags = explode(',', request('tag-list-for-server'));    
        
        foreach ($tags as $tag_name) {
            $tag_row = \DB::table('tags')->where('name', '=', $tag_name)->pluck('id');
            if (count($tag_row) == 0) {
                $new_tag = new \App\Tag();
                $new_tag->name = trim($tag_name);
                $new_tag->save();                   
                $tag_id = $new_tag->id;
            }               
            else {
                $tag_id = $tag_row[0];
            }

            $posttag = new \App\PostTag();
            $posttag->tag_id = $tag_id;
            $posttag->post_id = $post->id;
            $posttag->save();
        }      
    }    
}