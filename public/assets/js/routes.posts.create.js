var rp = rp || {};

rp.beforeFormHash = '';

rp.disasterProtection = (function() {   
    let enableRestoreButton = () => {
        let restoreButton = document.getElementById('restore-content-button');
        let sessionKey = document.getElementById('slug').value + '-time';
        let timeSaved = localStorage.getItem(sessionKey);
        if (timeSaved) {
            let buttonText = timeSaved.substr(0,10) + ' @ ' + timeSaved.substr(11, 5);
            restoreButton.innerHTML = buttonText;
            restoreButton.classList.remove('visible-no');
        }            
    };

    let restore = () => {
        let sessionKey = document.getElementById('slug').value;

        rp.bodyMarkdownEditor.setCurrentBody(localStorage.getItem(sessionKey + '-body'));
        rp.abstractMarkdownEditor.setCurrentAbstract(localStorage.getItem(sessionKey + '-abstract'));
        document.getElementById('seo_description').value = localStorage.getItem(sessionKey + '-seo-description');
        
        document.getElementById('restore-content-button').classList.add('visible-no');

        notifier.show('Restore successful', 'The abstract, body, and seo description have been restored.', '', '/assets/images/ok-48.png', 6000);            
    };

    let save = () => {
        let sessionKey = document.getElementById('slug').value + '-time';
        let value = new Date().toISOString();
        localStorage.setItem(sessionKey, value);

        sessionKey = document.getElementById('slug').value + '-body';
        value = rp.bodyMarkdownEditor.getCurrentBody(); 
        localStorage.setItem(sessionKey, value);

        sessionKey = document.getElementById('slug').value + '-abstract';
        value = rp.abstractMarkdownEditor.getCurrentAbstract()
        localStorage.setItem(sessionKey, value);

        sessionKey = document.getElementById('slug').value + '-seo-description';
        value = document.getElementById('seo_description').value;
        localStorage.setItem(sessionKey, value);
        // 300000 ms = 5 minutes.
    };

    return {
        save: save,
        restore: restore,
        enableRestoreButton: enableRestoreButton
    };
})();

rp.addErrors = (json) => {
    /*
     | This page uses the following HTML to show all 
     | error messages.
     */                    
    let sb = new rp.stringBuilder();    
    sb.append('<div class="form-group">');
    sb.append('  <div class="card">');
    sb.append('    <div class="card-body">');
    sb.append('      <h4>Input errors</h4>');
    sb.append('      <div class="alert alert-danger">');
    sb.append('       <ul id="error-list">');
    sb.append('       </ul>');
    sb.append('      </div>');
    sb.append('    </div>');
    sb.append('  </div>');
    sb.append('</div>');
    
    let errorRoot = document.getElementById('validator-error-list');
    errorRoot.innerText = '';
    errorRoot.insertAdjacentHTML('afterbegin', sb.toString());

    sb = new rp.stringBuilder();       
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            /*
             | This page is showing individual field error messages.                 
             | <small data-field="title" class="text-danger">{{ $errors->first('title') }}</small>
             */                
            let errorDetailElement = document.querySelector(`small[data-field="${key}"]`); 
            errorDetailElement.innerText = json[key][0];                
            json[key].forEach(function(error) {
                sb.append(`<li>${error}</li>`);
            });
        }
    }

    errorRoot = document.getElementById('error-list');
    errorRoot.insertAdjacentHTML('afterbegin', sb.toString());
}

rp.autosave = (function() {
    function postSaved(json) {
        if (json.hasOwnProperty('errors')) {        
            rp.addErrors(json.errors);
        }
        else {
            notifier.show('Save successful', 'Your post has been updated.', '', '/assets/images/ok-48.png', 4000);            
        }            
        // Reset form fields snapshot.
        rp.beforeFormHash = rp.lib.getFormHash('post-content-form');
    };

    let convertFormDataToJson = (formData) => {
        // Collect all of formData's values.
        let jsonObject = {};

        for (const [key, value]  of formData.entries()) {
            jsonObject[key] = value;
        }        
        
        //return JSON.stringify(jsonObject);           
        return jsonObject;
    };

    let save = () => {
        /*
         | If instant save was requested for a new post, the post 
         | needs to be added and then control needs to return to 
         | the edit page. 
         */
        let mode = (document.getElementById('postid')) == null ? 'add' : 'update';
        if (mode === 'add') {
            // Submit the form to add the item but request a return
            // back to this edit page. 
            let formTag = document.getElementById('post-content-form');
            let action = formTag.getAttribute('action') + '?return-to=edit';
            formTag.setAttribute('action', action);            
            formTag.submit();
            return;
        }

        var form = document.getElementById('post-content-form');
        // Get all form data. 
        var formData = new FormData(form);
        // Refresh abstract and body from simpleMDE.
        formData.set('abstract', rp.abstractMarkdownEditor.getCurrentAbstract());
        formData.set('body', rp.bodyMarkdownEditor.getCurrentBody());
        
        let json = convertFormDataToJson(formData);

        delete json['_method'];

        let options = {
            url: '/api/posts',
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'                    
            }),
            dataType: 'json',
            body: JSON.stringify(json),
            json: JSON.stringify(json),
            action: rp.autosave.postSaved
        };

        rp.ajax.submitRequest(options);
        //rp.ajax2(options);
    };

    return {
        save: save,
        postSaved: postSaved
    };
})();

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

    function setCurrentAbstract(contents) {
        return editor.codemirror.setValue(contents);
    }    


    return {
        instance: instance,
        getCurrentAbstract: getCurrentAbstract,
        setCurrentAbstract: setCurrentAbstract
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

    function setCurrentBody(contents) {
        return editor.codemirror.setValue(contents);
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
       
    return {
        instance: instance,
        getCurrentBody: getCurrentBody,
        setCurrentBody: setCurrentBody
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
        setInterval(function() {
            // Check every two seconds to see if save buttons should be enabled.
            if (rp.beforeFormHash !== rp.lib.getFormHash('post-content-form')) {
                document.getElementById('alias-save-button').disabled = false;
                document.getElementById('instant-save-button').disabled = false;
            }
            else {
                document.getElementById('alias-save-button').disabled = true;
                document.getElementById('instant-save-button').disabled = true;
            }
        },2000);

        setInterval(function() {
            // Save current state every three minutes.
            rp.disasterProtection.save()
            document.getElementById('restore-content-button').classList.add('visible-no');            
        },180000);            

        document.getElementById('restore-content-button').addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            rp.disasterProtection.restore()            
        });            

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
                rp.autosave.save();        
                return false;
            }
        }, true);

        window.onbeforeunload = function (e) {     
            // rp.pureFunctions.collectInputs();       
            let activeElement = document.activeElement;
            if (! activeElement.className.includes('bypass-dirty')) {  
                const dataChanged = (rp.beforeFormHash !== rp.lib.getFormHash('post-content-form'));
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

    rp.beforeFormHash = rp.lib.getFormHash('post-content-form');

    document.getElementById('instant-save-button').addEventListener('click', function(e){
        e.preventDefault();
        rp.autosave.save();        
        return false;
    });

    rp.disasterProtection.enableRestoreButton();
};

rp.lib.documentReady(documentReady);