<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <title>rogerpence.com @yield('title')</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">     
        @include('partials.head')
        @yield('optional-head')   
    </head>
    <body>
        @yield('content')
   </body>

    @include('partials.scripts-at-bottom')
    @yield('optional-body-bottom')       
</html>