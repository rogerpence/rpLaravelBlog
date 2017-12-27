<?php
namespace Tests\Unit;

use Tests\TestCase;
//use Illuminate\Foundation\Testing\RefreshDatabase;

class StringsTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     * 
     * To debug with PhpUnit 
     *   - add this environment variable
     *          XDEBUG_CONFIG="idekey=VSCODE"
     *   - set a breakpoint(s)
     *   - set debugger to 'wait for xdebug'
     *   - run unit tests 
     */
    public function encodeRegEx($string) {
        $specChars = '"\+*?[^]$(){}=!<>|:-/';
        $length = strlen($specChars);
        $re = $string;
        for($i = 0; $i < $length; $i++) {
            $c = substr($specChars, $i, 1);
            $re = str_replace($c, '\\' . $c, $re);
        }
        return $re;        
    }

    public function endsWith($target, $endsWith) {
        //$re = $this->encodeRegEx($endsWith);
        $re = preg_quote($endsWith, "/");
        $re = '/' . $re . '$/';       
        $isMatch = preg_match($re, $target, $matches);
        return $isMatch;
    }        

    public function testEndsWith() {
        $str = 'neil/young/dashboard/images';
        $this->assertEquals(\StringHelper::endsWith($str, 'dashboard/images'), 1);

        $str = 'neil/young/dashboard/images+';
        $this->assertEquals(\StringHelper::endsWith($str, 'dashboard/images+'), 1);

        $str = 'neil/young/dashboard/images(\!$+';
        $this->assertEquals(\StringHelper::endsWith($str, 'dashboard/images(\!$+'), 1);

        $this->assertEquals(\StringHelper::endsWith('neil young', 'oung'), 1);
    }

    public function testStartsWith() {
        $str = 'neil/young/dashboard/images';
        $this->assertEquals(\StringHelper::startsWith($str, 'neil/young'), 1);

        $str = 'neil/young/dashboard/images+';
        $this->assertEquals(\StringHelper::startsWith($str, 'neil'), 1);

        $str = '+()neil/young/dashboard/images+';        
        $this->assertEquals(\StringHelper::startsWith($str, '+()neil'), 1);

        $str = '(\!$+neil/young/dashboard/images';
        $this->assertEquals(\StringHelper::startsWith($str, '(\!$+neil/young'), 1);

        $this->assertEquals(\StringHelper::startsWith('neil young', 'neil'), 1);        
    }

}
