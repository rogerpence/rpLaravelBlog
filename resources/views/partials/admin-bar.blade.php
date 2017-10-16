<div>
    <ul class="nav" style="background-color: gray; color: white;">
        <li class="nav-item" >
            <a title="Home" class="nav-link" href="/"><i class="fa fa-home admin-icon"></i></a>
        </li>
        <li class="nav-item">
            <a title="Dashboard" class="nav-link" href="{{ route('dashboard.show') }}"><i class="fa fa-tachometer admin-icon"></i></a>
        </li>
        <li class="nav-item">
            <a title="New post" class="nav-link" href="/posts/create"><i class="fa fa-plus-circle admin-icon"></i></a>
        </li>
        @if ( ! empty($slug) ) 
        <li class="nav-item">
            <a title="Edit post" class="nav-link" href="{{ route('posts.edit', [$post_id]) }}" ><i class="fa fa-pencil admin-icon"></i></a>
        </li>        
        @else
        <li class="nav-item">
            <a title="Edit post" class="nav-link" disabled><i class="fa fa-pencil admin-icon"></i></a>
        </li>                
        @endif
    </ul>
</div>
