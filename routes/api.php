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

Route::get('tags', function (Request $request) {
//    $tags = \App\Tag::orderBy('name')->pluck('name');

    //if ($request->has('startswith')) {
        $find = $request->input('startswith', '');
    
        //$tags = \App\Tag::orderBy('name')->where('name', 'like', $find . '%')->pluck('name');
        $tags = \App\Tag::orderBy('name')->where('name', '>=', $find)->pluck('name');
    //}        
    //else {

    //}        

    return $tags;
});

Route::get('columns', function (Request $request) {
     $table_name = $request->input('table');
     $columns = DB::select('show columns from ' . $table_name);
    return $columns;
});


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
