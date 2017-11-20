<?php
function getTokenAction($directive, $argument) {
    $linenums = 'false';
    if ($directive == 'prettify') {
        $parts = explode(':', $argument);
        $language = trim($parts[0]);
        if (sizeof($parts)==2) {
            $linenums = $parts[1];                
        }
        $action = "<!--prettify lang={$language} linenums={$linenums}-->";
        return $action;
    }        
}



function swapTokens($body) {
    //$re = '/\{\{\s*lang=(\s*\w*:.*)\}\}/';
    
    //$re = '/\{\{\s*lang=(\s*.*)\}\}/';
    //$prettify = '<!--prettify lang=js linenums=true-->';

    $re = '/\{\{\s*(.*)\s*=\s*(.*)\s*\}\}/';
    preg_match_all($re, $body, $matches, PREG_SET_ORDER, 0);
    if (sizeof($matches) > 0) {
        foreach ($matches as $match) {
            if (sizeof($match) == 3) {
                $entireToken = $match[0];
                $directive = trim($match[1]);
                $argument = trim($match[2]);
                $action = getTokenAction($directive, $argument);
                $startPos = stripos($body, $entireToken);
                $endPos = $startPos + strlen($entireToken);
                $begText = substr($body, 0, $startPos);
                $endText = substr($body, $endPos, strlen($body) - $endPos);

                $body = $begText . $action . $endText;
            }                
        }                
    }
}
//  7 20
$str = 'abcdefg{{ prettify=js:true }}lmnnopqrst
abc de {{lang=js:l}} asdf
abc de {{ lang=js:language:rogerpence3 }} asdf
';
swapTokens($str);

// $re = '/\{\{\s*lang=(\s*\w*:.*)\}\}/';
// $str = 'abc de {{ prettify=js }} asdf

// abc de {{lang=js:language:rogerpence2}} asdf

// abc de {{ lang=js:language:rogerpence3 }} asdf

// ';

// preg_match_all($re, $str, $matches, PREG_SET_ORDER, 0);

// //var_dump($matches);
// print_r(sizeof($matches));

// foreach ($matches as $match) {
//     //var_dump($match);
//     //var_dump(sizeof($match));
//     print_r($match[0] . "\n");
//     print_r($match[1] . "\n");
    
//     // foreach ($match as $token) {
//     //     //var_dump($token);
//     //     var_dump(sizeof($token));
//     //     //print_r(size($token));
//     //     //print($token . "\n");
//     // }
//     //print_r($match);
// }
