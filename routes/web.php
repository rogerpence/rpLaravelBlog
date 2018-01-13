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

Auth::routes();

Route::get('/', 'PostsController@index');

Route::get('/posts',           'PostsController@index')->name('posts.list');
Route::get('/posts/create',    'PostsController@create')->name('posts.create');
Route::get('/posts/{slug}',    'PostsController@show')->name('posts.show');
Route::get('/posts/{id}/edit', 'PostsController@edit')->name('posts.edit');
Route::delete('/post/{id}', 'PostsController@destroy');
Route::post('/posts', 'PostsController@store')->name('posts.store');
Route::patch('/posts', 'PostsController@store')->name('posts.store');
Route::get('/posts/tags/{tag}', 'TagsController@index');

Route::get('/search','SearchController@show')->name('search.posts');

Route::post('/dashboard/uploads', 'UploadsController@store')->name('uploads.store');

Route::get('/dashboard/{slug}', 'DashboardController@show');

Route::post('/comments/{slug}', 'CommentsController@store')->name('comments.store');

Route::get('{slug}', 'PagesController@show')->name('page.show');
