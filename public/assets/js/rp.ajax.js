var rp = rp || {};

rp.ajax = {}
rp.ajax.HTTPRequest = class HTTPRequest {
    constructor() {
    }

    submit(options) {
        var fn; 
        if (options.hasOwnProperty('action')) {
            fn = options.action;
            delete options.action;
        }
        fetch(options.url, {
            method: options.method,
            headers: options.headers,
            body: options.body
        })    
        .then(this.checkHTTPStatus)
        .then((response) => response.json())
        .then(json => fn(json))        
        .catch((error) => {
            console.log('There was an HTTP fetch error', error);
        });        
    };

    checkHTTPStatus(response) {
        if (response.ok) {
            return response;
        }
        let error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
    };
}

