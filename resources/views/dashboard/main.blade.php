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
            @if (!empty($view) )
                @switch($view['action'])
                    @case('posts') 
                        @include('dashboard.posts')
                        @break
                    @case('comments')                        
                        @include('dashboard.comments')
                        @break                        
                @endswitch                                     
            @endif
        </div>
    </div>
</div>





@endsection
