<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Post extends Model
{
    use Searchable;

    public function toSearchableArray()
    {
        // $array = $this->toArray();

        return [
            "id" => $this->id,
            "title" => $this->title,
            "body" => $this->body_markdown
        ];         
              


        // Customize array...

        //return $array;
    }    

    public static function getValidationRules($id)
    {
        return $validationRules = [
            'title' => 'required|unique:posts,title,' . $id, 
            'slug' => 'required|unique:posts,slug,' . $id, 
            'body' => 'required',
            'abstract' => 'required',
            'seo_description' => 'required'];        
    }                   

    // $model->relation() returns the relationship object
    // $model->relation returns the result of the relationship    
    // https://stackoverflow.com/questions/28223289/difference-between-method-calls-model-relation-and-model-relation

    public function comments() 
    {
        return $this->hasMany(Comment::class);

        // Works.            
        // $post->hasMany(Comment::class)->where('comment_id','=',0)->get()
    }

    public function tags() 
    {
        return $this->belongsToMany(Tag::class);
    }

    public static function activeTags() 
    {
        return \App\Tag::has('posts')->orderby('name','asc')->pluck('name')->toArray();
    }        
    
}



        // return $this->hasMany(Comment::class)->whereHas('comments', function ($query) {
        //     $query->where('comment_id', '=', 0);
        // });            
