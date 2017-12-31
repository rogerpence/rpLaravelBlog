<h4>Image library</h4>

<a href="#" id="show-upload-window" class="btn btn-primary btn-sm">Upload file</a>
<br>
<a href="#" id="test-button" style="display:none;">Test</a>
<br>

<div>
    <table id="datatable" class="table table-sm table-striped">
        <thead class="thead-dark">
            <th>Name</th>
            <th>Description</th>
            <th>Updated</th>
            <th>Action</th>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>

<div id="upload-container" style="display:none;z-index:100000">
    <h3 id="upload-file-panel-title">Upload a file</h3>
    <div id="upload-message"></div>
    <form method="POST" action="/dashboard/uploads" enctype="multipart/form-data">
        {{ csrf_field() }}

        <input type="hidden" class="form-control" id="image-id" name="image-id">
        <input type="hidden" class="form-control" id="image-name" name="image-name">

        <div class="form-group">
            <label for="file-upload"></label>
            <input type="file" class="form-control-file" id="file-upload" name="file-upload">
        </div>

        <div class="form-group">        
            <label id="file-upload-target-name">File will uploaded as:</label>
            <span id="image-name-display">image name</span>
            <!-- <input type="text" class="form-control" id="image-name" name="image-name" aria-describedby="image-name-help" placeholder="Enter image name"> -->
        </div>

        <div class="form-group">
            <label for="image-description">Image description</label>
            <input type="text" class="form-control" id="image-description" name="image-description" aria-describedby="image-name-help" placeholder="Enter image description">
        </div>

        <button id="submit-button" disabled type="submit" class="btn btn-success">Upload</button>
        <button id="cancel-button" type="button" class="btn btn-danger">Cancel</button>
    </form>
</div>

<div id="view-image-container" style="display:none;">
    <h4>Image Preview</h4>
    <div>
        <small id="image-preview-url-text"></small>
    </div>    
    <br>
    <img id="image-preview-url" src="/storage/images/desktopfile.2458116.84842.png"></img>
    <br>
    <small id="image-preview-size"></small>
</div>

   @section('main.body-at-bottom')
   <script src="{{ asset('assets/js/vendor/tingle.js') }}"></script>           
   <script src="{{ asset('assets/js/rp.lib.js') }}"></script>  
   <script src="{{ asset('assets/js/view-image-modal.js') }}"></script>  
   <script src="{{ asset('assets/js/edit-image-modal.js') }}"></script>  
   <script src="{{ asset('assets/js/uploads.blade.php.js') }}"></script>  
   <script src="{{ asset('assets/js/show-new.blade.php.js')}}"></script>
   <script src="{{ asset('assets/js/vendor/notifier.min.js')}}"></script>
   <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.16/datatables.min.js"></script>       
   @endsection