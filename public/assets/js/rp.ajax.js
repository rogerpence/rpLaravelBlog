var rp = rp || {};

rp.ajax = {}
rp.ajax.HTTPRequest = class HTTPRequest {
    constructor() {
    }

    submit(options) {
        fetch(options.url, {
            method: options.method,
            headers: options.headers,
            body: options.body
        })    
        .then(this.checkHTTPStatus)
        .then((response) => response.json())
        .then(json => options.action(json))        
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

