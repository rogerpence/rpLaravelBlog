<?php

namespace App\Classes;

class MyHelpers
{
    public static function pathActive($path, $token = null) {
        $token = ($token == null) ? 'active' : $token; 
        $url = request()->url();

        if (\StringHelper::endsWith($url, $path)) {
            return ' ' . $token . ' '; 
        }
        else {
            return '';
        }            
    }        
}
