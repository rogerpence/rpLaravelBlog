@auth
<div style="background-color: black">
    <ul class="nav">
        <li class="nav-item">
            <div class="dropdown show">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    Pages
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="/">Home page</a>
                    <a class="dropdown-item" href="/posts/create">Create post</a>
                </div>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
        </li>
    </ul>
</div>
@endauth

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- <a class="navbar-brand" href="#">rogerpence.com</a> -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
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
            @auth
                <a class="nav-link" title="Admin panel" href=""><i class="fa fa-wrench" aria-hidden="true"></i></a>&nbsp;
            @endauth

            <li class="nav-item dropdown">               
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    @guest 
                        Account
                    @else 
                        {{ Auth::user()->name }}
                    @endguest                         
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    @guest
                        <a class="dropdown-item" href="{{ route('login') }}"><i class="fa fa-sign-in"></i>&nbsp;Login</a>
                        <a class="dropdown-item" href="{{ route('register') }}"><i class="fa fa-id-card"></i>&nbsp;Register</a> 
                    @else
                        <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                                            document.getElementById('logout-form').submit();">
                            <i class="fa fa-sign-out"></i>&nbsp;Logout
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    @endguest
                </div>
            </li>
        </ul>
    </div>
    <div style="width:48px;">
        &nbsp;
    </div>
</nav>

