<?php

function isInList($needle, $list, $msg) {
    if (in_array($needle, $list)) {
        return true;
    }    
    // those error here.

    return false;
}