var rp = rp || {};

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


rp.lib.documentReady( function() {
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



var rp = rp || {};

let beforeFormHash;

rp.autosave = (function() {
    let postSaved = (json) => {
        let j = json;
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
        var form = document.getElementById('post-content-form');
        var formData = new FormData(form);
        
        // I am not converting this to a string!
        let json = convertFormDataToJson(formData);

        let options = {
            url: '/api/posts',
            method: 'POST',
            headers: {"content-type" : "application/json"},
            body: JSON.stringify(json),
            json: JSON.stringify(json),
            action: rp.autosave.postSaved
        };

        //rp.ajax.submitRequest(options);
        rp.ajax2(options);
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

        setInterval(function(){
            console.log('checking');
            if (beforeFormHash !== rp.lib.getFormHash('post-content-form')) {
                //document.getElementById('alias-save-button').classList.remove('disabled-color');
                document.getElementById('alias-save-button').disabled = false;
            }
            else {
                document.getElementById('alias-save-button').disabled = true;
            }
        },2000);

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

    document.getElementById('test-button').addEventListener('click', function(e){
        e.preventDefault();
        rp.autosave.save();        
        return false;
    });
};

rp.lib.documentReady(documentReady);
var rp = rp || {};

rp.general = (function () {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");

        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textArea);
    }

    function fadeOutHtmlElement(element) {
        var op = 1; // initial opacity
        var timer = setInterval(function() {
            if (op <= 0.1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            op -= 0.1;
        }, 200);

        setTimeout(function () {
            element.parentNode.removeChild(element)
        }, 2500);
    }

    return {
        copyTextToClipboard: copyTextToClipboard,
        fadeOutHtmlElement: fadeOutHtmlElement,
        getParameterByName: getParameterByName
    }
})();

rp.showPostPage = (function () {
    const UNORDERED_LIST_TAG_NAME = 'OL';
    const PRE_TAG_NAME = 'PRE';
    const SMALL_TAG = 'small';

    const CODE_COPIED_MESSAGE = 'Code copied to clipboard';

    function hasLineNumbers(element) {
        return element.tagName == UNORDERED_LIST_TAG_NAME;
    }

    var findCodePreTag = function (element) {
        if (element.previousElementSibling && 
            typeof element.previousElementSibling.tagName !== 'undefined') {
            if (element.previousElementSibling.tagName == PRE_TAG_NAME) {
                return element.previousElementSibling;
            }
        }            

        currentElement = element.parentNode.previousSibling;
        while (currentElement.tagName !== PRE_TAG_NAME) {
            currentElement = currentElement.previousSibling;
        }
        return currentElement;
    }

    var collectNumberedCode = function (orderedList) {
        let code = [];
        var orderedListContainer = orderedList.childNodes;
        for (var i = 0; i < orderedListContainer.length; i++) {
            code.push(orderedListContainer[i].innerText);
        }
        return code.join('\n');
    }

    var showCopiedToClipboardMessage = function (parent) {
        var msgElement = document.createElement(SMALL_TAG);
        msgElement.innerText = CODE_COPIED_MESSAGE;
        msgElement.style = 'margin-left: 5px;'
        parent.insertAdjacentElement('afterend', msgElement);
        rp.general.fadeOutHtmlElement(msgElement);
    }

    function assignCopyCodeToClipboardEventHandler(id) {
        var snippets = document.querySelectorAll(id);
        for (var i = 0; i < snippets.length; i++) {
            snippets[i].addEventListener('click', function (e) {
                e.preventDefault();

                var preTag = findCodePreTag(this);
                if (preTag.firstChild.tagName == UNORDERED_LIST_TAG_NAME) {
                    var allLines = collectNumberedCode(preTag.firstChild);
                } else {
                    var allLines = preTag.firstChild.innerText;
                }

                rp.general.copyTextToClipboard(allLines);

                showCopiedToClipboardMessage(this);
            });
        }
    }

    return {
        assignCopyCodeToClipboardEventHandler: assignCopyCodeToClipboardEventHandler
    };
})();

var highlightsStatus = true;

let toggleHighlights = document.getElementById('toggle-highlights');
if (toggleHighlights) {
    document.getElementById('toggle-highlights').addEventListener('click', function(e) {
        e.preventDefault();
        if (highlightsStatus) {
            var highlights = document.querySelectorAll('mark.search-term');
            for (var i=0; i< highlights.length; i++){
                highlights[i].className ="search-term-off";
            }
        }
        else {        
            var highlights = document.querySelectorAll('mark.search-term-off');
            for (var i = 0; i < highlights.length; i++) {
                highlights[i].className = "search-term";
            }
        }        
        highlightsStatus = ! highlightsStatus;
    });
}

rp.codehighlight = (function(){
    function ProgramException(message) {
        this.message = message;
        this.name = 'ProgramException';
     }
    
    const getRange = (str) => {
        const basePattern = '\\s*(\\d{1,3})\\s*-\\s*(\\d{1,3})\\s*';
        const regex = new RegExp(basePattern, 'g');
        const rangePattern = new RegExp('^' + basePattern + '$');
    
        let m;
        let result = [];
    
        if (! str.match(rangePattern)) {
            throw new ProgramException('A range doesn\'t match the correct n - m pattern.');    
        }        
    
        m = regex.exec(str);
        if ((!m) || (m.length !== 3)) {
            throw new ProgramException('A range doesn\'t match the correct n - m pattern.');
        }
    
        let start = parseInt(m[1],10);
        let stop = parseInt(m[2],10);
        if (stop < start) {
            throw new ProgramException('A range\'s second argument must be greater than the first argument.');
        }
    
        for (var i = start; i <= stop; i++) {
            result.push(i);
        }
    
        return result;
    };    
    
    const parseLines = (str) => {
        let lineNumbers = [];
        let isDigit = /^\s*\d{1,3}\s*$/;
    
        let lines = str.split(',');
        for (var i = 0; i < lines.length; i++) {
            let token = lines[i];
            if (lines[i].match(isDigit)) {
                lineNumbers.push(parseInt(lines[i],10));
            }
            else if (lines[i].includes('-')) {
                    var range = getRange(lines[i]);    
                    for (var j = 0; j < range.length; j++) {
                        lineNumbers.push(range[j]);                
                    }                
                 }
            else {
                throw new ProgramException('A token isn\'t numeric or a range.');            
            }            
        }
    
        return lineNumbers;
    }    
    
    let assign = () => {
        let divTags = document.querySelectorAll('div');
        for (let i =0; i <divTags.length; i++) {
            let lineNumbersString = divTags[i].getAttribute('data-lines');
            if (lineNumbersString) {
                // This assumes there is an array of linei numbers. 
                let lineNumbers = parseLines(lineNumbersString);
                let olTag = divTags[i].nextElementSibling.firstElementChild;
                let liTags = olTag.children;
                if (liTags && liTags.length > 0) {
                    for (let j = 0; j < lineNumbers.length; j++) {
                        liTags[lineNumbers[j]].className = 'highlight-code';
                    }
                }                    
            }                
        }       
    }
    return {
        assign: assign
    }

})();

rp.lib.documentReady(function() {  
    rp.showPostPage.assignCopyCodeToClipboardEventHandler('.copy-to-clipboard');
    
    var search = rp.general.getParameterByName('s');
    if (search) {
        if (search == '[pronouns]') {
            search = ['I', 'me', 'my', 'mine', "I'm", "I'll"];
        }
        else {
            search = [search, search +"'s", "." + search];
        }        
        document.getElementById('toggle-highlights').style.display = "inline";    
        var instance = new Mark(document.querySelector("div.show-full-post"));
        instance.mark(search, {
            "ignorePunctuation": ["'","."],
            "accuracy": "exactly",
            "className": "search-term"
        });
    }

    rp.codehighlight.assign();
});

var rp = rp || {};

rp.ajax2 = (options) => {
    $.ajax({
        url: options.url,
        type:'POST',
        data: options.json,
        contentType: 'application/json',
        success: function(data) {
            if($.isEmptyObject(data.errors)){
                options.action(data);
            }else{
                options.action(data.errors);
            }
        }
    });
}

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

var rp = rp || {};

rp.lib = (function() {
    function documentReady(fn) {
        /*
           This "document ready" function is from youmightnotneedjquery.com. 

           The typical pattern for this routine is shown below; where this 
           code is at the bottom of the page just before the closing </body>
           tag.     

           <script>        
                let afterDocumentLoaded = () => {
                    // Put JavaScript here that's supposed to execute after
                    // the document is loaded and ready. 
                };                    

                rp.lib.documentReady(afterDocumentLoaded);
            </script>        

        */

        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    };

    const getFormHash = (targetId) => {
        let form = document.getElementById(targetId);
        let formData = new FormData(form);

        // Update formData with most recent 'abstract' and 'body' buffers
        // before they are collected.
        formData.set('abstract', rp.abstractMarkdownEditor.getCurrentAbstract());
        formData.set('body', rp.bodyMarkdownEditor.getCurrentBody());

        // Collect all of formData's values.
        let inputsValues = [];
        for(let [key, value] of formData.entries()) {
            inputsValues.push(value);
        }
        //  Do this if you'd rather store a hash than the full value
        //  of form data. 
        //  const shaObj = new jsSHA("SHA-256", "TEXT");
        //  shaObj.update(inputsValues.join(''))
        //  return = shaObj.getHash("HEX");     

        return inputsValues.join('');         
    }         

    var postJSONFileUpload = function(url, callback) {
        var form = document.getElementById('form-upload-image');
        var formData = new FormData(form);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        xhr.onload = function() {        
            var status = xhr.status;
            
            if (status == 200) {
                callback(xhr.response);
            } else {
                callback(status);
            }
        };

        xhr.send(formData);        
    }

    // Same declaration as below.
    //async function getJson2(url) {

    const getJson2 = async (url) => {
        let response = await fetch(url, {
            method: "GET"                
        });
        return await response.json();
    }

    // Also works. GET seems to be the default. 
    // const getJson2 = async (url) => {
    //     let response = await fetch(url);
    //     return await response.json();
    // }
    

    var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        
        xhr.onload = function() {        
            var status = xhr.status;
            
            if (status == 200) {
                callback(xhr.response);
            } else {
                callback(status);
            }
        };
        
        xhr.send();
    };

    var submitJSON = function(options) {
        let method = options.method || 'POST';
        xhr = new XMLHttpRequest();
        xhr.open(method, options.url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () { 
            if (xhr.readyState == 4 && xhr.status == 200) {
                    var t = xhr.responseText;
                    var json = JSON.parse(xhr.responseText);
                    options.callback(json);
                }
            }
        xhr.send(JSON.stringify(options.data));        
   }

   var getFileNameParts = function(filename) {
        let result = {"name" : null, "extension" : null};
        let m;
        let dot = /(\.)/g;
        while ((match = dot.exec(filename)) != null) {
            m = match;
        }
        if (typeof m == 'undefined') {
            result.name = filename;
        }
        else {
            result.name = filename.substr(0, m.index);
            result.extension = filename.substr(m.index + 1);
        }
        return result;
    }
    
    var getFileNameFromPath = function(path) {
        filename = path.replace(/^.*\\/, '');
        return filename;
    }

    var getJulianDate = function(date) {
        let julianDate = Math.floor((date / 86400000) - (date.getTimezoneOffset() / 1440) + 2440587.5);
        return julianDate;
    }        

    var getUniqueIdentifier = function() {
        var now = new Date(); //set any date
        var seconds = (now.getHours() * 60 * 60) + (now.getMinutes() * 60) + now.getSeconds();

        return getJulianDate(now) + '.' + seconds;
    }
 
    function copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");

        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textArea);
    }

    function fadeOutHtmlElement(element) {
        var op = 1; // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            op -= 0.1;
        }, 200);

        setTimeout(function () {
            element.parentNode.removeChild(element)
        }, 2500);
    }

    return {
        getFileNameParts: getFileNameParts,
        getFileNameFromPath: getFileNameFromPath,
        getJulianDate: getJulianDate,
        getUniqueIdentifier: getUniqueIdentifier,
        getJSON: getJSON,
        getJson2: getJson2,
        submitJSON: submitJSON,
        postJSONFileUpload: postJSONFileUpload,
        copyTextToClipboard: copyTextToClipboard,
        fadeOutHtmlElement: fadeOutHtmlElement,
        getFormHash: getFormHash,
        documentReady: documentReady
    }
})();

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



var rp = rp || {};

var rp = rp || {};

rp.stringBuilder = function() 
{
    this.buffer = [];
}  

rp.stringBuilder.prototype.add = function(str) 
{
    this.buffer.push(str);
}

rp.stringBuilder.prototype.toString = function(delimiter) 
{
    delimiter = delimiter || '';
    return this.buffer.join(delimiter);
}
var rp = rp || {};

rp.tagchief = (function() {
    const TAG_TEMPLATE_EDIT = '<span style="order:1" id="tag-{{tag}}" class="tag">{{tag}}<a href="#" class="tag-x"><i data-tag="tag-{{tag}}" class="fa fa-trash"></i></a></span>';
    const TAG_TEMPLATE_READONLY = '<span class="tag">{{tag}}</span>';

    // The following values are set (or changed) with setOptions().
    let onTagRemoved;
    let onTagAdded;
    let onDupeDetected;
    let inputTagIdForServer = "tag-list-for-server";
    let tagTextInputId = 'tag-text-input';

    document.getElementById(tagTextInputId).addEventListener('keydown', function(ev) {
        const BACKSPACEKEY = 8;
        const TABKEY = 9;
        const ENTERKEY = 13;
        const ESCAPEKEY = 27;

        let e = ev || window.event;

        console.log("'" + this.value + "'");

        if (e.keyCode == ESCAPEKEY) 
        {
            this.value = '';
            e.preventDefault();
            this.focus();
            return false;
        }
        else if (e.keyCode == BACKSPACEKEY) 
        {            
            if (this.value.trim() == '') {
                e.preventDefault();
                this.focus();
                return false;
            }
        } 
        else if (e.keyCode == TABKEY) 
        {
            if (this.value.trim() == '') 
            {
                return true;
            }

            if (isDuplicate(this.value.trim().toLowerCase())) 
            {
                this.value = '';
                e.preventDefault();
                this.focus();
                return false;
            }

            addTag(this.value.toLowerCase());
            this.value = '';
            e.preventDefault();
            this.focus();
            return false;
        }
    });

    var getTagsTextAsArray = () => {
        const tags = document.querySelectorAll('span[id^="tag-"]');
        const tagsList = [];

        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            tagsList.push(tag.textContent.trim());
        };

        return tagsList
    };

    var refreshServerListAndTabIndex = () => {
        const tagsList = getTagsTextAsArray();

        document.getElementById(inputTagIdForServer).value = tagsList.sort().join(',');
        let i = 1;
        tagsList.sort().forEach(function(element) {
            tagElement = document.getElementById('tag-' + element);
            tagElement.setAttribute('style', 'order:' + i);
            tagElement.setAttribute('tabindex', i + 100);
            i++;
        });
    };

    var isDuplicate = (tagText) => {
        const tagsList = getTagsTextAsArray();

        const isDupe = tagsList.includes(tagText);

        if (isDupe) {
            let dupedTag = document.getElementById('tag-' + tagText);
            dupedTag.classList.add('dupe-flash');
            window.setTimeout(function() {
                dupedTag.classList.remove('dupe-flash');
            }, 800);
            if (typeof onDupeDetected == 'function') {
                onDupeDetected(tagText);
            }       
        }
        return isDupe;
    };

    var removeTag = (e) => {
        let tagOwnerId = e.target.getAttribute('data-tag');
        let tagOwnerElement = document.getElementById(tagOwnerId);

        let tag = tagOwnerElement.textContent;

        // Remove event listener.
        tagOwnerElement.removeEventListener('click', removeTag);

        // Remove tag element.
        tagOwnerElement.parentElement.removeChild(tagOwnerElement);

        refreshServerListAndTabIndex();
        // Put focus back into input tag. 
        document.getElementById(tagTextInputId).focus();

        if (typeof onTagRemoved == 'function') {
            onTagRemoved(tag);
        }
    };

    var getTagHtml = (tag, template) => {
        let html = template.replace(/{{tag}}/g, tag);

        return html;
    }

    var addTag = (tag) => {
        if (tag.trim() == '') 
        {
            return;
        }
        let html = getTagHtml(tag, TAG_TEMPLATE_EDIT);

        // Insert new tag html immediately before input tag
        ele = document.getElementById(tagTextInputId);
        ele.insertAdjacentHTML('beforebegin', html);

        // Assign remove tag action on tag click. 
        let mytag = document.getElementById('tag-' + tag);
        mytag.addEventListener('click', removeTag);

        refreshServerListAndTabIndex();

        if (typeof onTagAdded == 'function') {
            onTagAdded(tag);
        }
    };

    var addTagsForReadOnly = (targetId, initialTags) => {
        let allTagsHtml = [];

        initialTags.sort().forEach(function(tag) {
            let html = getTagHtml(tag, TAG_TEMPLATE_READONLY);
            allTagsHtml.push(html)
        });

        let target = document.getElementById(targetId);
        target.insertAdjacentHTML('beforebegin', allTagsHtml.join(''));
    };

    var addInitialTags = (initialTags) => {
        let el = document.getElementById(inputTagIdForServer);
        if (el.value == '') {
            return;
        }
        let existingTags = (el.value).split(',').sort();
        el.value = '';

        for (let i = 0, len = existingTags.length; i < len; i++) {
            addTag(existingTags[i].trim());
        }
    };

    var setOptions = (options) => {
        if (options.hasOwnProperty('editableTags')) {
            tagTextInputId = options.editableTags.tagTextInputId;
            inputTagIdForServer = options.editableTags.inputTagIdForServer;
            addInitialTags();
            // Note that onTagAdded doesn't fire for tags added with 
            // addInitialTags() method.
            onTagRemoved = options.editableTags.onTagRemovedHandler;
            onTagAdded = options.editableTags.onTagAddedHandler;
            onDupeDetected = options.editableTags.onDupeDetected;
        }
        if (options.hasOwnProperty('outputTags')) {
            addTagsForReadOnly(options.outputTags.containerId, options.outputTags.tags);
        }
    };

    return {
        addTagsForReadOnly: addTagsForReadOnly,
        setOptions: setOptions,
        addTag: addTag,
        isDuplicate: isDuplicate
    };
}());


var rp = rp || {};

rp.tagChiefDataListProvider = (function () {

    let datalistId;
    let tagTextInputId;
    let tagList = [];
    let adhocTagList = [];

    const initialize = (options) => {
        datalistId = options.datalistId;
        tagTextInputId = options.tagTextInputId;

        let el = document.getElementById(tagTextInputId);
        el.addEventListener('input', function(e) {
            if (typeof options.inputHandlerFn == 'function') {
                options.inputHandlerFn(e, this);
            }                
        });        

        const fn = (list) => {
            assignInitialTagsList(list);
            assignTagsListToDataList();
        };                

        if (options.hasOwnProperty('url')) {
            let promise = performGetJsonRequest(options.url)
            .then(
                function(data) {
                    fn(data);
                },
                function(error) {
                    console.error('Ajax get Json call failed: ', error)   
                }
            );
        }
        else if (options.hasOwnProperty('list')) {
            fn(options.list);
        }
    };

    const performGetJsonRequest = (url) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);

            xhr.onload = () => {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                }
                else {
                    reject(Error(xhr.statusText));
                }
            }

            xhr.onerror = () => {
                reject(Error('Network error'));
            }

            xhr.send();
        });
    }

    const clearAndFocusTagInputElement = () => {
        let el = document.getElementById(tagTextInputId);
        el.focus();
        el.value = '';
    }

    const assignInitialTagsList = (initialTagList, targetId) => {
        tagList = initialTagList.slice(0);
    };
    
    const assignTagsListToDataList = () => {
        removeChildrenFromDatalist();

        var tagsArray = tagList.concat(adhocTagList);

        let options = [];

        for (let i = 0, len = tagsArray.length; i < len; i++) {
            options.push(`<option value="${tagsArray[i]}">`);
        }

        let el = document.getElementById(datalistId);
        el.insertAdjacentHTML('afterbegin', options.sort().join(''));
    };
 
    const isTagInTagList = (tagToFind) => {
        return tagList.includes(tagToFind);
    };

    const removeChildrenFromDatalist = () => {
        el = document.getElementById(datalistId);
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    };
    
    const appendTagIfAdhocTag = (tagToFind) => {
        if (adhocTagList.includes(tagToFind)) {
            return false;
        }
        if (tagList.includes(tagToFind)) {
            return false;
        }
        
        adhocTagList.push(tagToFind);
        assignTagsListToDataList();      
        hideDatalistDropDown();        

        return true;
    }        

    const removeIfAdhocTag = (tag) => {
        // If tag is in adhocTagList array it is an adhoc tag. 
        let index = adhocTagList.indexOf(tag);
        if (index > -1) {
            adhocTagList.splice(index, 1);
            assignTagsListToDataList();        
        }            
    }

    const hideDatalistDropDown = () => {
        let currentElement = document.activeElement;
        document.activeElement.blur();
        window.focus();

        return currentElement;
    }

    return {
        initialize: initialize,
        isTagInTagList: isTagInTagList,
        appendTagIfAdhocTag: appendTagIfAdhocTag,
        hideDatalistDropDown: hideDatalistDropDown,
        clearAndFocusTagInputElement: clearAndFocusTagInputElement,
        removeIfAdhocTag: removeIfAdhocTag
    };
}()); 
var rp = rp || {};

rp.typingTracker = (function () {
    function typingTracker(id, maxValue, eventName = 'keyup') {
        if (!document.getElementById(id + '-progress')) {
            insertProgessElements(id, maxValue);
        }
        const MAX_LIMIT = maxValue;
        this.id = id;
        this.element = document.getElementById(id);
        this.progressElement = document.getElementById(this.id + '-progress');
        this.eventName = eventName;
        this.maxValue = maxValue;
        this.counter = 0;

        function insertProgessElements(id, maxValue) {
            let inputElement = document.getElementById(id);
            // If the necessary progress tag doesn't exist, add it.
            let el = document.createElement('progress');
            el.id = inputElement.id + '-progress';
            el.className = 'progress-bar';
            inputElement.insertAdjacentElement('afterend', el);

            el = document.createElement('span');
            el.id = inputElement.id + '-max-value';
            el.style = "font-size: 70%";
            let target = document.getElementById(inputElement.id + '-progress');
            target.insertAdjacentElement('afterend', el);
        };

        this.setProgress = function () {
            // Set progress bar value.
            let charsEntered = this.element.value.length;
            this.progressElement.setAttribute('value', charsEntered);
            // Set characters remaining value.    
            let target = document.getElementById(this.id + '-max-value');
            let charsRemaining = MAX_LIMIT - this.element.value.length;
            target.textContent = `${charsEntered} characters of ${MAX_LIMIT}`;
            //target.textContent = ' characters to go: ' + (MAX_LIMIT - this.element.value.length);
        };

        this.setInitialValues = function () {
            this.element.setAttribute('maxlength', MAX_LIMIT);
            this.progressElement.setAttribute('max', MAX_LIMIT);
        };

        this.addListener = function () {
            // The code inside the addEventListen's 'this' value is the element
            // to which the listener is attached, not this object. By saving
            // 'this' as 'owner' and, thanks to JavaScript closures, the 
            // code inside the addEventListener has the needed reference
            // to be able to call this object's setProgress() method.
            var owner = this;
            this.element.addEventListener(this.eventName, function () {
                if (this.value.length > MAX_LIMIT) {
                    this.value = this.value.substring(0, maxlimit);
                    return false;
                }
                counter = MAX_LIMIT - this.value.length;
                owner.setProgress();
            })
        };

        this.setInitialValues();
        this.addListener();
        this.setProgress();
    };

    return {
        typingTracker: typingTracker
    };
}());
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
