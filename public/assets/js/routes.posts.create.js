var rp = rp || {};

let beforeFormHash;

rp.abstractMarkdownEditor = (function () {
    let editor;
    function instance(id) {
        editor = new SimpleMDE({
            element: document.getElementById(id),
            autofocus: false,
            indentWithTabs: true,
            tabSize: 4,
            shortcuts: {
                "toggleFullScreen": "F2"
            }
            //toolbar: true    
        });

        return editor;
    }

    function getCurrentAbstract() {
        return editor.codemirror.getValue();
    }

    return {
        instance: instance,
        getCurrentAbstract: getCurrentAbstract
    };       
})();            

rp.bodyMarkdownEditor = (function () {
    let editor;
    function instance(id) {
        editor = new SimpleMDE({
            element: document.getElementById(id),
            autosave: {
                enabled: false,
                uniqueId: 'bodyContent',
                delay: 1000
            },
            indentWithTabs: false,
            autofocus: false,
            tabSize: 4,
            shortcuts: {
                "toggleFullScreen": "F8"
            }
        });

        setCustomKeys(editor);
    }   
    
    function getCurrentBody() {
        return editor.codemirror.getValue();
    }

    function setCustomKeys(editor) {
        editor.codemirror.setOption("extraKeys", {
            // 'F8': function(cm) {
            //     cm.setFullscreen();   
            // },
            'End': function (cm) {
                cm.execCommand('goLineRight');
            },
            'Home': function (cm) {
                cm.execCommand('goLineLeftSmart');
            },
            'Alt-L': function (cm) {
                rp.pureFunctions.insertTextAtCurrentLine(cm, '<!--prettify lang=js linenums=true-->', 'js');
            },
            'Alt-M': function (cm) {
                rp.pureFunctions.insertTextAtCurrentLine(cm, '<small>caption</small>', 'caption');
            },
            'Alt-C': function (cm) {
                rp.pureFunctions.insertTextAtCurrentLine(cm, '<div class="code-header">header text</div>', 'header text');
            },
            'Alt-V': function (cm) {
                let sb = new rp.stringBuilder();
                sb.add('<small>copy-from-server-db Bash script to copy database ');
                sb.add('from host server.</small> ');
                sb.add('<a title="Copy to clipboard" href="#" class="copy-to-clipboard">');
                sb.add('<i class="fa fa-clipboard"></i></a>');
                rp.pureFunctions.insertTextAtCurrentLine(cm, sb.toString());
            },                
            'Alt-Y': function (cm) {
                let image = document.getElementById('image-name').value;                
                rp.pureFunctions.insertTextAtCurrentLine(cm, `![](/storage/images/${image})`, image);
            },
            'Alt-H': function (cm) {
                rp.postHelpPanel.open();
            }
        });
    }                        

    // function setEventHandlers(editor) {
    //     simplemdeBody.codemirror.on('focus', () => {
    //         currentMDEditor = 'body';
    //     });

    //     simplemdeBody.codemirror.on('blur', () => {
    //         currentMDEditor = '';
    //     });
    // }      
        
    return {
        instance: instance,
        getCurrentBody: getCurrentBody
    };       
})();    

rp.simpleControls = (function () {
    function addDatePicker() {
        const dp = document.getElementById('date-to-publish');
        const fp = flatpickr(dp, {});
    }        

    function addTypingTracker() {
        const MAX_SEO_TITLE_LENGTH = 70;
        const MAX_SEO_DESC_LENGTH = 300;
        new rp.typingTracker.typingTracker('title', MAX_SEO_TITLE_LENGTH)
        new rp.typingTracker.typingTracker('seo_description', MAX_SEO_DESC_LENGTH)
    }
    
    function initializeBootStrapComponents() {
        $('[data-toggle="popover"]').popover()
    }        

    function configure() {
        addDatePicker();
        addTypingTracker();
        initializeBootStrapComponents();
    }

    return {
        configure: configure
    };
})();

rp.pureFunctions = (function () {
    function insertTextAtCurrentLine(cm, text, selectText) {
        let cursorInfo = cm.getCursor('from');
        cursorInfo.ch = 0;
        cm.replaceRange(text, cursorInfo);

        if (typeof selectText !== 'undefined') {
            var startingPos = text.indexOf(selectText);
            cursorInfo.ch += startingPos;
            cursorTo = {
                'line': cursorInfo.line,
                'ch': cursorInfo.ch + selectText.length
            };
            cm.setCursor(cursorInfo);
            cm.setSelection(cursorInfo, cursorTo);
        } else {
            cursorInfo.ch = 0;
            cm.setCursor(cursorInfo);
        }
    }

    function post(path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }

    return {
        insertTextAtCurrentLine: insertTextAtCurrentLine,
        post: post
    };
})();

rp.eventHandlers = (function () {
    function add() {
        document.getElementById('title').addEventListener('input', function () {
            var slug = document.getElementById('slug');
            var slugText = this.value.replace(/(\s+)/g, '-').toLowerCase();
            slugText = slugText.replace(/(\.)/g, '').toLowerCase();
            slug.value = slugText;
        });

        // Global page hot keys.
        document.addEventListener('keydown', (e) => {
            const S_Key = 83;

            if (e.ctrlKey && e.keyCode == S_Key) {
                e.stopPropagation();
                e.preventDefault();
                document.getElementById('post-content-form').submit();
                return false;
            }
        }, true);

        window.onbeforeunload = function (e) {     
            // rp.pureFunctions.collectInputs();       
            let activeElement = document.activeElement;
            if (! activeElement.className.includes('bypass-dirty')) {  
                const dataChanged = (beforeFormHash !== rp.lib.getFormHash('post-content-form'));
                if (dataChanged) {
                    return dataChanged;
                }                
            }
        };
    }        

    return {
        add: add
    };        
})();

rp.tags = (function () {
    function configure() {
        const tagChiefOptions = {
            editableTags: {
                tagTextInputId: 'tag-text-input', // default is 'tag-text-input'
                inputTagIdForServer: 'tag-list-for-server', // default is 'tag-list-for-server'
                onTagAddedHandler: (tag) => {
                    rp.tagChiefDataListProvider.appendTagIfAdhocTag(tag);
                    rp.tagChiefDataListProvider.clearAndFocusTagInputElement();
                },
                onTagRemovedHandler: (tag) => {
                    rp.tagChiefDataListProvider.removeIfAdhocTag(tag);
                },
                onDupeDetected: (tag) => {
                    rp.tagChiefDataListProvider.hideDatalistDropDown();
                }
            }
        };

        rp.tagchief.setOptions(tagChiefOptions);

        let providerOptions = {
            datalistId: 'all-tags',
            tagTextInputId: 'tag-text-input',
            inputHandlerFn: (e, obj) => {
                // Handles 'input' event from tagTextInputId element. The e argument
                // is the event object passed to the 'input' handler and the 'obj'
                // is the element identified by 'tagTextInputId.' That option value
                // can't be directly referenced here because it is out of scope.  
                let tagText = obj.value;
                let isDupe = rp.tagchief.isDuplicate(tagText);

                if (rp.tagChiefDataListProvider.isTagInTagList(tagText) && !isDupe) {
                    rp.tagchief.addTag(tagText);
                    obj.value = '';
                    obj.focus();
                }

                if (isDupe) {
                    obj.value = '';
                    obj.focus();
                }
            },
            url: '/api/tags'
            //list: ['a','b','c']       
        };

        rp.tagChiefDataListProvider.initialize(providerOptions);
    }        

    return {
        configure: configure
    };

})();        

rp.deletePostModal = (function() {
    function configure() {        
        const isDeletable = document.getElementById('delete-post');
        if (isDeletable) {
            // instanciate new modal
            var modal = new tingle.modal({
                footer: true,
                stickyFooter: false,
                closeMethods: ['escape'],
                closeLabel: "Close",
                cssClass: ['custom-class-1', 'custom-class-2'],
                onOpen: function () {
                    //console.log('modal open');
                },
                onClose: function () {
                    //console.log('modal closed');
                },
                beforeClose: function () {
                    // here's goes some logic
                    // e.g. save content before closing the modal
                    return true; // close the modal
                    //return false; // nothing happens
                }
            });

            // Set modal content.
            postTitle = document.getElementById('title').value;
            modal.setContent('<h4>Are you sure you want to delete this post?</h4>' +
                '<h4>' + postTitle + '</h4>');

            modal.addFooterBtn('No', 'tingle-btn tingle-btn--primary', function () {
                modal.close();
            });

            modal.addFooterBtn('Yes', 'tingle-btn tingle-btn--danger', function () {
                let parms = {};
                let el = document.querySelector('input[name="_token"]');
                parms._token = el.value;
                parms._method = 'delete';

                let post_id = document.getElementById('postid').value;

                rp.pureFunctions.post(`/post/${post_id}`, parms);
            });

            document.getElementById('delete-post').addEventListener('click', (e) => {
                modal.open()
            });
        }        
    }        

    return {
        configure: configure
    }
})();

rp.postHelpPanel = (function() {
    let modal;
    function configure() {        
        modal = new tingle.modal({
            footer: true,
            stickyFooter: false,
            closeMethods: ['escape'],
            closeLabel: "Close",
            cssClass: ['custom-class-1', 'custom-class-2'],
            onOpen: function () {
                //console.log('modal open');
            },
            onClose: function () {
                //console.log('modal closed');
            },
            beforeClose: function () {
                // here's goes some logic
                // e.g. save content before closing the modal
                return true; // close the modal
                //return false; // nothing happens
            }
        });

        // Load modal content from innerHTML of a given element id.            
        modal.setContent(document.getElementById('post-help-panel').innerHTML);

        modal.addFooterBtn('OK', 'tingle-btn tingle-btn--primary', function () {
            modal.close();
        });
    }        

    function open() {
        modal.open();
    }

    return {
        configure: configure,
        open: open
    }
})();

let documentReady = () => {
    rp.bodyMarkdownEditor.instance('body');
    rp.abstractMarkdownEditor.instance('abstract');
    rp.simpleControls.configure();
    rp.eventHandlers.add();
    rp.tags.configure();
    rp.postHelpPanel.configure();
    rp.deletePostModal.configure();

    let editImageOptions = {
        "elementIdTriggerAddNewImage" : "admin-bar-upload-image",
        "elementIdWindowContents" : "upload-container",
        "ajax" : true
    };
    rp.editImage.configureModalDialog(editImageOptions);

    beforeFormHash = rp.lib.getFormHash('post-content-form');

    //console.log(beforeFormHash);
};

rp.lib.documentReady(documentReady);