<?php
$re = '/\{\{\s*lang=(\s*\w*:.*)\}\}/';
$str = 'abc de {{ lang=js:language:rogerpence1 }} asdf

abc de {{lang=js:language:rogerpence2}} asdf

abc de {{ lang=js:language:rogerpence3 }} asdf

';

preg_match_all($re, $str, $matches, PREG_SET_ORDER, 0);

//var_dump($matches);

foreach ($matches as $match) {
    //var_dump($match);
    //var_dump(sizeof($match));
    print_r($match[0] . "\n");
    print_r($match[1] . "\n");
    
    // foreach ($match as $token) {
    //     //var_dump($token);
    //     var_dump(sizeof($token));
    //     //print_r(size($token));
    //     //print($token . "\n");
    // }
    //print_r($match);
}
