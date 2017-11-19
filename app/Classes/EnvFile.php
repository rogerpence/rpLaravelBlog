<?php

namespace App\Classes;

class EnvFile
{
    private $envContents = [];

    private $envFileName;

    function __construct($file) 
    {
        $file = getcwd() . $file;
        $this->envFileName = $file;

        if (! file_exists($file)) 
        {
            throw new \Exception("File ${file} not found in App\Classes\EnvFile constructor.");
        }
        $this->read($file);
    }

    public function addOrChangeKey($key, $value)
    {
        $this->envContents[$key] = $value;
    }

    public function save()
    {
        $target = [];

        foreach ($this->envContents as $key => $value) {
            if ($key == '*COMMENT') {
                $target[] = $value;
            } else if (preg_match('/^\*BLANK/', $key)) {
                $target[] = '';
            } else {
                if (stripos($value, ' ')) {                
                    $target[] = "{$key}=\"{$value}\"";
                }
                else {
                    $target[] = "{$key}={$value}";
                }
            }
        }

        file_put_contents($this->envFileName, implode("\n", $target));
    }

    private function removeLeadingAndTrailingQuotes($value) 
    {
        $result = preg_replace('/^"/', '', $value);
        $result = preg_replace('/"$/', '', $result);                                        
        return $result;        
    }

    private function read($file)
    {
        $count = 0;

        $env = File($file);

        foreach ($env as $element) {
            if (preg_match('/^\s*#/', $element)) {
                $this->envContents['*COMMENT' . strval($count)] = trim($element);
                $count += 1;
            } else if (strpos(trim($element), '=')) {
                $equalPos = stripos($element, '=');
                $key = trim(substr($element, 0, $equalPos));
                $value = trim(substr($element, $equalPos + 1));
                $value = $this->removeLeadingAndTrailingQuotes($value);
                $this->envContents[$key] = $value;
            } else {
                $this->envContents['*BLANK' . strval($count)] = '*BLANK';
                $count += 1;
            }
        }
        $t = $this->envContents;
        
    }
}
