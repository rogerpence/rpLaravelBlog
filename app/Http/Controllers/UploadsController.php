<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadsController extends Controller
{
    public function store(Request $request)
    {       
        //dd();
        //dd(request()->all());           
        //dd(request()->file('file_upload'));
        $path = $request->file('file-upload')->storeAs('images', request('image-name'), 'public');
        return back();
    }
}
