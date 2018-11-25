<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Classes\Repository;
use App\Classes\ConsumeTrait;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $this->assertTrue(true);
    }

    public function testTrait()
    {
        $o = new ConsumeTrait;

        $x = $o->sum(4,5);
        $this->assertEquals($x, 9);
    }
}
