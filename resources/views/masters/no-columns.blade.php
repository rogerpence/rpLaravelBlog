<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

    <head>
        @include('partials.head')
        @yield('main.head')
    </head>

    <body>
        @include('partials.top-nav-bar')
        @include('partials.blog-header')

        @yield('content')
        
        @include('partials.scripts-at-bottom')
        @include('main.body-at-bottom')
    </body>
</html>

