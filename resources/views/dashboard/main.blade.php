@extends('masters.admin')

@section('main.head')
    <title>Admin dashboard</title>
@endsection 

@section('content')


<br>
<div class="container">
    <div class="row">
        <div class="col">
            @include('dashboard.navigation')
        </div>
        <div class="col">
            @include($view->subview)
        </div>
    </div>
</div>





@endsection
