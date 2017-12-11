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
        @include('partials.blog-header')        
    </header>

    <div class="container">
        <div class="wrapper">
            <article class="content" id="article">
                <h2>{{ $post->title }}</h2>
                <p class="small">Posted on: {{ $post->created_at->format('l, M d, Y') }}</p>                 
                <div class="show-full-post">
                    {!! $post->body_html !!}
                </div>

                @if(!$comments->isEmpty())
                    <br>
                    <h4>Comments</h4>
                    @if (count($comments)) 
                    @foreach ($comments as $comment)
                        <ul class="list-group>">
                            <li class="list-group-item" style="background-color: whitesmoke">
                                <p class="card-text">
                                    {{ $comment->text }}
                                </p>                        
                                <hr>
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1"><small>Submitted by</small> {{ $comment->from}}</h5>
                                    <small>{{ $comment->created_at->diffForHumans() }}</small>
                                </div>
                            </li>
                        </ul>
                    @endforeach
                    @endif
                @endif               
                <br>
                <h4>Add your comment</h4>                                   
                <div>
                    <form method="post" action="{{ route('comments.store', [$slug]) }}">

                        {{ csrf_field() }}

                        @include('partials.error-list')                        

                        <div class="form-group">
                            <label for="from">Email</label>
                            <input type="email" class="form-control" name="comment_email" id="comment-email" 
                                    placeholder="Email">
                            <small id="emailHelp" class="form-text text-muted">You email is never shared with anyone else.</small>
                        </div>

                        <div class="form-group">
                            <label for="from">Name</label>
                            <input type="text" class="form-control" name="comment_from" id="comment-from" 
                                    placeholder="Name">
                        </div>
                        <div class="form-group">
                            <label for="comment_text">Comment</label>
                            <textarea class="form-control" id="comment_text" name="comment_text" 
                                        placeholder="Your comment"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>

                    <br>
                </div>
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
    <script src="{{ asset('assets/js/show-new.blade.php.js') }}"></script>   
@stop
