var rp = rp || {};

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


rp.uploads = (function() {
    // https://www.youtube.com/watch?time_continue=30&v=Ncs6QI4Z5BE

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
            console.log('There was an Ajax error', error);
        });        
    }

    var getUploadedImages = function() {
        let options = {
            url: '/api/images',
            method: 'GET',
            headers: {},
            body: {},
            action: showImagesList
        }

        rp.ajax.submitRequest(options);
        console.log('got json');
        
        //showImagesList(json);
        return;

        // Fetch. This is it! 
        // https://davidwalsh.name/fetch
        fetch('/api/images')    
        .then((response) => response.json())
        .then(json => showImagesList(json))
        .catch((error) => {

        });
        console.log('got json');
    }

        // Async and await.            
        // Save as below.
        // rp.lib.getJson2('/api/images')
        //     .then(function(data) {
        //         showImagesList(data);
        //     });

        // rp.lib.getJson2('/api/images')
        //     .then(json => showImagesList(json));

        // As originally written with old-school callback.            
        //rp.lib.getJSON('/api/images', getUploadedImagesCallBack);            

    var getUploadedImagesCallBack = function(json) {
        showImagesList(json);
    }
    var assignImageListButtonHandlers = () => {        
        let table = $('#datatable').DataTable();

        let assignButtonEvent = function(selector) {
            let buttons = document.querySelectorAll(selector);            
            for (let i=0; i <buttons.length; i++) {
                buttons[i].addEventListener('click', function(e)  {
                    let tr = this.parentElement.parentElement;
                    var data = table.row($(tr)).data();

                    if (this.className == 'button-preview') {
                        rp.viewImage.showModalWindow(data);
                    }
                    else if (this.className == 'button-copy') { 
                        let filename = `![${data.description}]()/storage/images/${data.name}?${data.cachebuster}`;
                        rp.general.copyTextToClipboard(filename);
                        notifier.show('Copy to clipboard successful', 'Image URL is now available for pasting.', '', '/assets/images/survey-48.png', 4000);
                    }
                    else if (this.className == 'button-delete') {
                        // let options = {
                        //     "url": `/api/images/${data.id}`,                        
                        //     "data": data,
                        //     "callback": rp.uploads.imageDeleted,
                        //     "method": 'DELETE'
                        // };
                        // rp.lib.submitJSON(options);

                        // let options = {
                        //     url: `/api/images/${data.id}`,                        
                        //     method: 'DELETE',
                        //     headers: {
                        //         "content-type": "application/json"
                        //     },
                        //     body: JSON.stringify(data),        
                        //     action: rp.uploads.imageDeleted
                        // }
                        // rp.ajax.submitRequest(options);                

                        let options = {
                            url: `/api/images/${data.id}`,                        
                            json: data,
                            action: rp.uploads.imageDeleted,
                        }
                        rp.ajax.submitDeleteRequest(options);                

                    }
                    else if (this.className == 'button-edit') {
                        rp.editImage.getSingleImage(data.id);
                    }
                });
            }    
        }            
        assignButtonEvent('.button-copy');
        assignButtonEvent('.button-edit');
        assignButtonEvent('.button-preview');
        assignButtonEvent('.button-delete');
    }        

    var imageDeleted = (json)  => {
        rp.uploads.getUploadedImages();        
        let msg = `Associated image file [${json.name}] still available.`;
        notifier.show('Imaged deleted successfully from database', msg, '', '/assets/images/ok-48.png', 4000);
    }

    var getImageListButtons =  () => {
        let template = '<button title="{title}" class="button-{action}"><i class="fa fa-{icon}"></i></button>';
        let buttons = [];
        buttons.push(template.replace('{action}','copy').
                replace('{icon}','clipboard').
                replace('{title}', 'Copy filename to clipboard'));
        buttons.push(template.replace('{action}','edit').
                replace('{icon}','pencil').
                replace('{title}', 'Edit image'));
        buttons.push(template.replace('{action}','preview').
                replace('{icon}','picture-o').
                replace('{title}', 'Preview image'));
        buttons.push(template.replace('{action}','delete').
                replace('{icon}','trash-o').
                replace('{title}', 'Delete image'));                

        return buttons.join('');                
    };        

    var showImagesList = function(json) {
        let formatAsDateOnly = function(data, type) {
            if (type=='display') {
                return data.substr(0, 10);
            }
            else {
                return data;
            }
        };                

        $('#datatable').DataTable().destroy();        
        $('#datatable').DataTable({
            order: [2, 'desc'],
            data: json,
            columns: [
                { data: 'name'},
                { data: 'description', width: "25%"},
                { data: 'updated_at', width: "15%", 
                  render: function(data, type, row) {
                      return formatAsDateOnly(data, type);
                  }
                },
                { data: null, defaultContent: getImageListButtons(), width: "14%" }
            ]                
        });        
    }

    return {
        getUploadedImages: getUploadedImages,
        assignImageListButtonHandlers: assignImageListButtonHandlers,
        imageDeleted: imageDeleted
    };
})();


rp.core.documentReady( function() {
    // Assign button event handlers when datatable is drawn.

    rp.viewImage.configureModalDialog();        
    let editImageOptions = {
        "elementIdTriggerAddNewImage" : "show-upload-window",
        "elementIdWindowContents" : "upload-container",
        "ajax" : false
    };
    rp.editImage.configureModalDialog(editImageOptions);

    let modalOptions = {
        "title": "This is the title",
        "text":  "This is a description of the title"
    };
    //rp.modalConfirm.configureModalDialog(modalOptions);

    $('#datatable').DataTable().on('draw', function() {
        rp.uploads.assignImageListButtonHandlers();
    });

    let tester = () => {
        alert('yes');
    }

    document.getElementById('test-button').addEventListener('click', function(e) {
        let confirm = new rp.dialogs.modalConfirmation();
        confirm.setContent(document.getElementById('modal-confirm-container').innerHTML);    
        confirm.open(tester);
        
    })

    rp.uploads.getUploadedImages();
});


