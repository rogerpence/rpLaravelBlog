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
