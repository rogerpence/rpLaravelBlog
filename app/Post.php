<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    
    public static function getValidationRules()
    {
        return $validationRules = [
            'title' => 'required|unique:posts,title',
            'body' => 'required',
            'abstract' => 'required',
            'seo_description' => 'required'];        
    }                
    
}
