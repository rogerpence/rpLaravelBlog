<?php

function checkForKey(Array $env_entries, $new_keys) 
{   
    foreach ($new_keys as $new_key) {
        $key = $new_key['key'];
        $value = $new_key['value'];
        $found = $new_key['found'];
    }
        
    foreach ($env_entries as $key_entry) 
    {
        if (trim($key_entry) != '')
        {
            $entry = explode('=', $trim(key_entry));
            if ($value == $key) 
            {
                print_r($values);
            }
        }            
    }
}

$current_config = [];

$env_old = File(getcwd() . '/.env-copy');
$count = 0; 

foreach ($env_old as $element) {
    if (strpos(trim($element), '=')) {
        $parts = explode('=', trim($element));
        print_r($parts);
        $current_config[$parts[0]] = $parts[1];                    
    }        
    else {
        $current_config['*BLANK' . strval($count)] = '*BLANK';
        $count += 1;
    }


}        
print_r($current_config['APP_KEY']);
echo  $current_config['APP_KEY'];
print_r($current_config);

foreach ($current_config as $key => $value) {
    print_r($key . ':' . $value . "\n");
}    



die();
$x = 'f';






//print_r($env_old);

$new_keys = [
    ['key' => 'GIT_HASH', 'value' => 'abcdef', 'found' => false],
    ['key' => 'GIT_ONE' , 'value' => 'fhgihi', 'found' => false],
    ['key' => 'DB_USERNAME' , 'value' => 'kvdvdd', 'found' => false]
];

foreach ($new_keys as $new_key) 
{
    checkForKey($env_old, $new_key);
    // foreach($new_key as $key => $value) 
    // { 
        
    // }                
}



