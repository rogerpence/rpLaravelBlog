<?php

namespace App\Classes;

class MyHelpers
{
    public static function pathActive($path, $className = null) {
        $className = ($className == null) ? 'active' : $className; 
        $url = request()->url();

        if (\StringHelper::endsWith($url, $path)) {
            return ' ' . $className . ' '; 
        }
        else {
            return '';
        }            
    }        
}
