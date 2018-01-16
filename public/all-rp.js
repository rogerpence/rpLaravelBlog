var rp = rp || {};

rp.collapsize = (function() {
    var collapsedTag;
    
    function changeDisplay(display) {
        let headings = document.querySelectorAll(collapsedTag);
        for (var i = 0; i < headings.length; i++) {
            if (headings[i].parentElement.nextElementSibling) {
                headings[i].parentElement.nextElementSibling.style.display = display;
            }                
        }           
    }

    function addCollapseExpandIcons(firstListHeading) {
        let collapseExpandLinks = '<a id="collapse-all" style="font-size: 125%;" href="#" title="Collapse all"><i class="fa fa-minus-circle"</i></a>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
        collapseExpandLinks = '<span>&nbsp;</span>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
        collapseExpandLinks = '<a id="expand-all" style="font-size: 125%;" href="#" title="Expand all"><i class="fa fa-plus-circle"</i></a>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
    }

    function collapsize(targetTagName) {
        targetTagName = targetTagName + ':not(.no-collapse)';
        collapsedTag = targetTagName;
        let headings = document.querySelectorAll(targetTagName);
        if (headings.length == 0) {
            return;
        }

        addCollapseExpandIcons(headings[0]);

        for (var i = 0; i < headings.length; i++) {
            if (!headings[i].className.includes('no-collapse')) {
                // Create a new anchor tag.
                var anchor = document.createElement('a');
                anchor.className = 'collapser';
                anchor.href = "#";

                // These two lines wrap an anchor tag around the target tag.
                // Insert an anchor tag before the target tag.
                headings[i].parentNode.insertBefore(anchor, headings[i]);
                // Move the target tag inside the anchor tag. 
                anchor.appendChild(headings[i]);

                // Hide content that immediately follows the target tag.
                // This would usually be an ordered or unordered list.
                headings[i].parentElement.nextElementSibling.style.display = 'none';
                
                // Assign the target tag's click handler.
                headings[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    var links = this.parentElement.nextElementSibling;
                    links.style.display = (links.style.display == 'none') ? 'block' : 'none';
                    return false;
                });
            }                
        }

        // Assign the target tag's click handler.
        document.getElementById('collapse-all').addEventListener('click', function (e) {
            e.preventDefault();
            changeDisplay('none');
            return false;
        });

        // Assign the target tag's click handler.
        document.getElementById('expand-all').addEventListener('click', function (e) {
            e.preventDefault();
            changeDisplay('block');
            return false;
        });        
    }

    return {
        collapsize: collapsize
    };
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
var rp = rp || {};

rp.collapsize = (function() {
    var collapsedTag;
    
    function changeDisplay(display) {
        let headings = document.querySelectorAll(collapsedTag);
        for (var i = 0; i < headings.length; i++) {
            if (headings[i].parentElement.nextElementSibling) {
                headings[i].parentElement.nextElementSibling.style.display = display;
            }                
        }           
    }

    function addCollapseExpandIcons(firstListHeading) {
        let collapseExpandLinks = '<a id="collapse-all" style="font-size: 125%;" href="#" title="Collapse all"><i class="fa fa-minus-circle"</i></a>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
        collapseExpandLinks = '<span>&nbsp;</span>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
        collapseExpandLinks = '<a id="expand-all" style="font-size: 125%;" href="#" title="Expand all"><i class="fa fa-plus-circle"</i></a>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
    }

    function collapsize(targetTagName) {
        targetTagName = targetTagName + ':not(.no-collapse)';
        collapsedTag = targetTagName;
        let headings = document.querySelectorAll(targetTagName);
        if (headings.length == 0) {
            return;
        }

        addCollapseExpandIcons(headings[0]);

        for (var i = 0; i < headings.length; i++) {
            if (!headings[i].className.includes('no-collapse')) {
                // Create a new anchor tag.
                var anchor = document.createElement('a');
                anchor.className = 'collapser';
                anchor.href = "#";

                // These two lines wrap an anchor tag around the target tag.
                // Insert an anchor tag before the target tag.
                headings[i].parentNode.insertBefore(anchor, headings[i]);
                // Move the target tag inside the anchor tag. 
                anchor.appendChild(headings[i]);

                // Hide content that immediately follows the target tag.
                // This would usually be an ordered or unordered list.
                headings[i].parentElement.nextElementSibling.style.display = 'none';
                
                // Assign the target tag's click handler.
                headings[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    var links = this.parentElement.nextElementSibling;
                    links.style.display = (links.style.display == 'none') ? 'block' : 'none';
                    return false;
                });
            }                
        }

        // Assign the target tag's click handler.
        document.getElementById('collapse-all').addEventListener('click', function (e) {
            e.preventDefault();
            changeDisplay('none');
            return false;
        });

        // Assign the target tag's click handler.
        document.getElementById('expand-all').addEventListener('click', function (e) {
            e.preventDefault();
            changeDisplay('block');
            return false;
        });        
    }

    return {
        collapsize: collapsize
    };
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