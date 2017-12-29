<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\UploadsRepository;

class UploadsController extends Controller
{
    public function store(Request $request)
    {       
        (new UploadsRepository())->store($request);
        //return back();
        return redirect('dashboard/uploads');
    }
}
