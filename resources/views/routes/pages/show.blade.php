@extends('masters.main')

@section('title')
    | {!! $post->title !!} 
@stop

@section('optional-head')
   <meta name="description" content="{{$post->seo_description}}"/>   
   <link rel="stylesheet" href="{{ asset('assets/css/two-column-responsive.css') }}">
   <link rel="stylesheet" href="{{ asset('assets/css/tagchief.css') }}">
@stop

@section('content')
    @if(Session::has('flash'))
        <div class="alert alert-info">
            <a class="close" data-dismiss="alert">×</a>
            <strong>{{ Session::get('flash') }}</strong> 
        </div>
    @endif

    <header>
        @include('partials.top-nav-bar')
        @include('partials.jumbotron')        
    </header>

    <div class="container">
        <div class="wrapper">
            <article class="content" id="article">
                <h2>{{ $post->title }}</h2>
                <div class="show-full-post">
                    {!! $post->body_html !!}
                </div>
            </article>                
            <footer class="main-footer">
            </footer>        
        </div>
    </div>   
@stop

@section('optional-body-bottom')
<!-- bottom of show page -->
<script src="{{ asset('assets/js/rp.lib.js') }}"></script>   
<!-- new -->
<script src="{{ asset('assets/js/routes.pages.show.js') }}"></script>   

<!-- custom scripts here -->
<script>
    {!!$post->javascript!!}
</script>
        
@stop
