@extends('masters.no-columns')

@section('main.head')
   <!-- CSS or other HTML at end of head tag. -->
   <link rel="stylesheet" href="{{ asset('assets/css/simplemde.min.css') }}">
   <link rel="stylesheet" href="{{ asset('assets/js/vendor/jquery-ui.min.css') }}">
   <link rel="stylesheet" href="{{ asset('assets/js/vendor/jquery-ui.theme.min.css') }}">
   <link rel="stylesheet" href="{{ asset('assets/css/tagchief.css') }}">
   <style>
    #abstract-container .CodeMirror, #abstract-container  .CodeMirror-scroll 
    {
        min-height: 80px;
    }      
   </style>      
@endsection 

@section('content')
<div class="container">
    <!-- <form method="POST" action="/posts"> -->
    <form method="{{ $view['action'] }}" action="{{ $view['url'] }}">
        @if (isset($view['spoof_action']))
            <input type="hidden" name="_method" value="{{ $view['spoof_action'] }}"> 
        @endif

        @if (isset($post->id))
            <input type="hidden" name="postid" value="{{ $post->id }}"> 
        @endif

        {{ csrf_field() }}

        <div class="row">
            <div class="col-8">
                
                @include('partials.error-list')

                <div class="form-group">
                    <div class="form-row">
                        <div class="col col-sm-2">
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-md">Save</button>
                            </div>                                
                        </div>
                        <div class="col com-sm-2">
                            <div class="form-group">
                                <div class="dropdown">
                                    <select name="status" id="status" class="mb-select">
                                        <option value="0" {!! $post->status == 0 ? 'selected="selected"' : ''!!}>Draft</option>
                                        <option value="1" {!! $post->status == 1 ? 'selected="selected"' : ''!!}>Published</option>
                                    </select>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="title">Title</label>
                    <a data-toggle="popover" title="Title" data-trigger="hover" data-content="For best search results this needs to be as close to 70 characters as possible."
                        href="#" onclick="return false;">
                        &nbsp;
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <small class="text-danger">{{ $errors->first('title') }}</small>

                    <input maxlength="70" type="text" class="form-control" id="title" titledby="titleHelp" name="title" placeholder="Post title"
                        value="{{old('title', $post->title)}}">
                </div>

                <div class="form-group">
                    <label for="subtitle">Subtitle</label>
                    <a data-toggle="popover" title="Title" data-trigger="hover" data-content="Optional post subtitle."
                        href="#" onclick="return false;">
                        &nbsp;
                        <i class="fa fa-info-circle"></i>
                    </a>

                    <input type="text" class="form-control" id="subtitle" titledby="titleHelp" name="subtitle" placeholder="Post subtitle"
                        value="{{old('subtitle', $post->subtitle)}}">
                </div>

                <div class="form-group">
                    <label for="tags">Tags</label>
                    <a data-toggle="popover" title="Tags" data-trigger="hover" data-content="Post tags."
                        href="#" onclick="return false;">
                        &nbsp;
                        <i class="fa fa-info-circle"></i>
                    </a>

                    <div class="tags-container">
                        <!--
                        The input tags are displayed in div.tags-flex-container tag. This div tag
                        must have an input#tag-text-input element in it (or you could specify a different
                        id with TagChief's options. Tags are added to the page with insertAdjacentHTML 
                        preceeding this input tag. 
                        -->
                        <input id="tag-text-input" class="form-control tag-input" type="text"></input>
                        <br>
                        <input name="tag-list-for-server" id="tag-list-for-server" type="hidden"></input>
                    </div>                    

                </div>

                <div class="form-group">
                    <label for="slug">Slug</label>
                    <a data-toggle="popover" slug="Title" data-trigger="hover" data-content="For best search results this needs to be as close to four or five words as possible."
                        href="#" onclick="return false;">
                        &nbsp;
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <small class="text-danger">{{ $errors->first('slug') }}</small>

                    <input maxlength="70" type="text" class="form-control" id="slug" titledby="titleHelp" name="slug" placeholder="Post slug"
                        value="{{old('slug', $post->slug)}}">
                </div>

                <div class="form-group" id="abstract-container">
                    <label for="abstract">Abstract</label>
                    <small class="text-danger">{{ $errors->first('abstract') }}</small>

                    <textarea name="abstract" id="abstract">{{old('abstract', $post->abstract)}}</textarea>
                </div>

                <div class="form-group">
                    <label for="seo-description">SEO description</label>
                    <a data-toggle="popover" title="SEO Description" data-trigger="hover" 
                       data-content="For best search results this needs to be as close to 160 characters as possible."
                        href="#" onclick="return false;">
                        &nbsp;
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <small class="text-danger">{{ $errors->first('seo_description', $post->seo_description) }}</small>
                    <textarea class="form-control" id="seo_description" titledby="titleHelp" name="seo_description" 
                              placeholder="SEO description">{{old('seo_description', $post->seo_description)}}</textarea>
                </div>

                <div class="form-group">
                    <label for="body">Body</label>
                    <small class="text-danger">{{ $errors->first('body') }}</small>
                    <textarea name="body" id="body">{{old('body', $post->body_markdown)}}</textarea>
                </div>

                <hr>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-sm">Save</button>
                </div>
            </div>

            <div class="col">
            </div>

        </div> <!-- End class="row" -->
    </form>
</div>

@endsection 

@section('main.body-at-bottom')
    <script src="{{ asset('assets/js/simplemde.min.js') }}"></script>
    <script src="{{ asset('assets/js/create.blade.php.js') }}"></script>   
    <!-- <script src="{{ asset('assets/js/vendor/jquery.js') }}"></script>     -->
    <script src="{{ asset('assets/js/vendor/jquery-ui.min.js') }}"></script>    
    <script src="{{ asset('assets/js/tagchief.js') }}"></script>    
@endsection