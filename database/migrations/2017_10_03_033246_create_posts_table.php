<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('author_id')->unsigned()->default(0);
            $table->string('title', 500)->unique();
            $table->string('subtitle', 200)->nullable();
            $table->string('slug',200)->unique();
            $table->string('abstract',800);
            $table->string('abstract_html',800)->nullable();
            $table->string('source_url',200)->nullable();
            $table->string('repo_url',200)->nullable();
            $table->string('seo_description', 500);
            $table->string('seo_keywords',200);    
            $table->string('javascript', 500)->nullable();        
            $table->text('body_html');
            $table->text('body_markdown');
            $table->integer('status');
            $table->dateTime('date_to_publish');
            $table->timestamps();
        });    
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
