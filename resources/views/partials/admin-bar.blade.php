<div class="navbar navbar-light bg-dark fixed-top">
    <ul class="nav">
        <li class="nav-item" >
            <a title="Home" class="nav-link" href="/"><i class="fa fa-home admin-icon"></i></a>
        </li>
        <li class="nav-item">
            <a title="Dashboard" class="nav-link" href="/dashboard/home"><i class="fa fa-tachometer admin-icon"></i></a>
        </li>
        <li class="nav-item">
            <a title="New post" class="nav-link" href="/posts/create"><i class="fa fa-plus-circle admin-icon"></i></a>
        </li>
        @if (isset($view) && ($view['mode'] == 'edit' || $view['mode'] == 'create'))
        <li>
        <li>   
            <button id="instant-save-button" 
                    class="btn btn-primary btn-sm admin-bar-button bypass-dirty save-button disabled-color" 
                    type="button" disabled>
                        Save
            </button>
        </li>
        <li>   
            <button id="alias-save-button" 
                    class="btn btn-primary btn-sm admin-bar-button bypass-dirty save-button disabled-color" 
                    onclick="document.getElementById('post-content-form').submit();"
                    type="button" disabled>
                        Save and exit
            </button>
        </li>
        <li>   
            <button id="admin-bar-upload-image" 
                    class="btn btn-primary btn-sm  admin-bar-button" 
                    type="button">
                        Upload image
            </button>
        </li>
        @endif
        {{--
        @if ( ! empty($slug) ) 
        --}}

        @if (isset($post_id))
        <li class="nav-item">
            <a title="Edit post" class="nav-link" href="{{ route('posts.edit', [$post_id]) }}" ><i class="fa fa-pencil admin-icon"></i></a>
        </li>        
        @endif 

        {{--
        @else
        <li class="nav-item">
            <a title="Edit post" class="nav-link" disabled><i class="fa fa-pencil admin-icon"></i></a>
        </li>                
        @endif
        --}}
    </ul>
{{--
    <ul class="nav ml-auto">
        <li class="nav-item">
            <a title="Logout" style="color:white" class="nav-link" href="{{ route('logout') }}" 
               onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                <i class="fa fa-sign-out"></i>
            </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                {{ csrf_field() }}
            </form>
        </li>                      
    </ul>
--}}    
</div>
