@extends('masters.no-columns')

@section('main.head')
    <title>{{ $post->title }} | rogerpence.com</title>
@endsection 

@section('content')
    @if(Session::has('flash'))
        <div class="alert alert-info">
            <a class="close" data-dismiss="alert">×</a>
            <strong>{{ Session::get('flash') }}</strong> 
        </div>
    @endif

    <div class="container">
        <div class="row">
            <div class="col-8">
                <h2>{{ $post->title }}</h2>
                <p>Posted on: {{ $post->created_at->format('l, M d, Y') }}</p>                 
                <div>
                    {!! $post->body_html !!}
                </div>

                @if(!$comments->isEmpty())
                    <br>
                    <h4>Comments</h4>
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
                <h4>Add your comment</h4>                                   
                <div>
                    <form method="post" action="{{ route('comments.store', [$slug]) }}">

                        {{ csrf_field() }}

                        @include('partials.error-list')                        

                        <div class="form-group">
                            <label for="from">Email address or name</label>
                            <input type="text" class="form-control" name="from" id="from" aria-describe or namedby="emailHelp" 
                                    placeholder="Email or name">
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
            </div>
            <div class="col">
            </div>
        </div>                
    </div>
@endsection 

@section('main.body-at-bottom')
    <script>
    </script>
@endsection