<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\UploadsRepository;

class UploadsController extends Controller
{

    public function show($id) 
    {
        $image = \App\Upload::where('id', '=', $id )->first();
        return $image;
    }

    public function store(Request $request)
    {       
        // dd($request->all());

        $r = $request;
        $r = $request['name'];

        (new UploadsRepository())->store($request);
        //return back();
        return redirect('dashboard/uploads');
    }
}
