<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Classes\EnvFile;

class refreshGitInfoCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'blog:refresh-git-info';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Refresh Git commit info';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $file = '/.env';
        $ref = new EnvFile($file);
        $hash = substr(exec('git show -s --format="%h %ci"'), 0, 18);
        $ref->addOrChangeKey('GIT_HASH', $hash);
        $ref->save();

        $this->info('Git commit info refreshed.');        
    }
}
