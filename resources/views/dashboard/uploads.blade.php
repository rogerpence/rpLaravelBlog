<a href="#" id="show-upload-window">Upload file</a>
<br>
<a href="#" id="test-button">Test</a>
<br>

<div>
    <table id="datatable" class="table table-sm table-striped">
        <thead class="thead-dark">
            <th>Name</th>
            <th>Description</th>
            <th>Created</th>
            <th>Action</th>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>

<div id="upload-container" style="display:none;">
    <h3>Upload a file</h3>
    <form method="POST" action="/dashboard/uploads" enctype="multipart/form-data">
        {{ csrf_field() }}

        <div class="form-group">
            <label for="file-upload">Select file</label>
            <input type="file" class="form-control-file" id="file-upload" name="file-upload">
        </div>

        <div class="form-group">        
            <label id="file-upload-target-name" for="image-name">File will uploaded as:</label>
            <input type="text" class="form-control" id="image-name" name="image-name" aria-describedby="image-name-help" placeholder="Enter image name">
        </div>

        <div class="form-group">
            <label for="image-description">Image description</label>
            <input type="text" class="form-control" id="image-description" name="image-description" aria-describedby="image-name-help" placeholder="Enter image description">
        </div>

        <button id="submit-button" disabled type="submit" class="btn btn-success">Upload</button>
        <button id="cancel-button" type="button" class="btn btn-danger">Cancel</button>
    </form>
</div>


   @section('main.body-at-bottom')
   <script src="{{ asset('assets/js/vendor/tingle.js') }}"></script>           
   <script src="{{ asset('assets/js/uploads.blade.php.js') }}"></script>  
   <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.16/datatables.min.js"></script>       
   @endsection