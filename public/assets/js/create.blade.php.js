let valuesOriginal;
let valuesCurrent;

let collectInputs = () => {
    inputs = document.querySelectorAll('.save');

    let values = [];
    for (var i = 0; i < inputs.length; i++) {
        values.push({
            'id': inputs[i].id,
            'value': inputs[i].value,
            'newValue' : '',
            'name': inputs[i].name,
            'changed': false
        });
    }
    return values;
}


/*
Insert text at beginning of line and optionally select selectText
*/
let currentMDEditor = '';

/*
{
    'key': 'O',
        'text': '{{prettify=js:linenums}}',
            'select' : 'js'
},    
*/

let macros = [
    {
        'key': 'L',
        'text': '<!--prettify lang=js linenums=true-->',
        'select':'js'
    },
    {
        'key': 'M',
        'text': '<small>caption</small>',
        'select': 'caption'
    },    
    {
        'key': 'J',
        'text': 'roger\n\pence'        
    }
];

/*
<div class="thumbnail pad-box-lg align-left" >
    <img src = "/media/images/avr-does-lots-of-things.png" >
    <div class = "text-center" >
       <small>AVR empowers your RPG programmers to do</small>
    </div>       
</div>
*/

function insertTextAtCurrentLine(markdownEditor, text, selectText) {
    let cursorInfo = markdownEditor.codemirror.getCursor('from');
    cursorInfo.ch = 0;
    markdownEditor.codemirror.replaceRange(text, cursorInfo);

    if (typeof selectText !== 'undefined') {
        var startingPos = text.indexOf(selectText);
        cursorInfo.ch += startingPos;
        cursorTo = {'line': cursorInfo.line, 'ch': cursorInfo.ch + selectText.length};
        markdownEditor.codemirror.setCursor(cursorInfo);
        markdownEditor.codemirror.setSelection(cursorInfo, cursorTo);
    }        
    else {
        cursorInfo.ch = 0; 
        markdownEditor.codemirror.setCursor(cursorInfo);        
    }
}

(function() {
    document.getElementById('title').addEventListener('input', function () {
        var slug = document.getElementById('slug');
        var slugText = this.value.replace(/(\s+)/g, '-').toLowerCase();
        slugText = slugText.replace(/(\.)/g, '').toLowerCase();
        slug.value = slugText;
    });
})();

// window.onbeforeunload = function(e) {
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
// };

let documentReady = () => {


    // Add hot keys to add/change page.
    document.addEventListener('keydown', (e) => {
        const Home_Key = 36;
        const End_Key = 35; 
        const E_Key = 69;
        const S_Key = 83;
        const L_Key = 76;
        const M_Key = 77;

        let j = String.fromCharCode(S_Key);
        
        // Page level keys.
        if (e.ctrlKey && e.keyCode == S_Key) {
            e.stopPropagation();
            e.preventDefault();
            document.getElementById('post-content-form').submit();
            return false;
        }   

        if (currentMDEditor !== 'body') {
            return;        
        }

        if (e.ctrlKey && e.keyCode == End_Key) {
            e.stopPropagation();
            e.preventDefault();
            simplemdeBody.codemirror.execCommand('goLineRight');
            return false;
        }

        if (e.ctrlKey && e.keyCode == Home_Key) {
            e.stopPropagation();
            e.preventDefault();
            simplemdeBody.codemirror.execCommand('goLineLeftSmart');
            return false;
        }

        // Apply macros keys for content textarea.
        macros.forEach((element, index, array) => {
            if (e.ctrlKey && element.key.toUpperCase().charCodeAt(0) == e.keyCode ) {
                e.stopPropagation();
                e.preventDefault();
                insertTextAtCurrentLine(simplemdeBody, element.text, element.select);
                return; 
            }
        });

        return ;
    }, true);

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
        tabSize: 4,        
        shortcuts: {
            "toggleFullScreen": "F8"
        }        
        //toolbar: true
    });

    var simplemdeBody = new SimpleMDE({
        element: document.getElementById("body"),
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

    //insertTextAtCurrentLine(simpleMDE, '<!--prettify lang=js linenums=true-->', 'js'),

    simplemdeBody.codemirror.on('focus', () => {
        currentMDEditor = 'body';
    });

    simplemdeBody.codemirror.on('blur', () => {
        currentMDEditor = '';
    });

    // simplemdeBody.toolbar.push({
    //         name: "Prettify",
    //         action: alert('hello'),
    //         className: "fa fa-code",
    //         title: "Insert prettify"
    //     });

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

    valuesOriginal = collectInputs();
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

