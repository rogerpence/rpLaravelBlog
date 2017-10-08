@extends('masters.no-columns')

@section('main.head')


@endsection 

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-8">
                <h2>{{ $post->title }}</h2>
                <p>Posted on: {{ $post->created_at->format('l, M d, Y') }}</p>                 
                <div>
                    {!! $post->body_html !!}
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