<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Classes\PostsRepository;
use App\Comment;
use Illuminate\Support\Facades\Auth;


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

/*
DB::table('post_tag')->where('post_id','=', $post_id)->delete();
$post->tags->pluck('name');
*/

    public function index()
    {
        if (Auth::user()) {
            //$posts = \App\Post::orderBy('status', 'desc')->orderBy('date_to_publish', 'desc')->get();
            $posts = \App\Post::orderBy('updated_at', 'desc')->get();
        }
        else {
            $posts = \App\Post::where('status', 1)->orderBy('date_to_publish', 'desc')->get();            
        }
        // // return view('posts.create', compact('post'));
        // $data = ['url' => action('PostsController@index'),
        //          'action' => 'POST'];  

        $pages = \App\Post::select('title','slug')->where('status', 2)->get()->toArray();

        // return view('posts.list')->with(compact('posts')); /// ->with('view', $data);
        return view('posts.list-new')->with(compact('posts')); //->with('pages', $pages); /// ->with('view', $data);        
    } 

    public function create()
    {
        $post = new \App\Post;

        $post->date_to_publish = \Carbon\Carbon::now()->toDateString();

        $view = ['url' => route('posts.store'),
                 'action' => 'POST',
                 'taglist' => '',
                 'poststatus' => \App\Constants::$POST_STATUS,
                 'mode' => 'create'];        
        return view('posts.create', compact('post'))->with('view', $view);;
    }

    public function store()
    {       

        //dd(request()->all());           

        $id = (request()->has('postid')) ? request('postid') : 0;

        $messages = ['title.regex' => 'The title must be letters and numbers only',
                     'slug.regex' => 'The slug must be letters and numbers only'];

        //$this->validate(request(), \App\Post::getValidationRules(), $messages);                
        $this->validate(request(), \App\Post::getValidationRules(), \App\Post::getCustomErrorMessages());

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

        $post = \App\Post::where('slug', '=', $slug )->first();
        $comments = $post->hasMany(Comment::class)->where('comment_id',0)->where('approved', true)->get();
        $tag_array = $post->tags->pluck('name')->toArray();
        $taglist = implode(",", $tag_array);

        //$replies = $comment->hasMany(App\Comment::class)->where('comment_id',$comments->id);

        // dump($post);
        // dump(compact('post'));
        // die();
        // return view('posts.show', compact('post'));
        return view('posts.show-new')->with('post', $post)->
                                   with('comments', $comments)->
                                   with('slug', $slug)->
                                   with('post_id', $post->id);
    }        

    public function destroy($id)
    {
        $post = \App\Post::find($id);
        \App\PostTag::where('post_id',$id)->delete();
        \App\Comment::where('post_id',$id)->delete();
        $post->delete();

        return redirect()->route('posts.list');
    }

    public function edit($id) 
    {
        $post = \App\Post::find($id);
        $tag_array = $post->tags->pluck('name')->toArray();
        $taglist = implode(",", $tag_array);
        $view = ['url' => route('posts.store'),
                 'action' => 'POST',
                 'spoof_action' => 'PATCH',
                 'poststatus' => \App\Constants::$POST_STATUS,                 
                 'taglist' => $taglist,  
                 'mode' => 'edit'];        
        return view('posts.create')->with('post', $post)->
                                     with('view', $view);
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
