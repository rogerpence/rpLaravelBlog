## Step 1. Stub in authorization

Although you might not want authorization built into the project immediately, you almost certainly will at some point. So, issue this Artisan `make` command first so you don't have to worry about its impact on your routes later. 

	php artisan make:auth

Note that when you stub in authorization, it modifies these files:

	app/Http/Controllers/HomeController.php
	app/Http/Middleware/RedirectIfAuthenticated.php
	routes/web.php

and modifies these files:

    resources/views/auth/
    resources/views/home.blade.php
    resources/views/layouts/

In `routes/web.php`, it added these three lines:

	Route::get('/', 'HomeController@index');
	Auth::routes();
	Route::get('/home', 'HomeController@index')->name('home');

To temporarily disable authorization, 

A. In the HomeController.php file, comment out the line that registers the `auth` middleware. 

    public function __construct()
    {
        //$this->middleware('auth');
    }

When you later want to hook up authorization, you'll uncomment this line.

## MariaDB 

mysql -u roger -p 
password = roger

Show mysql processes

ps aux | grep mysql 

kill main mysql process

or

sudo mysqld stop