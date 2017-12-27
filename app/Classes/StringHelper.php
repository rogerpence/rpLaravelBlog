<?php

namespace App\Classes;

class StringHelper
{
    // public function encodeRegEx($string) {
    //     $specChars = '"\+*?[^]$(){}=!<>|:-/';
    //     $length = strlen($specChars);
    //     $re = $string;
    //     for($i = 0; $i < $length; $i++) {
    //         $c = substr($specChars, $i, 1);
    //         $re = str_replace($c, '\\' . $c, $re);
    //     }
    //     return $re;        
    // }

    public function endsWith($target, $endsWith) {
        //$re = $this->encodeRegEx($endsWith);
        $re = preg_quote($endsWith, "/");
        $re = '/' . $re . '$/';       
        $isMatch = preg_match($re, $target, $matches);
        return $isMatch;
    }     
    
    public function startsWith($target, $startsWith) {
        //$re = $this->encodeRegEx($endsWith);
        $re = preg_quote($startsWith, "/");
        $re = '/^' . $re . '/';       
        $isMatch = preg_match($re, $target, $matches);
        return $isMatch;
    }     
}    
