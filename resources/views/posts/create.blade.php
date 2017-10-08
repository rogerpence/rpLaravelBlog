@extends('masters.no-columns')

@section('main.head')
   <!-- CSS or other HTML at end of head tag. -->
   <link rel="stylesheet" href="{{ asset('assets/css/simplemde.min.css') }}">
   <style>
    #abstract-container .CodeMirror, #abstract-container  .CodeMirror-scroll 
    {
        min-height: 80px;
    }      
   </style>
      
@endsection 

@section('content')

<div class="container">
    <div class="row">
        <div class="col-1">           
        </div>
        <div class="col-8">
            <form method="POST" action="/posts">
                {{ csrf_field() }}

                <div class="form-group">
                    <label for="title">Title</label>
                    <a data-toggle="popover" title="Title" data-trigger="hover" 
                        data-content="For best search results this needs to be as close to 70 characters as possible." href="">&nbsp;<i class="fa fa-info-circle"></i></a>

                    <input maxlength="70" type="text" class="form-control" id="title" Post titledby="titleHelp" name="title" placeholder="Post title">
                    <!-- <small id="titleHelp" class="form-text text-muted">Not to exceed 70 characters</small> -->
                </div>

                <div class="form-group" id="abstract-container">
                    <label for="abstract">Abstract</label>
                    <textarea name="abstract" id="abstract"></textarea>
                </div>

                <div class="form-group">
                    <label for="seo-description">SEO description</label>
                    <a data-toggle="popover" title="SEO Description" data-trigger="hover" 
                        data-content="For best search results this needs to be as close to 160 characters as possible." href="">&nbsp;<i class="fa fa-info-circle"></i></a>                                    
                    <!-- <input maxlength="160" type="text" class="form-control" id="seo-description" Post titledby="titleHelp" name="title" placeholder="SEO description"> -->
                    <textarea class="form-control" id="seo-description" Post titledby="titleHelp" name="seo-description" placeholder="SEO description"></textarea>
                    <small id="titleHelp" class="form-text text-muted">Not to exceed 160 characters. Characters entered: <span id="chars-entered">0</span></small>
                </div>

                <div class="form-group">
                    <label for="body_markdown">Body</label>
                    <textarea name="body_markdown" id="body_markdown"></textarea>
                </div>

                <br>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>        
        </div>
        <div class="col">
        </div>
    </div>
</div>

@endsection 

@section('main.body-at-bottom')
    <script src="{{ asset('assets/js/simplemde.min.js') }}"></script>
    <script src="{{ asset('assets/js/create.blade.php.js') }}"></script>   

    <script>
        let afterDocumentLoaded = () => {
            const MAX_SEO_TITLE_LENGTH = 70;
            const MAX_SEO_DESC_LENGTH = 160;

            new rp.core.TypingTracker('title', MAX_SEO_TITLE_LENGTH)	
            new rp.core.TypingTracker('seo-description', MAX_SEO_DESC_LENGTH)

            $('[data-toggle="popover"]').popover()
        };

        rp.core.documentReady(afterDocumentLoaded);
    </script>

@endsection