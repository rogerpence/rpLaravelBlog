var rp = rp || {};

rp.dialogs = (function() {
    modalConfirmation = function() {
        // instanciate new modal
        this.modal = new tingle.modal({
            footer: false,
            stickyFooter: false,
            closeMethods: ['escape'],
            closeLabel: "Close",
            cssClass: ['custom-class-1', 'custom-class-2'],
            onOpen: function() {
                console.log('modal open');
            },
            onClose: function() {
                console.log('modal closed');
            },
            beforeClose: function() {
                // here's goes some logic
                // e.g. save content before closing the modal
                return true; // close the modal
                return false; // nothing happens
            }
        });    
    
        // add a button
        // this.modal.addFooterBtn('Button label', 'tingle-btn tingle-btn--primary', function() {
        //     // here goes some logic
        //     this.modal.close();
        // });
    
        // this.modal.addFooterBtn('Dangerous action !', 'tingle-btn tingle-btn--danger', function() {
        //     // here goes some logic
        //     this.modal.close();
        // });   
    }  
    
    modalConfirmation.prototype.setContent = function(content) {
        this.modal.setContent(content);    
    }
    
    modalConfirmation.prototype.open = function(fn) {
        let config = (modal) => {
            var app = new Vue({            
                el: "#vue-view",
                data: {
                    "title" : "this is a title",                
                    "subtitle" : "this is subtitle",
                    "text": "this is some text"
                },
                methods: {
                    "submitAction" : function(e) {
                        modal.close();
                        fn();
                    },
                    "cancelAction" : function(e) {
                        modal.close();
                    }                    
                }            
            });
        }

        config(this.modal, fn);
        this.modal.open();
    }



    return {
        modalConfirmation: modalConfirmation
    };
})();


