<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('assets/css/foundation.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
    </head>

    <body>
        <div class="title-bar" data-responsive-toggle="example-menu" data-hide-for="medium">
            <button class="menu-icon" type="button" data-toggle="example-menu"></button>
            <div class="title-bar-title">Menu</div>
        </div>

        <div class="top-bar" id="example-menu">
            <div class="top-bar-left">
                <ul class="dropdown menu" data-dropdown-menu>
                    <li class="menu-text">Site Title</li>
                    <li><a href="#0">About</a></li>
                    <li><a href="#0">Contact</a></li>
                </ul>
            </div>
            <div class="top-bar-right">
                <ul class="menu">
                    
                    <!-- Search commented out for now.
                        <li><input type="search" placeholder="Search"></li>
                        <li><button type="button" class="button">Search</button></li> 
                    -->

                    @guest                        
                        <li><a href="{{ route('login') }}">Login</a></li>                
                        <li><a href="{{ route('Register') }}">Register</a></li>
                    @else                        
                        <ul class="dropdown menu" data-dropdown-menu>
                            <li>
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                            {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="menu">
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>                                    
                                    </li>
                                </ul>
                            </li>
                        </ul>


                    @endguest                        
                </ul>
            </div>
        </div>

















        <div>
            @yield('content')
        </div>

        <!-- Scripts -->
        <script src="{{ asset('assets/js/vendor/jquery.js') }}"></script>
        <script src="{{ asset('assets/js/vendor/what-input.js') }}"></script>
        <script src="{{ asset('assets/js/vendor/foundation.js') }}"></script>
        <script src="{{ asset('assets/js/app.js') }}"></script>
    </body>
</html>

