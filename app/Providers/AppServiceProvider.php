<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Classes\PageStatus;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //$pages = ;
        view()->composer(['*'], function($view) {            
            $view->with('pages', \App\Post::select('title','slug')->orderby('title')->where('status', PageStatus::Page)->get()->toArray());                                          
        });

        view()->composer(['posts.list-new', 'posts.list-search','posts.show-new'], function($view) {            
            $view->with('activeTags', \App\Post::activeTags());                                          
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
