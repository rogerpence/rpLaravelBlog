<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('tags', function () {
//    $tags = \App\Tag::orderBy('name')->pluck('name');
    $find = 'l';
    //$tags = \App\Tag::orderBy('name')->where('name', 'like', $find . '%')->pluck('name');
    $tags = \App\Tag::orderBy('name')->where('name', '>=', $find)->pluck('name');
    return $tags;
});

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
