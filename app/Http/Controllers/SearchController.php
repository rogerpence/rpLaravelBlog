<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
Use App\Constants\PostStatus;

class SearchController extends Controller
{
     public function show() 
    {
        $special = [];

        $search = request('search');
        if (Auth::user()) {
            $posts = \App\Post::search($search)->get();        

            // foreach ($posts as $post) {
            //     $p = $post;
            //     $status = $post->status;
            //     if ($status == PostStatus::PUBLISHED Or $status == PostStatus::PAGE ) {
            //         array_push($special, $post);
            //     }
            // }                

            // $posts =(object) $special;
            // $p = compact($posts);

        }
        else {
            $posts = \App\Post::search($search)->where('status',PostStatus::PUBLISHED)->get();
            
            //)->where('status',PostStatus::PUBLISHED)->get();

                    //orWhere('status',PostStatus::PAGE)->get();        



        }                        

        $view = ['search' => $search, 'mode'=> 'search' ];

        return view('posts.list-search', compact('posts'))->with('view', $view);
    }        
}