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
        // dd(request()->all());

        $this->validate(request(), [
            'title' => 'required|unique:posts,title',
            'body' => 'required',
            'abstract' => 'required',
            'seo_description' => 'required'            
        ]);
        
        (new Repository())->addPost(request()->all());
        
        // The above is shorthand for this:
        // $repo = new Repository(); 
        // $repo->addPost(request()->all());
        
        return redirect()->route('posts.list');
        // or use
        //    return redirect('/');
        // or use where [] is a list of parms
        //    return redirect()->route('posts.list', []);
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
