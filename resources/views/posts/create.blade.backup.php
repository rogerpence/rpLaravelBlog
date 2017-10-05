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

                <div id="accordion" role="tablist">
                    <div class="card">
                        <div class="card-header" role="tab" id="headingOne">
                            <h5 class="mb-0">
                                <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Document info
                                </a>
                            </h5>
                        </div>

                        <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" role="tab" id="headingTwo">
                            <h5 class="mb-0">
                                <a class="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Document body
                                </a>
                            </h5>
                        </div>
                        <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div class="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" Post titledby="titleHelp" name="title" placeholder="Post title">
                    <small id="titleHelp" class="form-text text-muted">Not to exceed 62 characters</small>
                </div>

                <div class="form-group" id="abstract-container">
                    <label for="abstract">Abstract</label>
                    <textarea name="abstract" id="abstract"></textarea>
                </div>

                <div class="form-group">
                    <label for="body_markdown">Body</label>
                    <textarea name="body_markdown" id="body_markdown"></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>        
        </div>
        <div class="col">
        </div>
    </div>
</div>

@endsection 

@section('main.body-at-bottom')
    <!-- JavaScript or other HTML just before closing body tag. -->
    <script src="{{ asset('assets/js/simplemde.min.js') }}"></script>
    <script src="{{ asset('assets/js/post.blade.php.js') }}"></script>   
    
@endsection