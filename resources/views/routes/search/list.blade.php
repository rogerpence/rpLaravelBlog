@extends('masters.main')

@section('title', '| Posts')

@section('optional-head')
   <link rel="stylesheet" href="{{ asset('assets/css/two-column-responsive.css') }}">
   <link rel="stylesheet" href="{{ asset('assets/css/tagchief.css') }}">
@stop

@section('content')
    <header>
        @include('partials.top-nav-bar')
        @include('partials.jumbotron')        
    </header>
    <div class="container">   
        <div class="wrapper">        
            <article class="content" id="article">
                @include('partials.search.list')
            </article>
            
            <aside class="sidebar" id="sidebar">
                @include('partials.tag-list')
            </aside>

            <footer class="main-footer">
            </footer>
        </div>
    </div>
@stop

@section('optional-body-bottom')
<!-- custom scripts here -->
@stop
