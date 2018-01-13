<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width" initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('assets/js/vendor/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/tagchief.css') }}">

    <!-- MDB css -->
    <!-- <link rel="stylesheet" href="{{ asset('assets/mdb/css/mdb.min.css') }}"> -->
    
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
    <script src="https://use.fontawesome.com/ca38661c31.js"></script>
    

    <style>
        #tag-text-input {
            display: block;
        }

    </style>
    
</head>
<body>
    <br>
        <input class="form-input" type="text" list="all-tags" id="tag-text-input">
        <datalist id="all-tags">
        </datalist>  
        <br>
        <br>
        <br>
        <input type="text" id="tag-list-for-server">        
</body>

<script src="{{ asset('assets/js/vendor/jquery.js') }}"></script>
<script src="{{ asset('assets/js/vendor/popper.js') }}"></script>
<script src="{{ asset('assets/js/vendor/bootstrap.min.js') }}"></script>
<script src="{{ asset('assets/js/app.js') }}"></script>
<script src="{{ asset('assets/js/rpjs.js') }}"></script>
<script src="{{ asset('assets/js/tagchief.js') }}"></script>
<script src="{{ asset('assets/js/tagchiefdatalist.js') }}"></script>

</html>