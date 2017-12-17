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
    protected $description = 'Save or restore Posts table
    Copy Posts table to backup Posts table:
        blog:copy-table save
    
    Restore Posts from backup Posts table:
        blog:copy-table restore    
    ';

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
            $this->copyFromPostsTable();
        }
        elseif ($table == 'postback') {
            $this->info('Copying \'postback\' table to \'post\' table.');
            $this->copyToPostsTable();
        }
        else {            
            $this->error('action argument must be \'save\' or \'restore\'.');
            return;
        }
    }
    private function copyFromPostsTable() {
        // Clear PostBack model's table.
        \DB::statement("SET foreign_key_checks=0");
        \App\PostBack::truncate();            
        \DB::statement("SET foreign_key_checks=1");

        // Get all posts with tags. 
        $posts = \App\Post::with('tags')->get();   

        $bar = $this->output->createProgressBar(count($posts));

        foreach ($posts as $post) {
            $postback = new \App\PostBack();
            $this->copyPostsBuffer($post, $postback);

            $tagstext = [];
            foreach ($post->tags as $tag) {
                $tagstext[] = $tag['name'];
            }

            if (count($tagstext) > 0 ) {
                $postback->seo_keywords = implode($tagstext, ',');
            }                

            $postback->save();

            $bar->advance();
        }                   
        
        $bar->finish();
        // $headers = ['Title', 'Slug'];
        // $postbacks = \App\PostBack::all(['title', 'slug'])->toArray();
        // $this->table($headers, $postbacks);         
    }    

    private function copyPostsBuffer($from, $to) {
        $to->title = $from->title;
        $to->subtitle = $from->subtitle;
        $to->slug = $from->slug;
        $to->body_html = $from->body_html;
        $to->body_markdown = $from->body_markdown;
        $to->repo_url = $from->repo_url;
        $to->source_url = $from->source_url;        
        $to->abstract = $from->abstract;
        $to->abstract_html = $from->abstract_html;
        $to->seo_description = $from->seo_description;
        $to->javascript = $from->javascript;
        $to->seo_keywords = $from->seo_keywords;
        $to->status = $from->status;
        $to->date_to_publish = $from->date_to_publish;        
    }

    private function copyToPostsTable() {
        // \App\PostTag::truncate();            
        $postbacks = \App\PostBack::all();
        $bar = $this->output->createProgressBar(count($postbacks));

        foreach ($postbacks as $postback) {
            $post = new \App\Post();
            $this->copyPostsBuffer($postback, $post);
            $tag_list = $post->seo_keywords;
            $post->seo_keywords = '';
            $post->save();

            if (strlen($tag_list) > 0) {
                $tagstext = explode(",", $tag_list);
                $this->addTag($post->id, $tagstext);
            }                

            $bar->advance();
        }
        
        $bar->finish();        
    }        

    private function addTag($post_id, $tags) {
        foreach ($tags as $tag_name) {
            $tag_id = \App\Tag::where('name', $tag_name)->pluck('id')->first();
            // Add tags as needed.
            if (!isset($tag_id)) {
                $new_tag = \App\Tag::create([
                                'name' => $tag_name
                            ]);                
                $tag_id = $new_tag->id;                            
            }


            $posttag = new \App\PostTag();
            $posttag->tag_id = $tag_id;
            $posttag->post_id = $post_id;
            $posttag->save();   
        }                
    }           
}