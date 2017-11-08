<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DBUtility extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:DBUtility';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Blog DB utility';

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
     * @return mixed
     */
    public function handle()
    {
        // Clear PostBack model's table.
        \DB::statement("SET foreign_key_checks=0");
        \App\PostBack::truncate();            
        \DB::statement("SET foreign_key_checks=1");

        // Copy all from Post to PostBack
        $posts = \App\Post::all();
        foreach ($posts as $post) {
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
            $postback->created_at = $post->created_at;
            $postback->updated_at = $post->updated_at;
            $postback->save(); 
        }            

    }
}
