<?php

namespace App\Classes;
// use \App\Classes\TextTokenHelper;

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
    
        // <!--prettify lang=js linenums=true-->
        // {{prettify=bash:linenums}}

        $body = request('body');
        //$tth = new TextTokenHelper();      
        //$body = $tth->swapTokens($body);

        $parse_down = new \ParsedownExtra();
        $html = $parse_down->text($body);
        
        $post->title = trim(request('title'));
        $post->subtitle = trim(request('subtitle'));
        $post->slug = trim(request('slug'));
        $post->body_html = trim($html);
        $post->body_markdown = trim(trim(request('body')));
        
        $x = trim(request('abstract'));

        $post->abstract = trim(request('abstract'));
        $post->abstract_html = trim($parse_down->text(request('abstract')));
        $post->seo_description = trim(request('seo_description'));
        $post->seo_keywords = ''; 
        $post->javascript = trim(request('javascript'));
        $post->status = request('status');
        $publish_date = \Carbon\Carbon::createFromFormat('Y-m-d', request('date-to-publish'));
        $post->date_to_publish = $publish_date;
        $post->save();
        
//        \DB::table('post_tag')->where('post_id','=', $post->id)->delete();

        \App\PostTag::where('post_id', $post->id)->delete();

        if (trim(request('tag-list-for-server')) == '') {
            return $post->id;
        }

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

        return $post->id;
    }    
}