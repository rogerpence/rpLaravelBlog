<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Constants\PostStatus;
use Illuminate\Support\Facades\Blade;
use Illuminate\Http\Request;

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
            $view->with('pages', \App\Post::select('title','slug')->orderby('title')->where('status', PostStatus::PAGE)->get()->toArray());                                          
        });

        view()->composer(['posts.list-new', 'posts.list-search','posts.show-new'], function($view) {            
            $view->with('activeTags', \App\Post::activeTags());                                          
        });

        // php artisan view:clear
        Blade::directive('isPathActive', function($path) { 
            // $className = 'active';
            // $url = request()->url();

            // if (\StringHelper::endsWith($url, $path)) {
            //     return "<?php echo 'active' QM>";                        
            // }
            // else {
            //     return '';
            // }            
            
            // Swap out two leading quotes for a single leading quote.
            $path = str_replace("''", "'", $path);                               
            $php = "<?php echo \App\Classes\MyHelpers::pathActive({$path}) ?>";                        
            return $php;                                                         
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
