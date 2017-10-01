@extends('masters.two-column')

@section('main.head')
   <!-- CSS or other HTML at end of head tag. -->
@endsection 

@section('left-column')
    <div class="post">
        <h2>Launch VirtualBox VM with a .desktop file</h2>
        <div class="post-date-line">
            <i class="fa fa-calendar" title="Date posted"></i> 3 days ago&nbsp;&nbsp;&nbsp;
            <a href="#">Leave a comment</a>
        </div>
        <p>
            I’m using a VirutalBox VM on a PHP project The VM is a desktop version of Ubuntu 17.04, sometimes used with one monitor and
            sometimes used with two. VB works great in this environment but its multiple monitor capabilities are a little
            prickly. Launching the VM with one monitor when the settings are set for… </p>
        <div>
            <button type="button" class="btn btn-sm btn-primary">Read more</button>&nbsp;&nbsp;&nbsp;
            <i class="fa fa-pencil-square-o" title="Author"></i> rp&nbsp;&nbsp;&nbsp;
            <i class="fa fa-tags" title="Tags"></i> <a href="#">db</a>&nbsp;&nbsp;&nbsp;
            <a title="Comments" href="#"><i class="fa fa-comments" title="Comments"></i>&nbsp;3</a>
        </div>
        <hr>
    </div>
    <div class="post">
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
    </div>
@endsection    

@section('right-column')
    Right column
@endsection 

@section('main.body-at-bottom')
    <!-- JavaScript or other HTML just before closing body tag. -->
@endsection