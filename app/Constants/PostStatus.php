<?php

namespace App\Constants;

class PostStatus {    
    const DRAFT = 0;
    const PUBLISHED = 1;
    const PAGE = 2;
    const PRIVATE = 3;    

    public static $status = ["DRAFT" => 0, "PUBLISHED" => 1, "PAGE" => 2, "PRIVATE" => 3];
}