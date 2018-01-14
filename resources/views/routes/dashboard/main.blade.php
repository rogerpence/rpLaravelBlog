@extends('masters.admin')

@section('main.head')
   <!-- CSS or other HTML at end of head tag. -->
   <!-- <link rel="stylesheet" href="{{ asset('assets/js/vendor/simplemde.min.css') }}"> -->
   <!-- <link rel="stylesheet" href="{{ asset('assets/js/vendor/jquery-ui.min.css') }}"> -->
   <!-- <link rel="stylesheet" href="{{ asset('assets/js/vendor/jquery-ui.theme.min.css') }}"> -->
   <link rel="stylesheet" href="{{ asset('assets/js/vendor/tingle.css') }}">
   <link rel="stylesheet" href="{{ asset('assets/js/vendor/notifier.min.css') }}">
   
   <link rel="stylesheet" href="{{ asset('assets/js/vendor/flatpickr.css') }}">
   <link rel="stylesheet" href="{{ asset('assets/css/admin-menu.css') }}">

   <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.16/datatables.min.css"/>
 
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
              <a class="nav-link" href="/dashboard/home">Dashboard home <span class="sr-only">(current)</span></a>
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
              <a class="nav-link @isPathActive('dashboard/home')" 
                 href="/dashboard/home">Overview</a>
            </li>
            <li class="nav-item">
              <a class="nav-link @isPathActive('dashboard/posts')" 
                 href="/dashboard/posts">Posts</a>
            </li>
            <li class="nav-item">
              <a class="nav-link @isPathActive('dashboard/comments')" 
                  href="/dashboard/comments">Comments</a>
            </li>
            <li class="nav-item">
             <a class="nav-link @isPathActive('dashboard/images')"
                  href="/dashboard/images">Images</a>
            </li>
          </ul>
{{--
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <a class="nav-link" href="#">Nav item</a>
            </li>+
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
--}}          
        </nav>

        <main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3">
          @include($view['section'])
        </main>
        
      </div>
    </div>


@endsection 

