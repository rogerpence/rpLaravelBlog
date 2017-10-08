<?php

namespace App;

use Illuminate\Database\Eloquent\Model as Eloquent;


// Note how the 'as Eloquent' was required above to avoid
// 'Model' naming collision.

class Model extends Eloquent
{
    protected $guarded = [];
}
