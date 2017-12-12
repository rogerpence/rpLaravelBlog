@auth
    @include('partials.admin-bar')
@endauth

<nav class="main-nav navbar navbar-expand-lg navbar-light bg-light">
    <!-- <a class="navbar-brand" href="#">rogerpence.com</a> -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="/about">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/contact">Contact</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/links">Links</a>
            </li>
        </ul>

        <ul class="nav">

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

