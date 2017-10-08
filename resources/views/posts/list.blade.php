@extends('masters.two-column')

@section('main.head')
   <!-- CSS or other HTML at end of head tag. -->
@endsection 

@section('left-column')

    @foreach ($posts as $post)    
        <div class="post">
            <a href="/posts/{{ $post->id }}"><h2>{{ $post->title }}</h2></a>
            <div class="post-date-line">
                <i class="fa fa-calendar" title="Date posted"></i> 3 days ago&nbsp;&nbsp;&nbsp;
                <a href="#">Leave a comment</a>
            </div>        
            <div>
                {!! $post->abstract !!}
            </div>
            <br>
            <div>
                <!-- <button type="button" class="btn btn-sm btn-primary">Read more</button>&nbsp;&nbsp;&nbsp; -->
                <a class="btn btn-primary btn-sm" href="/posts/{{ $post->id }}" role="button">Read more</a>
                <i class="fa fa-pencil-square-o" title="Author"></i> rp&nbsp;&nbsp;&nbsp;
                <i class="fa fa-tags" title="Tags"></i> <a href="#">db</a>&nbsp;&nbsp;&nbsp;
                <a title="Comments" href="#"><i class="fa fa-comments" title="Comments"></i>&nbsp;3</a>
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