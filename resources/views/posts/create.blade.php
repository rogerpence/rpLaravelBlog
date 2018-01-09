@extends('masters.no-columns')

@section('main.head')
   <!-- CSS or other HTML at end of head tag. -->
   <link rel="stylesheet" href="{{ asset('assets/css/simplemde.min.css') }}">
   <!-- <link rel="stylesheet" href="{{ asset('assets/js/vendor/jquery-ui.min.css') }}"> -->
   <!-- <link rel="stylesheet" href="{{ asset('assets/js/vendor/jquery-ui.theme.min.css') }}"> -->
   <link rel="stylesheet" href="{{ asset('assets/js/vendor/tingle.css') }}">
   
   <link rel="stylesheet" href="{{ asset('assets/js/vendor/flatpickr.css') }}">
   <link rel="stylesheet" href="{{ asset('assets/css/tagchief.css') }}">
   <link rel="stylesheet" href="{{ asset('assets/js/vendor/notifier.min.css') }}">

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
    <form id="post-content-form" method="{{ $view['action'] }}" action="{{ $view['url'] }}">
        @if (isset($view['spoof_action']))
            <input type="hidden" name="_method" value="{{ $view['spoof_action'] }}"> 
        @endif

        @if (isset($post->id))
            <input type="hidden" id="postid" name="postid" value="{{ $post->id }}"> 
        @endif

        {{ csrf_field() }}

        <div class="row">
            <div class="col-8">
                
                @include('partials.error-list')

                <div class="form-group">
                    <div class="form-row">
                        <div class="col col-sm-2">
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-sm bypass-dirty" title="Save post (Ctrl+S)">Save</button>
                            </div>                                
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="title"><strong>Title and Slug</strong></label>
                    <a data-toggle="popover" title="Title" data-trigger="hover" data-content="Blog title (~70 characters) and its slug (below)."
                        href="#" onclick="return false;">
                        &nbsp;
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <small class="text-danger">{{ $errors->first('title') }}</small>

                    <input maxlength="70" type="text" class="form-control save" id="title" titledby="titleHelp" name="title" placeholder="Post title"
                        value="{{old('title', $post->title)}}">

                    <small class="text-danger">{{ $errors->first('slug') }}</small>
                    <input maxlength="70" type="text" class="form-control save" id="slug" titledby="titleHelp" name="slug" placeholder="Post slug"
                        value="{{old('slug', $post->slug)}}">
                </div>

                <div class="form-group">
                    <label for="subtitle"><strong>Subtitle</strong></label>
                    <a data-toggle="popover" title="Title" data-trigger="hover" data-content="Optional post subtitle."
                        href="#" onclick="return false;">
                        &nbsp;
                        <i class="fa fa-info-circle"></i>
                    </a>

                    <input type="text" class="form-control save" id="subtitle" titledby="titleHelp" name="subtitle" placeholder="Post subtitle"
                        value="{{old('subtitle', $post->subtitle)}}">
                </div>
                
                <!-- <div class="form-group"> -->
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="date-to-publish"><strong>Publication date</strong></label>
                        <a data-toggle="popover" title="Publication date" data-trigger="hover" data-content="Optional post date-to-publish."
                            href="#" onclick="return false;">
                            &nbsp;
                            <i class="fa fa-info-circle"></i>                        
                        </a>
                        <input type="text" class="form-control save" id="date-to-publish" titledby="titleHelp" name="date-to-publish" placeholder="Publication date"
                            value="{{old('date_to_publish', $post->date_to_publish)}}">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="status"><strong>Post status</strong></label>
                        <a data-toggle="popover" title="Post status" data-trigger="hover" data-content="Automatically set to 'publish' on Publication Date."
                            href="#" onclick="return false;">
                            &nbsp;
                            <i class="fa fa-info-circle"></i>                        
                        </a>
                        <select class="form-control save" name="status" id="status" class="mb-select">
                            <option class="option-element" value="0" {!! $post->status == 0 ? 'selected="selected"' : ''!!}>Draft</option>
                            <option class="option-element" value="1" {!! $post->status == 1 ? 'selected="selected"' : ''!!}>Published</option>
                            <option class="option-element" value="2" {!! $post->status == 2 ? 'selected="selected"' : ''!!}>Page</option>
                            <option class="option-element" value="3" {!! $post->status == 3 ? 'selected="selected"' : ''!!}>Private</option>
                        </select>
                    </div>
                </div>                    

                <div class="form-group">
                    <label for="tags"><strong>Tags</strong></label>
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
                        <input id="tag-text-input" class="form-control tag-input save" type="text" list="all-tags"></input>
                        <datalist id="all-tags">
                        </datalist>  

                        <br>
                        <input name="tag-list-for-server" class="save" id="tag-list-for-server" type="hidden"  
                               value="{{old('tag-list-for-server', $view['taglist'])}}"></input>
                    </div>                    
                </div>

                <div class="form-group" id="abstract-container">
                    <label for="abstract"><strong>Abstract</strong></label>
                    <small class="text-danger">{{ $errors->first('abstract') }}</small>

                    <textarea data-md="simplemdeAbstract" class="save" name="abstract" id="abstract">{{old('abstract', $post->abstract)}}</textarea>
                </div>

                <div class="form-group">
                    <label for="seo-description"><strong>SEO description</strong></label>
                    <a data-toggle="popover" title="SEO Description" data-trigger="hover" 
                       data-content="For best search results this needs to be as close to its maximum length as possible."
                        href="#" onclick="return false;">
                        &nbsp;
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <small class="text-danger">{{ $errors->first('seo_description', $post->seo_description) }}</small>
                    <textarea class="form-control save" id="seo_description" titledby="titleHelp" name="seo_description" 
                              placeholder="SEO description">{{old('seo_description', $post->seo_description)}}</textarea>
                </div>

                <div class="form-group">
                    <label for="body"><strong>Body</strong></label>
                    <small class="text-danger">{{ $errors->first('body') }}</small>
                    <textarea data-md="simplemdeBody" class="save" name="body" id="body">{{old('body', $post->body_markdown)}}</textarea>
                </div>

                <div class="form-group">
                    <label for="javascript"><strong>JavaScript</strong></label>
                    <a data-toggle="popover" title="Title" data-trigger="hover" data-content="Custom JavaScript for this page."
                        href="#" onclick="return false;">
                        &nbsp;
                        <i class="fa fa-info-circle"></i>
                    </a>

                    <input type="text" class="form-control save" id="javascript" titledby="titleHelp" name="javascript" placeholder="JavaScript"
                        value="{{old('javascript', $post->javascript)}}">
                </div>
                

                <hr>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-sm bypass-dirty" title="Save post (Ctrl+S)">Save</button>

                    @if( $view['mode'] == 'edit')
                        <a id="delete-post" class="btn btn-danger pull-right btn-sm" href="#" role="button">Delete post</a>
                    @endif                    
                </div>
            </div>

            <div class="col">
            </div>

        </div> <!-- End class="row" -->

        <br>
        
    </form>
</div>

@include('partials.modal-image-upload-window')
@include('partials.post-help-panel')

@endsection 

@section('main.body-at-bottom')
    <script>
        var tags_list = "{!!$view['taglist']!!}";
    </script>
    <script src="{{ asset('assets/js/simplemde.min.js') }}"></script>
    
    <!-- <script src="{{ asset('assets/js/vendor/jquery.js') }}"></script>     -->
    <!-- <script src="{{ asset('assets/js/vendor/jquery-ui.min.js') }}"></script> -->   
   <script src="{{ asset('assets/js/vendor/notifier.min.js')}}"></script>
    
    <script src="{{ asset('assets/js/sha256.js') }}"></script>            
    <script src="{{ asset('assets/js/vendor/tingle.js') }}"></script>        
    <script src="{{ asset('assets/js/tagchief.js') }}"></script>    
    <script src="{{ asset('assets/js/tagchiefdatalist.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/flatpickr.js') }}"></script>    
    <script src="{{ asset('assets/js/rp.lib.js') }}"></script>  
    <script src="{{ asset('assets/js/edit-image-modal.ajax.js') }}"></script>      
    <script src="{{ asset('assets/js/create.blade.php.js') }}"></script>      
    
@endsection