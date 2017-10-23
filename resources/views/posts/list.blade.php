@extends('masters.two-column')

@section('main.head')
   <!-- CSS or other HTML at end of head tag. -->
   @section('main.head')
    <title>rogerpence.com</title>
@endsection 

@endsection 

@section('left-column')
    @foreach ($posts as $post)            
        <div class="post">

            <a class="headline" href="/posts/{{ $post->slug }}"><h2>{{ $post->title }}</h2></a>
            @isset($post->subtitle)
                <h4>{{$post->subtitle}}</h4>
            @endisset

            <div class="post-date-line">
                {{$post->created_at->format('l, M d, Y')}} by rp
            </div>        
            <div>
                {!! $post->abstract !!}
            </div>
            <br>
            <div>
                <!-- <button type="button" class="btn btn-sm btn-primary">Read more</button>&nbsp;&nbsp;&nbsp; -->
                <a class="btn btn-primary btn-tiny" href="/posts/{{ $post->id }}" role="button">Read more</a>
                <a href="#">Laravel</a> | <a href="#">JavaScript</a> | <a href="#">PHP</a>
            </div>
            <hr>
        </div>    
    @endforeach

@endsection    

@section('right-column')
    Right column
@endsection 

@section('main.body-at-bottom')
    <!-- JavaScript or other HTML just before closing body tag. -->
@endsection