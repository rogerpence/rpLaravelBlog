function insertAtCaret(areaId, text) {
    var txtarea = document.getElementById(areaId);
    if (!txtarea) { return; }

    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
        "ff" : (document.selection ? "ie" : false));
    if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
    } else if (br == "ff") {
        strPos = txtarea.selectionStart;
    }
    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br == "ie") {
        txtarea.focus();
        var ieRange = document.selection.createRange();
        ieRange.moveStart('character', -txtarea.value.length);
        ieRange.moveStart('character', strPos);
        ieRange.moveEnd('character', 0);
        ieRange.select();
    } else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }

    txtarea.scrollTop = scrollPos;
}


(function() {
    document.getElementById('title').addEventListener('input', function () {
        var slug = document.getElementById('slug');
        var slugText = this.value.replace(/(\s+)/g, '-').toLowerCase();
        slugText = slugText.replace(/(\.)/g, '').toLowerCase();
        slug.value = slugText;
    });
})();

let documentReady = () => {

    // Add global hot keys to editor panel.
    document.addEventListener('keydown', (e) => {
        const S_Key = 83;
        const L_Key = 76;

        if (e.ctrlKey && e.keyCode == S_Key) {
            event.preventDefault();
            document.getElementById('post-content-form').submit();
            return false;
        }            
        else if (e.ctrlKey && e.keyCode == L_Key) {
                var marker = '<!--prettify lang=js linenums=true-->';
                insertAtCaret('body', marker);
        }
        else  {
            return true;
        }
    });

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

    document.getElementById('title').addEventListener('input', function () {
        var slug = document.getElementById('slug');
        var slugText = this.value.replace(/(\s+)/g, '-').toLowerCase();
        slugText = slugText.replace(/(\.)/g, '').toLowerCase();
        slug.value = slugText;
    });

    var simplemdeAbstract = new SimpleMDE({
        element: document.getElementById("abstract"),
        autofocus: false,
        indentWithTabs: true,
        tabSize: 4
        //toolbar: true
    });

    var simplemdeBody = new SimpleMDE({
        element: document.getElementById("body"),
        indentWithTabs: true,
        autofocus: false,
        tabSize: 4        
    });

    const MAX_SEO_TITLE_LENGTH = 70;
    const MAX_SEO_DESC_LENGTH = 160;

    new rp.core.TypingTracker('title', MAX_SEO_TITLE_LENGTH)
    new rp.core.TypingTracker('seo_description', MAX_SEO_DESC_LENGTH)

    $('[data-toggle="popover"]').popover()

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

    const dp = document.getElementById('date-to-publish');
    const fp = flatpickr(dp, {});

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

        // set content
        postTitle = document.getElementById('title').value;
         modal.setContent('<h4>Are you sure you want to delete this post?</h4>' + 
        '<h4>' + postTitle + '</h4>');

        // add a button
        modal.addFooterBtn('No', 'tingle-btn tingle-btn--primary', function () {
            modal.close();
        });
        
        // add another button
        modal.addFooterBtn('Yes', 'tingle-btn tingle-btn--danger', function () {
            // here goes some logic
            let parms = {};        
            let el = document.querySelector('input[name="_token"]');
            parms._token = el.value;
            parms._method = 'delete';

            let post_id = document.getElementById('postid').value;

            post(`/post/${post_id}`, parms);        
        });    

        document.getElementById('delete-post').addEventListener('click', (e) => {
            modal.open()
        });    
    }        

};

rp.core.documentReady(documentReady);


    // $( "#tag-text-input" ).autocomplete( {
    //     source : function(req, add) {
    //         // req.term = value entered in text box.
    //         let url = '/api/tags?startswith=' + req.term;
    //         let promise = $.getJSON(url)
    //         promise.done(function(json) {
    //             add(json);                
    //         });
    //         promise.fail(function(jqxhr,textStatus,error) {    
    //            let x = 'x';                     
    //         });
    //     },    
    //     select : function(e, ui) {
    //         document.getElementById('tag-text-input').value = '';
    //         return false;

    //     },
    //     focus: function (event, ui) {
    //         var menu = $(this).data("uiAutocomplete").menu.element;
    //         focused = menu.find("li:has(a.ui-state-focus)");
    //         console.log(focused.attr('class'));
    //     }         
    // });     

