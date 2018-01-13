<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\UploadsRepository;

class ImagesController extends Controller
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
        return redirect('dashboard/images');
    }

    public function destroy($id) {
        $upload = \App\Upload::find($id);
        $upload->delete();        

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

    public function storeajax(Request $request)
    {       
        (new UploadsRepository())->store($request);
        return 'ok';
    }
    
}
