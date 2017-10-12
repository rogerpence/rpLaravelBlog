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
        $posts = \App\Post::orderBy('created_at', 'desc')->get();

        // // return view('posts.create', compact('post'));
        // $data = ['url' => action('PostsController@index'),
        //          'action' => 'POST'];  

        return view('posts.list')->with(compact('posts')); /// ->with('view', $data);
    } 

    public function create()
    {
        $post = new \App\Post;

        $view = ['url' => route('posts.store'),
                 'action' => 'POST'];        
        return view('posts.create', compact('post'))->with('view', $view);;
    }

    public function store()
    {
        $id = (request()->has('postid')) ? request('postid') : 0;
        $this->validate(request(), \App\Post::getValidationRules($id));                

        (new Repository())->storePost(request()->all());
        
        // The above is shorthand for this:
        // $repo = new Repository(); 
        // $repo->addPost(request()->all());
        
        return redirect()->route('posts.list');
        // or use
        //    return redirect('/');
        // or use where [] is a list of parms
        //    return redirect()->route('posts.list', []);
    }

    // public function show(\App\Post $post) 
    public function show($slug) 
    {
        // dd(request()->all());
        // dd($id);

        // $post = \App\Post::find($id);
        $post = \App\Post::where('slug', '=', $slug )->first();
        return view('posts.show', compact('post'));
    }        


    public function edit($id) 
    {
        $post = \App\Post::find($id);
        // dd($post);
        // return view('posts.create', compact('posts'));

        $view = ['url' => route('posts.store'),
                 'action' => 'POST',
                 'spoof_action' => 'PATCH'];          
        return view('posts.create')->with('post', $post)->with('view', $view);
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
