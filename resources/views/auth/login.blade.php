{{--@extends('layouts.app'--}}
@extends('masters.no-columns')

@section('content')
<div class="container">
    <div class="row align-items-center justify-content-center">

        <div class="card" style="width: 40rem;">
            <div class="card-body">
                <h4 class="card-title">User login</h4>
                <form method="POST" action="{{ route('login') }}">
                    {{ csrf_field() }}

                    <div class="form-group {{ $errors->has('email') ? ' has-error' : '' }}">                    
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="email" name="email" 
                               value=""
                               aria-describedby="emailHelp" placeholder="Email" required autofocus>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        @if ($errors->has('email'))
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif                        
                    </div>
{{-- Ss4v52^33Kez --}}
                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">                    
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" value="" 
                               name="password" id="password" 
                               placeholder="Password" required>
                        @if ($errors->has('password'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif                               
                    </div>

                    <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" {{ old('remember') ? 'checked' : '' }}
                                 name="remember">
                            Remember me
                        </label>
                    </div>

                    <button type="submit" class="btn btn-primary pull-right">
                        Submit
                    </button>
                    <a class="btn btn-link" href="{{ route('password.request') }}">
                        Forgot Your Password?
                    </a>                                    
                </form>

            </div>
        </div>

    </div>
</div>    
@endsection
