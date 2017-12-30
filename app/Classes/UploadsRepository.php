<?php

namespace App\Classes;

class UploadsRepository {

    public function store($request)
    {
        if (null !== $request->file('file-upload')) {
            $request->file('file-upload')->storeAs('images', $request['image-name'], 'public');
        }                

        $id = $request['image-id'];

        if ($id > 0) {
            $upload = \App\Upload::find($id);
        }
        else {
            $upload = new \App\Upload();
        }

        $upload->name = trim($request['image-name-saved']);
        $upload->description = trim($request['image-description']);
        $upload->cachebuster += 1;
        $upload->save();
    }        
}    
        // if (isset($request['postid'])) {
        //     $id = $request['postid']; 
        //     $upload = \App\Upload::find($id);
        // }
        // else {
        //     $upload = new \App\Upload();
        // }
   
        // $request->file('file-upload')->storeAs('images', $request['image-name'], 'public');
       
        // $upload->name = trim($request['image-name']);
        // $upload->description = trim($request['image-description']);
        // $upload->save();

    