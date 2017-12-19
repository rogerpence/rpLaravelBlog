<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
     public function show() 
    {
        $search = request('search');
        if (Auth::user()) {
            $posts = \App\Post::search($search)->get();        
        }
        else {
            $posts = \App\Post::search($search)->where('status',1)->get();        
        }                        

        $view = ['search' => $search];

        return view('posts.list-search', compact('posts'))->with('view', $view);

//        return view('posts.create', compact('post'))->with('view', $view);;

        // $posts = [];
        // foreach ($results as $post) {
        //     $post = new StdClass();
        //     $posts->title = , ['title' => $post->title, 
        //     //                     'abstract' => $post->abstract, 
        //     //                     'slug' => $post->slug,
        //     //                     'status' => $post->status,
        //     //                     'date_to_publish' => $post->date_to_publish]);

        //     // array_push($posts, ['title' => $post->title, 
        //     //                     'abstract' => $post->abstract, 
        //     //                     'slug' => $post->slug,
        //     //                     'status' => $post->status,
        //     //                     'date_to_publish' => $post->date_to_publish]);
        // }            

        // $posts = (object)$posts;

        // dd($posts);

        

        //dd($results);
    }        


        
//         // Fetch all slugs for posts with 'page' status.
//         $pages = \App\Post::where('status', '=', 2)->pluck('slug')->toArray();

//         if (in_array($slug, $pages)) {        
//             $post = \App\Post::where('slug', '=', $slug )->first();
//    //
}
