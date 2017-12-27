<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class BlogToolsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        \App::bind('StringHelper', function() {
            return new \App\Classes\StringHelper;
        });
    }
}
