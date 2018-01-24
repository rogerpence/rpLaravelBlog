"use strict";

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
            let httpReq = new rp.ajax.HTTPRequest();
            httpReq.submit({url: options.url,
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            }),
                            action: fn});
        }            
        else if (options.hasOwnProperty('list')) {
            fn(options.list);
        }
    };

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
        let el = document.getElementById(datalistId);
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