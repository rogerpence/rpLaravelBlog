<h4>Image library</h4>

<a href="#" id="show-upload-window" class="btn btn-primary btn-sm">Upload file</a>
<br>

<a href="#" id="test-button" style="display:block;">Test</a>
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

@include('partials.modals.image-upload')
@include('partials.modals.confirm')
@include('partials.modals.view-image')

   @section('main.body-at-bottom')
   <script src="{{ asset('assets/js/vendor/tingle.js') }}"></script>           
   <script src="{{ asset('assets/js/rp.lib.js') }}"></script>  
   <script src="{{ asset('assets/js/view-image-modal.js') }}"></script>  
   <script src="{{ asset('assets/js/rp.ajax.js') }}"></script>      
   <script src="{{ asset('assets/js/rp.modaldialogs.js') }}"></script>  
   <script src="{{ asset('assets/js/edit-image-modal.ajax.js') }}"></script>  
   <script src="{{ asset('assets/js/routes.images.js') }}"></script>  
   <script src="{{ asset('assets/js/vendor/notifier.min.js')}}"></script>
   <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.16/datatables.min.js"></script>       
   @endsection