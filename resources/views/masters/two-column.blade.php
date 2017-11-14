<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

    <head>
        @include('partials.head')
        @yield('main.head')
    </head>

    <body>
        @include('partials.top-nav-bar')
        @include('partials.blog-header')

        <div class="container">
            <div class="row">
                <div class="col-8">
                    @yield('left-column')
                </div>            
                <div class="col">
                    @yield('right-column')
                </div>
            </div>
        </div>                
        
        @include('partials.scripts-at-bottom')
        @yield('main.body-at-bottom')
    </body>
</html>

