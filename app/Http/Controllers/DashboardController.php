<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function show() 
    {
        return view('dashboard.main');
    }        

    public function posts() 
    {
        $view = ['url' => route('posts.store'),
                 'action' => 'posts'
                ];        
        return view('dashboard.main')->with('view', $view);        
    }        

    public function comments() 
    {
        $comments = \App\Comment::orderBy('created_at', 'desc')->get();
        
        $view = ['url' => route('posts.store'),
                 'comments' => $comments,
                 'action' => 'comments'
                ];        
        return view('dashboard.main', compact('comments'))->with('view', $view);;
    }        
    
}
