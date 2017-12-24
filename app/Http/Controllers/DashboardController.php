<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function home() 
    {
        // $view = new \stdClass();
        // $view->subview = 'dashboard.main';
        $view = ['section' => 'dashboard.main'];
        return view('dashboard.home')->with('view', $view);        ;
    }        

    public function posts() 
    {
        $view = new \stdClass();
        $view->subview = 'dashboard.posts';

        return view('dashboard.main')->with('view', $view);        
    }        

    public function comments() 
    {
        $comments = \App\Comment::orderBy('created_at', 'desc')->get();
        
        $view = new \stdClass();
        $view->subview = 'dashboard.comments';

        return view('dashboard.main', compact('comments'))->with('view', $view);
    }        
    

    
}
