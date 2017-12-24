comments
<br>

{{ \App\Classes\MyHelpers::pathActive(url()->current(), 'dashboard/posts') }}
<br>
@isCurrent('dashboard/posts')

{{--
<table>
    <thead>
        <tr>
            <th>Date posted</th>
            <th>From</th>
            <th>Comment</th>
            <th>Approved</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($comments as $comment)            
        <tr>
            <td>{{$comment->created_at}}</td>
            <td>{{$comment->from}}</td>
            <td>{{ str_limit($comment->text, $limit = 32, $end = '...') }}</td>
            <td>{{$comment->approved}}</td>
        </tr>    
        @endforEach
    </tbody>
</table>
--}}