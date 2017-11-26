    @foreach ($posts as $post)            
        <div class="post">

            <a class="headline" href="/posts/{{ $post->slug }}"><h3>{{ $post->title }}</h3></a>
            @isset($post->subtitle)
                <h4>{{$post->subtitle}}</h4>
            @endisset

            <div class="post-date-line">
                @if ($post->status==0)
                    <span style="display:inline;" class="badge badge-warning">Draft</span>
                @endif            

                <span class="small">{{substr($post->date_to_publish,0,10)}} by rp</span>
            </div>

            <div>
                {!! $post->abstract_html !!}
            </div>

            <div>            
                @auth
                    <a title="Edit post" href="/posts/{{ $post->id }}/edit" ><i class="fa fa-pencil"></i></a>&nbsp;
                @endauth          
                <a class="small xbtn xbtn-primary xbtn-tiny" href="/posts/{{ $post->slug }}" role="xbutton">Read post</a>&nbsp;
                @if (count($post->tags))
                    @foreach ($post->tags as $tag)
                        <span class="tag">
                            <a href="/posts/tags/{{$tag->name}}">
                                {{$tag->name}} 
                            </a>                        
                        </span>
                    @endforeach
                @endif 
            </div>

            <hr>
        </div>   
    @endforeach
