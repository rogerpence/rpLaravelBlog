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
    <form method="POST" action="/posts">
        {{ csrf_field() }}
        <div class="row">
            <div class="col-8">
                @if ($errors->any())
                <div class="form-group">
                    <div class="card">
                        <div class="card-body">
                            <h4>Input errors</h4>
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                @endif

                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>

                <div class="form-group">
                    <label for="title">Title</label>
                    <a data-toggle="popover" title="Title" data-trigger="hover" data-content="For best search results this needs to be as close to 70 characters as possible."
                        href="">
                        &nbsp;
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <small class="text-danger">{{ $errors->first('title') }}</small>

                    <input maxlength="70" type="text" class="form-control" id="title" titledby="titleHelp" name="title" placeholder="Post title"
                        value="{{old('title')}}">
                </div>

                <div class="form-group" id="abstract-container">
                    <label for="abstract">Abstract</label>
                    <small class="text-danger">{{ $errors->first('abstract') }}</small>

                    <textarea name="abstract" id="abstract">{{old('abstract')}}</textarea>
                </div>

                <div class="form-group">
                    <label for="seo-description">SEO description</label>
                    <a data-toggle="popover" title="SEO Description" data-trigger="hover" data-content="For best search results this needs to be as close to 160 characters as possible."
                        href="">
                        &nbsp;
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <small class="text-danger">{{ $errors->first('seo_description') }}</small>

                    <textarea class="form-control" id="seo_description" titledby="titleHelp" name="seo_description" placeholder="SEO description">{{old('seo_description')}}</textarea>
                </div>

                <div class="form-group">
                    <label for="body">Body</label>
                    <small class="text-danger">{{ $errors->first('body') }}</small>
                    <textarea name="body" id="body">{{old('body')}}</textarea>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </div>

            <div class="col">
                <div class="form-group">
                    <div class="dropdown">
                        <select name="status" id="status">
                            <option value="0">Draft</option>
                            <option value="1">Published</option>
                        </select>
                    </div>
                </div>
            </div>

        </div> <!-- End class="row" -->
    </form>
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