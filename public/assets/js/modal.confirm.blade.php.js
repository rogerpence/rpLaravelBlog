var rp = rp || {};

rp.modalConfirm = (function () {
    var modal;

    var configureModalDialog = (function(options) {
        if ( typeof modal != 'undefined') {
            return;
        }
        modal = new tingle.modal({
            footer: true,
            stickyFooter: true,
            closeMethods: ['escape'],
            closeLabel: "Close",
            //cssClass: ['custom-class-1', 'custom-class-2'],
            onOpen: function () {
            },
            onClose: function () {
                //console.log('modal closed');
            },
            beforeClose: function () {
                return true; // close the modal
                //return false; // nothing happens
            }
        });

        document.getElementById('modal-title').innerHTML = options.title;
        document.getElementById('modal-text').innerHTML = options.text;

        // Load modal content from innerHTML of a given element id.            
        modal.setContent(document.getElementById('modal-confirm-container').innerHTML);
        
        modal.addFooterBtn('Yes', 'btn btn-success dialog-button', function() {
            // here goes some logic
            modal.close();
        });

        // add a button
        modal.addFooterBtn('No', 'btn btn-danger dialog-button', function() {
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
    });

    function showModalWindow() {
        modal.open();
    };

    return {
        configureModalDialog: configureModalDialog,
        showModalWindow: showModalWindow
    }
})();
