<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
        <script src="https://use.fontawesome.com/ca38661c31.js"></script>           
    </head>

    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <!-- <a class="navbar-brand" href="#">rogerpence.com</a> -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">About <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                    </li>
                </ul>
                <!-- <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> -->

                <!-- <ul class="nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" 
                            aria-haspopup="true" aria-expanded="false">Roger Pence</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Logout</a>
                            <a class="dropdown-item" href="#">Profile</a>
                        </div>
                    </li>
                </ul> -->

                <ul class="nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" 
                            aria-haspopup="true" aria-expanded="false">
                            @guest 
                                Account
                            @else 
                                {{ Auth::user()->name }}
                            @endguest                         
                        </a>
                        <div class="dropdown-menu">
                            @guest
                                <a class="dropdown-item" href="{{ route('login') }}">Login</a>
                                <a class="dropdown-item" href="{{ route('register') }}">Register</a>
                            @else 
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                            document.getElementById('logout-form').submit();">
                                    Logout
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>                                                                
                            @endguest
                        </div>
                    </li>
                </ul>                
            </div>
        </nav>

        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-5">rogerpence.com</h1>
                <p class="lead">A nerd's blog</p>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-8">
                    <div class="post">
                        <h2>Launch VirtualBox VM with a .desktop file</h2>
                        <div class="post-date-line">
                            <i class="fa fa-calendar" title="Date posted"></i> 3 days ago&nbsp;&nbsp;&nbsp;
                            <a href="#">Leave a comment</a>
                        </div>
                        <p>
                            I’m using a VirutalBox VM on a PHP project The VM is a desktop version of Ubuntu 17.04, sometimes used with one monitor and sometimes used with two. VB works great in this environment but its multiple monitor capabilities are a little prickly. Launching the VM with one monitor when the settings are set for… </p>
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
                            It’s really annoying to forget what your MariaDB’s root account password is. However, with just a little commandline effort, it’s an easy challenge to resolve. I learned most of these instructions with this Digial Ocean article. It’s a great article but
                            it instructions for ending the MariaDB mysqld process didn’t work for me on Ubuntu… 
                        </p>
                        <div>
                            <button type="button" class="btn btn-sm btn-primary">Read more</button>&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-pencil-square-o" title="Author"></i> rp&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-tags" title="Tags"></i> <a href="#">db</a>&nbsp;&nbsp;&nbsp;
                            <a title="Comments" href="#"><i class="fa fa-comments" title="Comments"></i>&nbsp;3</a>
                        </div>
                        <hr>
                    <div class="col">
                    <!-- Sidebar here. -->

                </div>
            </div>
        </div>

        <!-- Scripts -->
        <script src="{{ asset('assets/js/vendor/jquery.js') }}"></script>
        <script src="{{ asset('assets/js/vendor/popper.js') }}"></script>
        <script src="{{ asset('assets/js/vendor/bootstrap.min.js') }}"></script>
        <script src="{{ asset('assets/js/app.js') }}"></script>
    </body>
</html>

