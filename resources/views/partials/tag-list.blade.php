        <div class="active-tag-list">
        <h4>Tags</h4>
            <div class="tags-container">                        
                @foreach ($activeTags as $activeTag) 
                    <a class="pseudo-list" style="color: black;" href="/posts/tags/{{ $activeTag }}">{{ $activeTag }}</a> 
                    @if($activeTag != end($activeTags))
                        <i class="fa fa-circle"style="font-size:40%;margin-top:10px;margin-left:5px;margin-right:5px;"></i>
                    @endif
                @endforeach        
            </div>
        </div>
