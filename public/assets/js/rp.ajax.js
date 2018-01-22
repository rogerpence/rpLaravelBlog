var rp = rp || {};

// rp.ajax2 = (options) => {
//     $.ajax({
//         url: options.url,
//         type: options.method,
//         data: options.json,
//         contentType: options.contentType,
//         success: function(data) {
//             if ($.isEmptyObject(data.errors)) {
//                 options.action(data);
//             }
//             else{
//                 options.action(data.errors);
//             }
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             let errorText = jqXHR.responseJSON;
//             let j = errorThrown;
//             j = testStatus;
//         }
//     });
// }

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

    return {
        submitRequest: submitRequest,
        submitDeleteRequest: submitDeleteRequest
    }
})(); 
