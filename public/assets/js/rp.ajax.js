var rp = rp || {};

rp.ajax2 = (options) => {
    $.ajax({
        url: options.url,
        type:'POST',
        data: options.json,
        success: function(data) {
            if($.isEmptyObject(data.errors)){
                options.action(data);
            }else{
                options.action(data.errors);
            }
        }
    });
}

rp.ajax = (function() {
    var checkHTTPStatus = (response) => {
        if (response.ok) {
            return response;
        }
        let error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
    }

    var submitRequest = (options) => {        
        fetch(options.url, {
            method: options.method,
            headers: options.headers,
            body: options.body
        })    
        .then(checkHTTPStatus)
        .then((response) => response.json())
        .then(json => options.action(json))        
        .catch((error) => {
            console.log('There was an HTTP fetch error', error);
        });        
    }

    var submitDeleteRequest = (options) => {
        options.method = 'DELETE';
        if (options.hasOwnProperty('json')) {
            options.body = JSON.stringify(options.json);
            delete options.json;
        }
        if (!options.hasOwnProperty('headers')) {
            options.headers = {};
        }                    
        options.headers['content-type'] = 'application/json';
        submitRequest(options);
    }        

    return {
        submitRequest: submitRequest,
        submitDeleteRequest: submitDeleteRequest
    }
})(); 
