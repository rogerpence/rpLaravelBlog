<div id="accordion" role="tablist">
    <div class="card">
        <div class="card-header" role="tab" id="headingOne">
            <h5 class="mb-0">
                <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Content
                </a>
            </h5>
        </div>
        <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"><i class="fa fa-file-text admin-nav" aria-hidden="true"></i> <a href="{{ route('dashboard.posts') }}">Work with posts</a></li>
                    <li class="list-group-item"><i class="fa fa-comments admin-nav" aria-hidden="true"></i> <a href="{{ route('dashboard.posts') }}">Work with pages</a></li>
                    <li class="list-group-item"><i class="fa fa-file admin-nav" aria-hidden="true"></i> <a href="{{ route('dashboard.comments') }}">Work with comments</a>  <span class="badge badge-danger">3</span></li>
                </ul>
            </div>
        </div>            
    </div>
    <div class="card">
        <div class="card-header" role="tab" id="headingTwo">
            <h5 class="mb-0">
                <a class="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Configure
                </a>
            </h5>
        </div>
        <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"><i class="fa fa-file-text admin-nav" aria-hidden="true"></i> <a href="#">Work with posts</a></li>
                    <li class="list-group-item"><i class="fa fa-comments admin-nav" aria-hidden="true"></i> <a href="#">Work with pages</a></li>
                    <li class="list-group-item"><i class="fa fa-file admin-nav" aria-hidden="true"></i> <a href="#">Work with comments</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header" role="tab" id="headingThree">
            <h5 class="mb-0">
                <a class="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Collapsible Group Item #3
                </a>
            </h5>
        </div>
        <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"><i class="fa fa-file-text admin-nav" aria-hidden="true"></i> <a href="#">Work with posts</a></li>
                    <li class="list-group-item"><i class="fa fa-comments admin-nav" aria-hidden="true"></i> <a href="#">Work with pages</a></li>
                    <li class="list-group-item"><i class="fa fa-file admin-nav" aria-hidden="true"></i> <a href="#">Work with comments</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>