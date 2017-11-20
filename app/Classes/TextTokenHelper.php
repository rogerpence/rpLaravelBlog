<?php 

namespace App\Classes;

class TextTokenHelper {

    private function prettifyDirective($argument) {
        /*
         | Directive syntax:
         |     {{prettify=[lang|*default]:[true|*false]}}         
         | Examples
         |     {{prettify=js:true}}
         |     {{prettify=js:false}}
         |     {{prettify=default}}
        */
        $linenums = 'false';
        $parts = explode(':', $argument);
        $language = trim($parts[0]);
        if ($language=='default') {
            $language = '';
        }
        else {
            $language = 'lang=' . $language;                
        }
        if (sizeof($parts)==2) {
            $linenums = $parts[1];                
        }
        $action = "<!--prettify {$language} linenums={$linenums}-->";
        return $action;        
    }

    private function getDirectiveAction($directive, $argument) {
        if ($directive == 'prettify') {
            return $this->prettifyDirective($argument);
        }        
        else {
            $error = [];
            $error[] = '<div class="alert alert-danger" role="alert">';
            $error[] = 'DIRECTIVE NOT FOUND: ' . $directive;    
            $error[] = '</div>';
            return join('', $error);
        }
    }

    private function textBeforeAndAfterToken($body, $entireToken) {
        $startPos = stripos($body, $entireToken);
        $endPos = $startPos + strlen($entireToken);
        $before = substr($body, 0, $startPos);
        $after = substr($body, $endPos, strlen($body) - $endPos);

        return ['before' => $before, 'after'=> $after];
    }

    private function insertAction($body, $entireToken, $action) {
        $parts = $this->textBeforeAndAfterToken($body, $entireToken);    
        return $parts['before'] . $action . $parts['after'];
    } 

    public function swapTokens($body) {
        $re = '/\{\{\s*(.*)\s*=\s*(.*)\s*\}\}/';
        preg_match_all($re, $body, $matches, PREG_SET_ORDER, 0);
        if (sizeof($matches) > 0) {
            foreach ($matches as $match) {
                if (sizeof($match) == 3) {
                    $entireToken = $match[0];
                    $directive = trim($match[1]);
                    $argument = trim($match[2]);
                    $action = $this->getDirectiveAction($directive, $argument);
                    $body = $this->insertAction($body, $entireToken, $action);
                }                
            }                
        }
        return $body;
    }
}