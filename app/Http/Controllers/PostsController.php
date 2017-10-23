<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Classes\Repository;
use App\Comment;

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

        (new PostsRepository())->storePost(request()->all());
        
        // The above is shorthand for this:
        // $repo = new PostsRepository(); 
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
        $comments = $post->hasMany(Comment::class)->where('comment_id',0)->where('approved', true)->get();

        //$replies = $comment->hasMany(App\Comment::class)->where('comment_id',$comments->id);

        // dump($post);
        // dump(compact('post'));
        // die();
        // return view('posts.show', compact('post'));
        return view('posts.show')->with('post', $post)->
                                   with('comments', $comments)->
                                   with('slug', $slug)->
                                   with('post_id', $post->id);
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
