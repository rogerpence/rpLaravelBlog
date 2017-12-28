<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();

Route::get('/', 'PostsController@index');
//Route::get('/home', 'HomeController@index')->name('home');

Route::get('/posts',           'PostsController@index')->name('posts.list');
Route::get('/posts/create',    'PostsController@create')->name('posts.create');

// Route::get('/posts/{post}',    'PostsController@show')->name('posts.show');
Route::get('/posts/{slug}',    'PostsController@show')->name('posts.show');

Route::get('/posts/{id}/edit', 'PostsController@edit')->name('posts.edit');

Route::delete('/post/{id}', 'PostsController@destroy');

Route::post('/posts', 'PostsController@store')->name('posts.store');
Route::patch('/posts', 'PostsController@store')->name('posts.store');

Route::get('/search','SearchController@show')->name('search.posts');

Route::post('/dashboard/uploads', 'UploadsController@store')->name('uploads.store');

Route::post('/comments/{slug}', 'CommentsController@store')->name('comments.store');

// Route::get('/dashboard', 'DashboardController@home')->name('dashboard.home');
// Route::get('/dashboard/home', 'DashboardController@home')->name('dashboard.home');
// Route::get('/dashboard/images', 'DashboardController@images')->name('dashboard.images');
// Route::get('/dashboard/posts', 'DashboardController@posts')->name('dashboard.posts');
// Route::get('/dashboard/comments', 'DashboardController@comments')->name('dashboard.comments');

Route::get('/test', 'TestsController@auto')->name('test.auto');

Route::get('/posts/tags/{tag}', 'TagsController@index');

Route::get('/dashboard/{slug}', 'DashboardController@show');


Route::get('{slug}', 'PageController@show')->name('page.show');


// Route::get('{slug}', function($slug) {
//     $pages = ['about', 'contact'];
//     if (in_array($slug, $pages)) {        
//         return $slug . ' page';
//     }
//     else {
//         abort(404);                    
//     }
// });