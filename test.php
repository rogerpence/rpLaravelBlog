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
    else {
        return 'DIRECTIVE NOT FOUND: ' . $directive;
    }
}
function textBeforeAndAfterToken($body, $entireToken) {
    $startPos = stripos($body, $entireToken);
    $endPos = $startPos + strlen($entireToken);
    $before = substr($body, 0, $startPos);
    $after = substr($body, $endPos, strlen($body) - $endPos);

    return ['before' => $before, 'after'=> $after];
}

function insertAction($body, $entireToken, $action) {
    $parts = textBeforeAndAfterToken($body, $entireToken);    
    return $parts['before'] . $action . $parts['after'];
} 

function swapTokens($body) {
    $re = '/\{\{\s*(.*)\s*=\s*(.*)\s*\}\}/';
    preg_match_all($re, $body, $matches, PREG_SET_ORDER, 0);
    if (sizeof($matches) > 0) {
        foreach ($matches as $match) {
            if (sizeof($match) == 3) {
                $entireToken = $match[0];
                $directive = trim($match[1]);
                $argument = trim($match[2]);
                $action = getTokenAction($directive, $argument);
                $body = insertAction($body, $entireToken, $action);
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
