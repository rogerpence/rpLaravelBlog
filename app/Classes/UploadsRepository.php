<?php

namespace App\Classes;

class UploadsRepository {

    public function store($request)
    {
        if (isset($request['postid'])) {
            $id = $request['postid']; 
            $upload = \App\Upload::find($id);
        }
        else {
            $upload = new \App\Upload();
        }
   
        $request->file('file-upload')->storeAs('images', $request['image-name'], 'public');
       
        $upload->name = trim($request['image-name']);
        $upload->description = trim($request['image-description']);
        $upload->save();
    }        

}    