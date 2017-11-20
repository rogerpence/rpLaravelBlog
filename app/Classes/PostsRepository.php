<?php

namespace App\Classes;

class PostsRepository {

    public function getMessage($name)
    {
        return 'Hello, ' . $name;
    }

    private function swapTokens($body) {
        $re = '/\{\{\s*lang=(\s*\w*:.*)\}\}/';
        preg_match_all($re, $body, $matches, PREG_SET_ORDER, 0);
        if (sizeof($matches) > 0) {
            foreach ($matches as $match) {
                if (sizeof($match) == 2) {
                    $entireToken = $match[0];
                    $directive = $match[1];
                    $strpos = stripos($body, $entireToken);
                    $endpos = $strpos + strlen($enterToken);
                    $begText = $substr($body, 0, $strpos);
                    $endText = $substr($body, $strpos, strlen($body) - $strpos);
                }                
            }                
        }
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
        
        $post->title = trim(request('title'));
        $post->subtitle = trim(request('subtitle'));
        $post->slug = trim(request('slug'));
        $post->body_html = trim($html);
        $post->body_markdown = trim(trim(request('body')));

        $post->abstract = trim(request('abstract'));
        $post->abstract_html = trim($parse_down->text(request('abstract')));
        $post->seo_description = trim(request('seo_description'));
        $post->seo_keywords = ''; 
        $post->status = request('status');
        $publish_date = \Carbon\Carbon::createFromFormat('Y-m-d', request('date-to-publish'));
        $post->date_to_publish = $publish_date;
        $post->save();
        
//        \DB::table('post_tag')->where('post_id','=', $post->id)->delete();

        \App\PostTag::where('post_id', $post->id)->delete();

        $tags = explode(',', request('tag-list-for-server'));    
        
        foreach ($tags as $tag_name) {
            $tag_id = \App\Tag::where('name', $tag_name)->pluck('id')->first();
            if ( $tag_id == null) {
                $new_tag = new \App\Tag();
                $new_tag->name = trim($tag_name);
                $new_tag->save();                   
                $tag_id = $new_tag->id;
            }               
   
            $posttag = new \App\PostTag();
            $posttag->tag_id = $tag_id;
            $posttag->post_id = $post->id;
            $posttag->save();   
        }      
    }    
}