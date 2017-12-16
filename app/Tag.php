<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = array('name');

    public function posts() 
    {
        return $this->belongsToMany(Post::class);
    }    

    public function getRouteKeyName() {
        return 'name';
    }
}
