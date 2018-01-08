<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function destroy($id) {
        $upload = \App\Upload::find($id);
        //$upload->delete();        

        // $t is an associative array of the stringified Json submitted. 
        // Fetch any value out with request(key). 
        $t = request()->all();

        // Create and associative array and then convert it to Json
        // as the response. 
        $name = request('name');
        $result = ["status" => "ok", "name" => $name];        
        $json = json_encode($result); 
        
        return $json;
    }

    public function show($slug) 
    {
        // Fetch all slugs for posts with 'page' status.
        $actions = ['home', 'uploads', 'posts', 'comments', 'tags'];

        if (in_array($slug, $actions)) {        
            $action = 'dashboard.' . $slug;             
            $view = ['section' => $action];            
            return view('dashboard.main')->with('view', $view);            
        }
        else {
            abort(404);                    
        }
    }        

    // public function home(Request $request) 
    // {
    //     // $view = new \stdClass();
    //     // $view->subview = 'dashboard.main';

    //     $action = $request->input('action', 'dashboard.main');        
    //     $view = ['section' => $action];
    //     return view('dashboard.home')->with('view', $view);
    // }        

    public function images()
    {
        $view = ['section' => 'dashboard.main'];
        return view('dashboard.home')->with('view', $view);
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