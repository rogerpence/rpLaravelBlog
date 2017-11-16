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
            $entry = explode('=', $key_entry);
            if ($value == $key) 
            {
                print_r($values);
            }
        }            
    }
}

$current_config = [];

$env_old = File(getcwd() . '/.env-copy');
foreach ($env_old as $element) {
    if (trim($element) < 4) {
        $parts = explode('=', $element);
        $current_config[$parts[0]] = $parts[0];    
    }                
}        

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



