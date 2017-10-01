<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

    <head>
    @include('parts.head')
    @yield('main.head')
    </head>

    <body>
        @include('parts.top-nav-bar')
        @include('parts.blog-header')

        <div class="container">
            @yield('content')
        </div>

        @include('parts.scripts-at-bottom')
        @yield('main.body-at-bottom')
    </body>
</html>

