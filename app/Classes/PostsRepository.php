<?php

namespace App\Classes;
// use \App\Classes\TextTokenHelper;

class PostsRepository {

    public function getMessage($name)
    {
        return 'Hello, ' . $name;
    }

    public function storePost($data)
    {
        if (isset($data['postid'])) {
            $id = $data['postid']; 
            $post = \App\Post::find($id);
        }
        else {
            $post = new \App\Post();
        }
    
        // <!--prettify lang=js linenums=true-->
        // {{prettify=bash:linenums}}

        $body = $data['body'];

        $parse_down = new \ParsedownExtra();
        $html = $parse_down->text($body);
        
        $post->title = trim($data['title']);
        $post->subtitle = trim($data['subtitle']);
        $post->slug = trim($data['slug']);
        $post->body_html = trim($html);
        $post->body_markdown = trim(trim($data['body']));
        $post->abstract = trim($data['abstract']);
        $post->abstract_html = trim($parse_down->text($data['abstract']));
        $post->seo_description = trim($data['seo_description']);
        $post->seo_keywords = ''; 
        $post->javascript = trim($data['javascript']);
        $post->status = $data['status'];
        $publish_date = \Carbon\Carbon::createFromFormat('Y-m-d', $data['date-to-publish']);
        $post->date_to_publish = $publish_date;
        $post->save();
        
        \App\PostTag::where('post_id', $post->id)->delete();

        if (trim($data['tag-list-for-server']) == '') {
            return $post->id;
        }

        $tags = explode(',', $data['tag-list-for-server']);    

        // This should be moved to a tags repository! 
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