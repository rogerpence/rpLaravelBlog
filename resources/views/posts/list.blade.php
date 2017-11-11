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
            </div>
            <div>
                {!! $post->abstract_html !!}
            </div>
            
            <div class="tags-container">
                <!-- <button type="button" class="btn btn-sm btn-primary">Read more</button>&nbsp;&nbsp;&nbsp; -->
                @auth
                    <a title="Edit post" href="/posts/{{ $post->id }}/edit" ><i class="fa fa-pencil"></i></a>&nbsp;
                @endauth          
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
        <h4>Tags</h4>

            <div class="tags-container">                
            @foreach ($activeTags as $activeTag) 
            <a class="pseudo-list" style="color: black;" href="/posts/tags/{{ $activeTag }}">{{ $activeTag }}</a> 
            @if($activeTag != end($activeTags))<i class="fa fa-circle"style="font-size:40%;margin-top:10px;margin-left:5px;margin-right:5px;"></i>@endif
            {{-- <li class="xlist-group simple-list-item">
                <a class="xxsimple-list-item" href="/posts/tags/{{ $activeTag }}">{{ $activeTag }}</a>&nbsp;
            </li> --}}
            @endforeach        
            </div>
        
@endsection 

@section('main.body-at-bottom')
    <!-- JavaScript or other HTML just before closing body tag. -->
@endsection