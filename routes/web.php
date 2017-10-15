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


Route::post('/posts', 'PostsController@store')->name('posts.store');
Route::patch('/posts', 'PostsController@store')->name('posts.store');

Route::post('/comments', 'CommentsController@store')->name('comments.store');
