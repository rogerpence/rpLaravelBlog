<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
Use App\Constants\PostStatus;

class SearchController extends Controller
{
     public function show() 
    {
        $search = request('search');
        if (Auth::user()) {
            $posts = \App\Post::search($search)->get();        
        }
        else {
            $posts = \App\Post::search($search)->where('status',PostStatus::PUBLISHED)->get();        
        }                        

        $view = ['search' => $search, 'mode'=> 'search' ];

        return view('posts.list-search', compact('posts'))->with('view', $view);
    }        
}