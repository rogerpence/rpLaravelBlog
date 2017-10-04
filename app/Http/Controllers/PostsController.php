<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Classes\Repository;

class PostsController extends Controller
{
    public function __construct()
    {
        // disable authorization for a page.
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = \App\Post::all();
        return view('posts', compact('posts'));
    }

    public function create()
    {
        return view('post');
    }

    public function store()
    {
        $repo = new Repository();
 
        $repo->addPost(request()->all());
        
        return redirect('/');
        // dd(request()->all());
        //$md = request()->input('markdown');
        //dump($md);
    }
}
