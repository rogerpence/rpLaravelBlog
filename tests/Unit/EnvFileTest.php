<?php
namespace Tests\Unit;

use Tests\TestCase;
//use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Classes\EnvFile;

class EnvFileTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     * 
     * To debug with PhpUnit 
     *   - add this environment variable
     *          XDEBUG_CONFIG="idekey=VSCODE"
     *   - set a breakpoint(s)
     *   - set debugger to 'wait for xdebug'
     *   - run unit tests 
     */
    public function testReadEnvFile()
    {
        $name = env('APP_NAME', 'LaravelWaylon');

        $file ='/.env';        
        $ref = new EnvFile($file);
        $this->assertNotNull($ref);
        $hash = substr(exec('git show -s --format="%h %ci"'), 0, 18);
        $ref->addOrChangeKey('GIT_HASH', $hash);
        $ref->save();
    }
}
