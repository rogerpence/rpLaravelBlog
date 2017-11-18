<?php
class EnvFile 
{
    private $envContents = [];

    public function getEnvAsArray()
    {
        return $this->envContents;
    }

    public function addOrChangeKey($key, $value) 
    {
        if (isset($this->envContents[$key])) {
            $this->envContents[$key] = $value; 
        }
        else {
            $this->envContents[$key] = $value;
        }
    }

    public function writeEnvFile() 
    {
        $target = [];

        foreach ($this->envContents as $key => $value) {
            if ($key=='*COMMENT') {
                $target[] = $value;
            }
            else if (preg_match('/^\*BLANK/', $key)) {
                $target[] = ''; 
            }
            else {
                $target[] = "{$key}={$value}";
            }
        }    

        file_put_contents('.env-back', implode("\n", $target));
    }
    
    public function parseEnvFile($file) 
    {        
        $count = 0; 

        $env = File(getcwd() . '/.env-copy');

        foreach ($env as $element) {
            if (preg_match('/^\s*#/', $element)) {
                $this->envContents['*COMMENT' . strval($count)] = trim($element);                                    
                $count += 1;
            }
            else if (strpos(trim($element), '=')) {
                $equalPos = stripos($element, '=');
                $key = trim(substr($element, 0,$equalPos));
                $value = trim(substr($element, $equalPos + 1));
                $this->envContents[$key] = $value;
            }        
            else {
                $this->envContents['*BLANK' . strval($count)] = '*BLANK';
                $count += 1;
            }
        }   
    }          
}

$obj = new EnvFile();
$obj->parseEnvFile();
$obj->addOrChangeKey('DB_DATABASE', 'CountryWood');
$obj->addOrChangeKey('GIT_HASH', 'abddfd');
//$obj->showEnvFile();
$obj->writeEnvFile();

$hash = substr(exec('git show -s --format="%h %ci"'), 0, 18);
var_dump($hash);
