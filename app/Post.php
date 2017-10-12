<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public static function getValidationRules($id)
    {
        return $validationRules = [
            'title' => 'required|unique:posts,title,' . $id, 
            'slug' => 'required|unique:posts,slug,' . $id, 
            'body' => 'required',
            'abstract' => 'required',
            'seo_description' => 'required'];        
    }                   
}
