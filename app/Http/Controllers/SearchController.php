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
            // $posts = \App\Post::search($search)->where('status',PostStatus::PUBLISHED)->get();

            // Laravel Scout doesn't allow orWhere, so after getting _all_ posts 
            // that match the query, filter to include only Published or Page posts. 
            $posts = \App\Post::search($search)->get();     
            $posts = $posts->filter(function($value, $key) {
                return  ($value->status == PostStatus::PUBLISHED or  
                         $value->status == PostStatus::PAGE);  
            });           
        }                        
        $view = ['search' => $search, 'mode'=> 'search' ];
        return view('posts.list-search', compact('posts'))->with('view', $view);
    }        
}