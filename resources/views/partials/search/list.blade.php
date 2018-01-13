    <h5>Searched for: {{$view['search']}}</h5>
    
    @if($posts->isEmpty())
    No posts found.
    @else

    @foreach ($posts as $post)            
        <div class="post">

            <a class="headline" href="/posts/{{ $post->slug }}?s={{$view['search']}}"><h3>{{ $post->title }}</h3></a>

            <div class="post-date-line">
                @auth
                    <a title="Edit post" style="display:inline;" href="/posts/{{ $post->id }}/edit" ><i class="fa fa-pencil"></i></a>&nbsp;
                @endauth          

                @switch($post->status)
                    @case(0)
                        <span style="display:inline;" class="badge badge-warning">Draft</span>
                        @break

                    @case(2)
                        <span style="display:inline;" class="badge badge-success">Page</span>
                        @break

                    @case(3)
                        <span style="display:inline;" class="badge badge-danger">Private</span>
                        @break
                @endswitch                
            

                <span class="small">{{substr($post->date_to_publish,0,10)}} by rp</span>
            </div>

            <div>
                {!! $post->abstract_html !!}
            </div>
            <hr>
        </div>   
    @endforeach

    @endif
