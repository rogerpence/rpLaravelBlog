<?php

namespace App\Classes;

class MyHelpers
{
    private static function endsWith($haystack, $needle)
    {
        $length = strlen($needle);

        return $length === 0 || 
        (substr($haystack, -$length) === $needle);
    }    

    public static function pathActive($path, $token = null) {
        if ($token == null ) {
            $token = 'active';
        }

        //$path = str_replace("'", "", $path);    

        $url = request()->url();
        if (\App\Classes\MyHelpers::endsWith($url, $path)) {
//        if (endsWith($url, $path)) {
            return ' ' . $token . ' '; 
        }
        else {
            return '';
        }            
    }        
}
