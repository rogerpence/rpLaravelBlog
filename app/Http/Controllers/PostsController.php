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
        return view('posts.list', compact('posts'));
    } 

    public function create()
    {
        return view('posts.create');
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


// CREATE
// ------
// GET /posts/create        invite input for creating a new post 
// POST /posts              store new row in db

// READ
// ----
// GET /posts               view all posts
// GET /posts/{id}          display a single post

// UPDATE
// ------
// GET /posts/{id}/edit     get a specific post to edit 
// PATCH /posts/{id}        store updated row in db

// DELETE
// ------
// DELETE /posts/{id}       delete a post
