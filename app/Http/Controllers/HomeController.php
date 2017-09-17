<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Person;

class HomeController extends Controller
{
    protected $person;

    public function __construct(Person $person) {
        $this->person = $person;
        $this->person->first_name = 'Roger';
        $this->person->last_name = 'Pence';
    }

    public function index() 
    {
        return 'Hello from ' . $this->person->first_name .
                         ' ' . $this->person->last_name;
    } 
}
