


Queries

Get a list of tags with posts associated with them.
App\Tag::has('posts')->pluck('name');

Get a list of tags associated with a post

$post->tags->pluck('name')



export XDEBUG_CONFIG="idekey=VSCODE"

$re = '/\{\{\s*lang=(\s*\w*:.*)\}\}/';
$str = 'abc de {{ lang=js:language:rogerpence1 }} asdf

abc de {{ lang=js:language:rogerpence2 }} asdf

abc de {{ lang=js:language:rogerpence3 }} asdf

';

preg_match_all($re, $str, $matches, PREG_SET_ORDER, 0);

// Print the entire match result
var_dump($matches);