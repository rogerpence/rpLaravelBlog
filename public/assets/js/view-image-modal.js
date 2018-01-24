"use strict";

rp.viewImage = (function () {
    var modal;

    function configureModalDialog() {
        if ( typeof modal != 'undefined') {
            return;
        }
        modal = new tingle.modal({
            footer: true,
            stickyFooter: false,
            closeMethods: ['escape'],
            closeLabel: "Close",
            //cssClass: ['custom-class-1', 'custom-class-2'],
            onOpen: function () {
                let imgTag = document.getElementById('image-preview-url');
                var width = imgTag.naturalWidth;
                var height = imgTag.naturalHeight;       
                document.getElementById('image-preview-size').innerHTML = 'Image size: ' + width + 'x' + height;      
            },
            onClose: function () {
                //console.log('modal closed');
            },
            beforeClose: function () {
                return true; // close the modal
                //return false; // nothing happens
            }
        });

        // Load modal content from innerHTML of a given element id.            
        modal.setContent(document.getElementById('view-image-container').innerHTML);

        // add a button
        modal.addFooterBtn('Close', 'btn btn-succes tingle-btn--pull-right', function() {
            // here goes some logic
            modal.close();
        });
        
        // document.getElementById('show-preview-window').addEventListener('click', (e) => {
        //     e.preventDefault();
        //     modal.open()
        // });

        // document.getElementById('cancel-button').addEventListener('click', (e) => {
        //     e.preventDefault();
        //     modal.close()
        // });        
    }

    function showModalWindow(data) {
        let imgTag = document.getElementById('image-preview-url');
        imgTag.src = '/storage/images/' + data.name;
        document.getElementById('image-preview-url-text').innerHTML = imgTag.src;
        modal.open();
    };

    return {
        configureModalDialog: configureModalDialog,
        showModalWindow: showModalWindow
    }
})();
