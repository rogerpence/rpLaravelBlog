<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestsController extends Controller
{

    public function auto() 
    {
        return view('test');
    }
}
