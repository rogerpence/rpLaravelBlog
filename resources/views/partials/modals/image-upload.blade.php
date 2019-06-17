<div id="upload-container" style="display:none;z-index:100000">
    <h3 id="upload-file-panel-title">Upload a file</h3>
    <div id="upload-message"></div>
    <form method="POST" id="form-upload-image" action="/dashboard/uploads" enctype="multipart/form-data">
        {{ csrf_field() }}

        <input type="hidden" class="form-control" id="image-id" name="image-id">
        <input type="hidden" class="form-control" id="image-name" name="image-name">

        <div class="form-group">
            <label for="file-upload" class="btn btn-primary">
                <input type="file" class="form-control-file" id="file-upload" name="file-upload" hidden>
                Select file...
            </label>
        </div>

        <div class="form-group">        
            <label id="file-upload-target-name">File will uploaded as:</label>
            <span id="image-name-display">image name</span>
            <!-- <input type="text" class="form-control" id="image-name" name="image-name" aria-describedby="image-name-help" placeholder="Enter image name"> -->
        </div>

        <div class="form-group">        
            <label id="file-upload-target-name">File markdown URL will be:</label>
            <span id="image-name-markdown-url"></span>
            <!-- <input type="text" class="form-control" id="image-name" name="image-name" aria-describedby="image-name-help" placeholder="Enter image name"> -->
        </div>


        <div class="form-group">
            <img src="" id="image-preview"/>
            <div><small id="image-size"></small></div>
        </div>

        <div class="form-group">
            <label for="image-description">Image description</label>
            <input type="text" class="form-control" id="image-description" name="image-description" aria-describedby="image-name-help" placeholder="Enter image description">
        </div>


        <button id="submit-button" disabled type="submit" class="btn btn-success">Upload</button>
        <button id="cancel-button" type="button" class="btn btn-danger">Cancel</button>
    </form>
</div>
