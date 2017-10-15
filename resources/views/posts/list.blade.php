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
            @auth
                <a class="headline" href="/posts/{{ $post->id }}/edit"><h2>{{ $post->title }}</h2></a>    
            @else
                <a class="headline" href="/posts/{{ $post->slug }}"><h2>{{ $post->title }}</h2></a>
            @endauth
            <div class="post-date-line">
                <i class="fa fa-calendar" title="Date posted"></i> {{$post->created_at->format('l, M d, Y')}}&nbsp;&nbsp;&nbsp;            
            </div>        
            <div>
                {!! $post->abstract !!}
            </div>
            <br>
            <div>
                <!-- <button type="button" class="btn btn-sm btn-primary">Read more</button>&nbsp;&nbsp;&nbsp; -->
                <a class="btn btn-primary btn-tiny" href="/posts/{{ $post->id }}" role="button">Read more</a>
                <i class="fa fa-pencil-square-o" title="Author"></i> rp&nbsp;&nbsp;&nbsp;
                <i class="fa fa-tags" title="Tags"></i> <a href="#">db</a>&nbsp;&nbsp;&nbsp;
                <a title="Comments" href="#"><i class="fa fa-comments" title="Comments"></i>&nbsp;3</a>
                <a href="#">Leave a comment</a>
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