<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

    <head>
        @include('partials.head')
        @yield('main.head')
    </head>

    <body>
        @include('partials.admin-bar')
    
        @yield('content')        
    </body>
</html>

