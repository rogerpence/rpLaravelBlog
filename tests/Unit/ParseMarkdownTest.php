<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Classes\PostsRepository;

class ParseMarkdownTest extends TestCase
{
    public function testParse()
    {
        $repo = new PostsRepository();

        $parse_down = new \ParsedownExtra();
     
        // Read markdown file into memory.
        $md = file_get_contents('/home/roger/Projects/php/blog/tests/Unit/markdown.md');

        // Convert to HTML.
        $html = $parse_down->text($md);

        // Write HTML to a file.
        file_put_contents('/home/roger/Projects/php/blog/tests/Unit/result.html', $html);

        $this->assertTrue(true);
    }
}
