<?php

namespace App\Classes;

class CommentsRepository {

    public function store($request)
    {

        $comment = new \App\Comment();

        $comment->post_id = 1;
        $comment->comment_id = 0;
        $comment->approved = true;
        $comment->text = request('comment_text');        
        $comment->from = request('from');

        $comment->save();
    }
}