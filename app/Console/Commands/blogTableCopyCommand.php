<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class blogTableCopyCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'blog:copy-table {action}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Copy a table';

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
        $action = $this->argument('action');
        if ($action == 'save') {
            $table = 'post';
        }
        else {
            $table = 'postback';
        }

        if ($table == 'post') {
            $this->info('Copying \'post\' table to \'postback\' table.');
            $this->copyPostsTable();
        }
        elseif ($table == 'postback') {
            $this->info('Copying \'postback\' table to \'post\' table.');
            $this->copyPostsBackTable();
        }
        else {            
            $this->error('action argument must be \'save\' or \'restore\'.');
            return;
        }
    }

    private function copyPostsTable() {
        // Clear PostBack model's table.
        \DB::statement("SET foreign_key_checks=0");
        \App\PostBack::truncate();            
        \DB::statement("SET foreign_key_checks=1");

        // Copy all from Post to PostBack
        $posts = \App\Post::all();
        $bar = $this->output->createProgressBar(count($posts));

        foreach ($posts as $post) {
            if (substr($post->title,0,2) == '**') {
                $postback = new \App\PostBack();
                $postback->title = $post->title;
                $postback->subtitle = $post->subtitle;
                $postback->slug = $post->slug;
                $postback->body_html = $post->body_html;
                $postback->body_markdown = $post->body_markdown;
                $postback->abstract = $post->abstract;
                $postback->abstract_html = $post->abstract_html;
                $postback->seo_description = $post->seo_description;
                $postback->seo_keywords = $post->seo_keywords;
                $postback->status = $post->status;
                $postback->date_to_publish = $post->date_to_publish;
                $postback->save(); 
            }                

            $bar->advance();
        }                   

        $headers = ['Title', 'Slug'];
        $postbacks = \App\PostBack::all(['title', 'slug'])->toArray();
        $this->table($headers, $postbacks);         
    }    

    private function copyPostsBackTable() {

        // Copy all from Post to PostBack
        $postbacks = \App\PostBack::all();
        $bar = $this->output->createProgressBar(count($postbacks));

        foreach ($postbacks as $postback) {
            $post = new \App\Post();
            $post->title = $postback->title;
            $post->subtitle = $postback->subtitle;
            $post->slug = $postback->slug;
            $post->body_html = $postback->body_html;
            $post->body_markdown = $postback->body_markdown;
            $post->abstract = $postback->abstract;
            $post->abstract_html = $postback->abstract_html;
            $post->seo_description = $postback->seo_description;
            $post->seo_keywords = $postback->seo_keywords;
            $post->status = $postback->status;
            $post->date_to_publish = $postback->date_to_publish;
            $post->save(); 

            $bar->advance();
        }                   
    }    
    
}