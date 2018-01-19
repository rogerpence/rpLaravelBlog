let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js(['resources/assets/js/app.js'], 'public/compiled.js')
   .scripts([
        'public/assets/js/app.images.js',
        'public/assets/js/routes.images.js',
        'public/assets/js/routes.posts.create.js',
        'public/assets/js/routes.posts.show.js',
        'public/assets/js/rp.ajax.js',
        'public/assets/js/rp.lib.js',
        'public/assets/js/rp.modaldialogs.js',
        'public/assets/js/rp.stringLib.js',
        'public/assets/js/rp.tagchief.js',
        'public/assets/js/rp.tagchiefdatalistprovider.js',
        'public/assets/js/rp.typingTracker.js',
        'public/assets/js/view-image-modal.js',

   ], 'public/assets/rp-all.js');
