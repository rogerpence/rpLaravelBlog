<?php
class EnvFile 
{
    private $env_contents = [];

    public function show_env_file() 
    {
        foreach ($this->env_contents as $key => $value) 
        {
            print_r($key . ':' . $value . "\n");
        }    
    }

    public function add_or_change_key($key, $value) 
    {
        if (isset($this->env_contents[$key])) 
        {
            $this->env_contents[$key] = $value; 
        }
        else 
        {
            $this->env_contents[$key] = $value;
        }
    }

    public function write_env_file() 
    {
        $target = [];

        foreach ($this->env_contents as $key => $value) {
            if ($key=='*COMMENT') 
            {
                $target[] = $value;
            }
            else if (preg_match('/^\*BLANK/', $key))
            {
                $target[] = ''; 
            }
            else {
                $target[] = "{$key}={$value}";
            }
        }    

        file_put_contents('.env-back', implode("\n", $target));
    }
    
    public function parse_env_file($file) 
    {        
        $count = 0; 

        $env = File(getcwd() . '/.env-copy');

        foreach ($env as $element) {

            if (preg_match('/^\s*#/', $element))
            {
                $this->env_contents['*COMMENT' . strval($count)] = trim($element);                                    
                $count += 1;
            }
            else if (strpos(trim($element), '=')) 
            {
                $equalPos = stripos($element, '=');
                $key = trim(substr($element, 0,$equalPos));
                $value = trim(substr($element, $equalPos + 1));
                $this->env_contents[$key] = $value;
            }        
            else 
            {
                $this->env_contents['*BLANK' . strval($count)] = '*BLANK';
                $count += 1;
            }
        }   
    }             
}

$obj = new EnvFile();
$obj->add_or_change_key('DB_DATABASE', 'CountryWood');
$obj->add_or_change_key('GIT_HASH', 'abddfd');
$obj->show_env_file();
$obj->write_env_file();

$hash = substr(exec('git show -s --format="%h %ci"'), 0, 18);
var_dump($hash);
