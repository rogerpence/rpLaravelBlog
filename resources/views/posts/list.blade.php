@extends('masters.two-column')

@section('main.head')
   <!-- CSS or other HTML at end of head tag. -->
   @section('main.head')
    <title>rogerpence.com</title>
    <link rel="stylesheet" href="{{ asset('assets/css/tagchief.css') }}">
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
            @auth
                <a title="Edit post" href="/posts/{{ $post->slug }}" ><i class="fa fa-pencil"></i></a>
            @endauth          
            </div>
            <div>
                {!! $post->abstract_html !!}
            </div>
            
            <div class="tags-container">
                <!-- <button type="button" class="btn btn-sm btn-primary">Read more</button>&nbsp;&nbsp;&nbsp; -->
                <a class="small xbtn xbtn-primary xbtn-tiny" href="/posts/{{ $post->id }}" role="xbutton">Read more</a>&nbsp;
                @if (count($post->tags))
                    @foreach ($post->tags as $tag)
                        <span class="tag">
                            <a href="/posts/tags/{{$tag->name}}">
                                {{$tag->name}} 
                            </a>                        
                        </span>
                    @endforeach
                @endif 
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