


Queries

Get a list of tags with posts associated with them.
App\Tag::has('posts')->pluck('name');

Get a list of tags associated with a post

$post->tags->pluck('name')



export XDEBUG_CONFIG="idekey=VSCODE"