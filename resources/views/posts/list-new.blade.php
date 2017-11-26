@extends('masters.main')

@section('title', '| Posts')

@section('optional-head')
   <link rel="stylesheet" href="{{ asset('assets/css/tagchief.css') }}">
@stop

@section('content')
    @section('page-header')
        <header>
            @include('partials.top-nav-bar')
            @include('partials.blog-header')        
        </header>
    @stop               

    <div class="wrapper">        
        <article>
            @include('partials.post-list')
        </article>
        
        <aside>
            @include('partials.tag-list')
        </aside>

        <footer class="main-footer">
        </footer>
    </div>
@stop

@section('optional-body-bottom')
<!-- custom scripts here -->
@stop
