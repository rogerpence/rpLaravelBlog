@extends('masters.admin')

@section('main.head')
   <!-- CSS or other HTML at end of head tag. -->
   <link rel="stylesheet" href="{{ asset('assets/css/simplemde.min.css') }}">
   <!-- <link rel="stylesheet" href="{{ asset('assets/js/vendor/jquery-ui.min.css') }}"> -->
   <!-- <link rel="stylesheet" href="{{ asset('assets/js/vendor/jquery-ui.theme.min.css') }}"> -->
   <link rel="stylesheet" href="{{ asset('assets/js/vendor/tingle.css') }}">
   
   <link rel="stylesheet" href="{{ asset('assets/js/vendor/flatpickr.css') }}">
   <link rel="stylesheet" href="{{ asset('assets/css/admin-menu.css') }}">
   <style>
    #abstract-container .CodeMirror, #abstract-container  .CodeMirror-scroll 
    {
        min-height: 80px;
    }      
   </style>      
@endsection 

@section('content')
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="/">rogerpence.com</a>
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Settings</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

   <div class="container-fluid">
      <div class="row">
        <nav class="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <a class="nav-link active" href="#">Overview <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Reports</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Analytics</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Export</a>
            </li>
          </ul>

          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <a class="nav-link" href="#">Nav item</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Nav item again</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">One more nav</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Another nav item</a>
            </li>
          </ul>

          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <a class="nav-link" href="#">Nav item again</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">One more nav</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Another nav item</a>
            </li>
          </ul>
        </nav>

        <main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3">
          <h1>Dashboard</h1>
          
          @include($view['section'])

          <section class="row text-center placeholders">
          </section>

          <h2>Section title</h2>
          <div class="table-responsive">
          </div>
        </main>
      </div>
    </div>


@endsection 

