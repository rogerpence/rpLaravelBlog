<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

    <head>
        @include('partials.head')
        @yield('main.head')
    </head>

    <body>
        @include('partials.admin-bar')

        @yield('content')        

        @include('partials.scripts-at-bottom')
        @yield('main.body-at-bottom')        
    </body>
</html>

