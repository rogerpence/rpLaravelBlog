posts
<br>

{{url()->current()}}
<br>
{{Request::path()}}
<br>
{{Request::segment(2)}}
<br>
{{ \App\Classes\MyHelpers::pathActive(Request::path(), 'dashboard/posts') }}
<br>
@isCurrent('dashboard/posts')

