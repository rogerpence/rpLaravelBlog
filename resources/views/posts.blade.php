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
            <button type="button" class="btn btn-sm btn-primary">Read more</button>&nbsp;&nbsp;&nbsp;
            <i class="fa fa-pencil-square-o" title="Author"></i> rp&nbsp;&nbsp;&nbsp;
            <i class="fa fa-tags" title="Tags"></i> <a href="#">db</a>&nbsp;&nbsp;&nbsp;
            <a title="Comments" href="#"><i class="fa fa-comments" title="Comments"></i>&nbsp;3</a>
        </div>
        <hr>
    </div>
    
    @endforeach

    <!-- <div class="post">
        <h2>How to reset MariaDB’s root user password</h2>
        <div class="post-date-line">
            <i class="fa fa-calendar" title="Date posted"></i> 3 days ago&nbsp;&nbsp;&nbsp;
            <a href="#">Leave a comment</a>
        </div>
        <p>
            It’s really annoying to forget what your MariaDB’s root account password is. However, with just a little commandline effort,
            it’s an easy challenge to resolve. I learned most of these instructions with this Digial Ocean article. It’s
            a great article but it instructions for ending the MariaDB mysqld process didn’t work for me on Ubuntu…
        </p>
        <div>
            <button type="button" class="btn btn-sm btn-primary">Read more</button>&nbsp;&nbsp;&nbsp;
            <i class="fa fa-pencil-square-o" title="Author"></i> rp&nbsp;&nbsp;&nbsp;
            <i class="fa fa-tags" title="Tags"></i> <a href="#">db</a>&nbsp;&nbsp;&nbsp;
            <a title="Comments" href="#"><i class="fa fa-comments" title="Comments"></i>&nbsp;3</a>
        </div>
        <hr>
    </div> -->

@endsection    

@section('right-column')
    Right column
@endsection 

@section('main.body-at-bottom')
    <!-- JavaScript or other HTML just before closing body tag. -->
@endsection