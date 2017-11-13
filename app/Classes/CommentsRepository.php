<?php

namespace App\Classes;

class CommentsRepository {

    public function store($request, $slug)
    {
        $post = \App\Post::where('slug', '=', $slug )->first();
        $comment = new \App\Comment();

        $comment->post_id = $post->id;
        $comment->comment_id = 0;
        $comment->approved = true;
        $comment->text = request('comment_text');        
        $comment->from = request('comment_from');
        $comment->email = request('comment_email');

        $comment->save();
    }
}