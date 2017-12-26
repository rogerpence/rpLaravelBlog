var rp = rp || {};

// rp.globals = (function() {
//     let valuesOriginal;
//     let valuesCurrent;

//     return {
//         valuesOriginal: valuesOriginal,
//         valuesCurrent: valuesCurrent
//     };
// })();

rp.globals = {
    valuesOriginal: null,
    valuesCurrent: null
}

rp.abstractMarkdownEditor = (function () {
    function instance(id) {
        var editor = new SimpleMDE({
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
    return {
        instance: instance
    };       
})();            

rp.bodyMarkdownEditor = (function () {
    function instance(id) {
        var editor = new SimpleMDE({
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
        instance: instance
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
        new rp.core.TypingTracker('title', MAX_SEO_TITLE_LENGTH)
        new rp.core.TypingTracker('seo_description', MAX_SEO_DESC_LENGTH)
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

// rp.simpleControls = (function () {

//     return {

//     };        
// })();

rp.pureFunctions = (function () {
    function collectInputs() {
        inputs = document.querySelectorAll('.save');

        let values = [];
        for (var i = 0; i < inputs.length; i++) {
            values.push({
                'id': inputs[i].id,
                'value': inputs[i].value,
                'newValue': '',
                'name': inputs[i].name,
                'changed': false
            });
        }
        return values;
    }

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
        collectInputs: collectInputs,
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
            //     var message = 'Are you sure you want abandon unsaved changes on this page?';
            //     valuesCurrent = collectInputs();
            //     let cancelUnload = false;
            //     for (let i = 0; i < valuesCurrent.length; i++) {
            //         if (valuesOriginal[i].value !== valuesCurrent[i].value) {
            //             valuesOriginal[i].changed = true;
            //             valuesOriginal[i].newValue = valuesCurrent[i].value;
            //             cancelUnload = true;
            //         }
            //     }
            //     if (cancelUnload) {
            //         var e = e || window.event;
            //         if (e) {
            //             e.returnValue = message;
            //         }
            //         return message;
            //     }                
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

let documentReady = () => {
    rp.bodyMarkdownEditor.instance('body');
    rp.abstractMarkdownEditor.instance('abstract');
    rp.simpleControls.configure();
    rp.eventHandlers.add();
    rp.tags.configure();
    rp.deletePostModal.configure();
    
    rp.globals.valuesOriginal = rp.pureFunctions.collectInputs();

    var x = rp.globals.valuesOriginal;
};

rp.core.documentReady(documentReady);