var rp = rp || {};

rp.editImage = (function () {
    let modal;
    function configureModalDialog(editImageOptions) {
        if (typeof modal != 'undefined') {
            return;
        }

        if (editImageOptions.ajax) {
            document.getElementById('submit-button').type="button";
        }

        modal = new tingle.modal({
            footer: true,
            stickyFooter: false,
            closeMethods: ['escape'],
            closeLabel: "Close",
            cssClass: ['custom-class-1', 'custom-class-2'],
            onOpen: function () {
                if (isAddingImage()) {
                    document.getElementById('file-upload').focus();                    
                }                    
                else {
                    document.getElementById('image-description').focus();                    
                }                    
            },
            onClose: function () {
            },
            beforeClose: function () {
                return true; // close the modal
                //return false; // nothing happens
            }
        });

        // Load modal content from innerHTML of a given element id.            
        modal.setContent(document.getElementById(editImageOptions.elementIdWindowContents).innerHTML);
    
        document.getElementById(editImageOptions.elementIdTriggerAddNewImage).addEventListener('click', (e) => {
            let targetImageId = document.getElementById('image-preview')
            targetImageId.src = '';
            targetImageId.width = 1;
            targetImageId.height = 1;            
            targetImageId =  document.getElementById("image-size");
            targetImageId.textContent = '';
            e.preventDefault();
            showDialogForNewImage();
        });

        if (editImageOptions.ajax) {        
            document.getElementById('submit-button').addEventListener('click', (e) => {
                e.preventDefault();
                rp.lib.copyTextToClipboard('/storage/images/' + document.getElementById('image-name').value);  

                var form = document.getElementById('form-upload-image');
                var formData = new FormData(form);

                let options = {
                    url: '/api/imageupload',                                                    
                    method: 'POST',
                    body: formData,
                    action: rp.editImage.fileUploadCallback
                };                        

                let httpReq = new rp.ajax.HTTPRequest();
                httpReq.submit(options);

                

                //rp.lib.postJSONFileUpload('/api/imageupload', rp.editImage.fileUploadCallback);
                modal.close()
            });        
        }

        document.getElementById('cancel-button').addEventListener('click', (e) => {
            e.preventDefault();
            modal.close()
        });        

        let getUniqueFileName = (fullFileName) => {
            fileName = rp.lib.getFileNameFromPath(fullFileName);
            let fileNameParts = rp.lib.getFileNameParts(fileName);
            let newFileName = fileNameParts.name + '.' + 
                              rp.lib.getUniqueIdentifier() + '.' + 
                              fileNameParts.extension;

            return newFileName;                             
        };

        document.getElementById('file-upload').addEventListener('change', function(e) {
            let file;
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                file = this.files[0];
            
                reader.onload = function(e) {
                    let _URL = window.URL || window.webkitURL;
                    let img = new Image();
                    let reducedMsg = '';
                    let originalWidth;
                    let originalHeight;

                    img.onload = function () {
                        originalWidth = this.width;
                        originalHeight = this.height;
                        if (this.width > 400) {
                            let width =  this.width / 2;
                            let height = (width * this.height) / this.width;

                            this.width = width;
                            this.height = height;
                            reducedMsg = " (reduced by 50%)";
                        }
                        let targetImageId = document.getElementById('image-preview')
                        targetImageId.src = e.target.result;
                        targetImageId.width = this.width;
                        targetImageId.height = this.height;
                        targetImageId.style = "border: dashed 1px lightgray;";
                        targetImageId =  document.getElementById("image-size");
                        targetImageId.innerHTML = `Actual width ${originalWidth}px and height ${originalHeight}px` + reducedMsg;
                    };                    
                    
                    img.src = _URL.createObjectURL(file);                            
                }           
                reader.readAsDataURL(this.files[0]);
            }            

            let fullFileName = this.value;
            if (fullFileName != '') {
                if (isAddingImage()) {                    
                    document.getElementById('image-name').value =  getUniqueFileName(fullFileName);
                    document.getElementById('image-name-display').textContent = document.getElementById('image-name').value;
                    document.getElementById("submit-button").disabled = false;
                }                        
            }
            else { 
                document.getElementById('image-name').value = '';
                if (isAddingImage()) {                    
                    document.getElementById("submit-button").disabled = false;
                }
                else {
                    document.getElementById("submit-button").disabled = true;                    
                }                    
            }           
        });
    }

    let showDialogForNewImage = () => {
        document.getElementById('upload-file-panel-title').innerHTML = 'Upload a new image';            
        document.getElementById('file-upload-target-name').textContent = 'File will uploaded as:';
        document.getElementById('upload-message').value = '';
        document.getElementById('file-upload').value = '';
        document.getElementById('image-id').value = '0';
        document.getElementById('image-name').value = '';
        document.getElementById('image-name-display').textContent = '';
        document.getElementById('image-description').value = '';
        document.getElementById("submit-button").disabled = true;            
        modal.open()
    };

    var showDialogForExistingImage = (json) => {
        document.getElementById('upload-file-panel-title').innerHTML = 'Change an uploaded image';            
        document.getElementById('file-upload-target-name').textContent = 'File uploaded as uploaded as: ';        
        document.getElementById('upload-message').innerHTML = 'The uploaded file name won\'t change';
        document.getElementById('file-upload').value = '';
        document.getElementById('image-id').value = json.id;
        document.getElementById('image-name').value = json.name;
        document.getElementById('image-name-display').textContent = json.name;
        document.getElementById('image-description').value = json.description;
        document.getElementById('image-description').focus();
        document.getElementById("submit-button").disabled = false;
        modal.open()
    };

    var getSingleImage = function(id) {
        rp.lib.getJSON('/api/images/' + id, showDialogForExistingImage);        
    }

    var isAddingImage = () => {
        return document.getElementById('image-id').value == 0;
    }

    let showModalDialog = () => {
        modal.open();
    }

    var fileUploadCallback = function(json) {
        let j = json;
        if (json == 'ok') {
            notifier.show('Image uploaded.', 'Image URL is now available for pasting (or use Alt/Y in editor).', '', '/assets/images/ok-48.png', 4000);                        
        }            
    }

    return {
        configureModalDialog: configureModalDialog,
        showModalDialog: showModalDialog,
        getSingleImage: getSingleImage,
        fileUploadCallback: fileUploadCallback
    }
})();


