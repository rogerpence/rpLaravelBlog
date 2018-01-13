<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function show($slug) 
    {
        // Fetch all slugs for posts with 'page' status.
        $pages = \App\Post::where('status', '=', 2)->pluck('slug')->toArray();

        if (in_array($slug, $pages)) {        
            $post = \App\Post::where('slug', '=', $slug )->first();
            return view('routes.pages.show')->with('post', $post)->with('post_id', $post->id);
        }
        else {
            abort(404);                    
        }
    }        
}
