<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    // public function show(\App\Post $post) 
    public function show($slug) 
    {
        $pages = \App\Post::where('status', '=', 2)->pluck('slug')->toArray();

        //$pages = ['about', 'contact'];
        if (in_array($slug, $pages)) {        
            $post = \App\Post::where('slug', '=', $slug )->first();
            return view('posts.show-page')->with('post', $post)->with('post_id', $post->id);
        }
        else {
            abort(404);                    
        }


        // $post = \App\Post::where('slug', '=', $slug )->first();
        // $comments = $post->hasMany(Comment::class)->where('comment_id',0)->where('approved', true)->get();
        // $tag_array = $post->tags->pluck('name')->toArray();
        // $taglist = implode(",", $tag_array);

        // return view('posts.show-new')->with('post', $post)->
        //                            with('comments', $comments)->
        //                            with('slug', $slug)->
        //                            with('post_id', $post->id);
    }        
}
