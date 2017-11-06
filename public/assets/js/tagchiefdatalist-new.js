var rp = rp || {};

rp.tagChiefDataListProvider = (function () {

    let datalistId;
    let tagTextInputId;
    let tagList = [];

    const initialize = (options) => {
        datalistId = options.datalistId;
        tagTextInputId = options.tagTextInputId;

        if (options.url !== 'undefined') {
            const fn = () => {
                assignInitialTagsList(initialTagList);
                assignTagsListToDataList();
            };                
            performGetRequest(options.url, fn)                            
        }
    };

    const performGetRequest= (url, fn) => {
        //let url = '/api/tags';
        let promise = $.getJSON(url)
        promise.done(function (json, fn) {
            fn()
        });
        promise.fail(function (jqxhr, textStatus, error) {
            console.log('Ajax failed fetching tag list.')
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
        let options = [];

        for (let i = 0, len = tagList.length; i < len; i++) {
            options.push(`<option value="${tagList[i]}">`);
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
    
    const appendTagIfNotPresent = (tagToFind) => {
        if (isTagInTagList(tagToFind)) {
            return false;
        }
        removeChildrenFromDatalist();
        tagList.push(tagToFind);
        assignTagsListToDataList();      
        hideDatalistDropDown();        
        return true;
    }        

    const registerInputHandler = (fn) => {
        document.getElementById('tag-text-input').addEventListener('input', fn);        
    };

    const hideDatalistDropDown = () => {
        let currentElement = document.activeElement;
        document.activeElement.blur();
        window.focus();

        return currentElement;
    }

    return {
        registerInputHandler: registerInputHandler,
        initialize: initialize,
        isTagInTagList: isTagInTagList,
        appendTagIfNotPresent: appendTagIfNotPresent,
        hideDatalistDropDown: hideDatalistDropDown,
        clearAndFocusTagInputElement: clearAndFocusTagInputElement
    };

}());  

const tagChiefOptions = {
    // Other options to consider:
    //   - mixedCaseTags
    //   - allowDuplicateTags

    // All of the editableTags properties are optional.

    // Spell your keys correctly! An incorrect spelling won't cause an error.     
    editableTags: {
        tagTextInputId: 'tag-text-input', // default is 'tag-text-input'
        inputTagIdForServer: 'tag-list-for-server', // default is 'tag-list-for-server'
        initialTags: [],
        onTagAddedHandler: (tag) => {
            rp.tagChiefDataListProvider.appendTagIfNotPresent(tag);
            rp.tagChiefDataListProvider.clearAndFocusTagInputElement();
        },
        onTagRemovedHandler: (tag) => {
            // Add code here to be performed when a tag is removed.
            // The tag removed is passed as the single argument to this event handler.
            console.log('removed: ' + tag);
        },
        onDupeDetected: (tag) => {
            rp.tagChiefDataListProvider.hideDatalistDropDown();
        }
    }
};

$(function() {
    rp.tagchief.setOptions(tagChiefOptions);

    rp.tagChiefDataListProvider.registerInputHandler(function(e) {
        let tagText = this.value;

        let isDupe = rp.tagchief.isDuplicate(tagText);

        if (rp.tagChiefDataListProvider.isTagInTagList(tagText) && ! isDupe ) {
            rp.tagchief.addTag(tagText);
            this.value = '';
            this.focus();        
        }    

        if (isDupe) {
            this.value = '';
            this.focus();        
        }            
    });    

    let providerOptions = {
        datalistId: 'all-tags',
        tagTextInputId:'tag-text-input',
        url: '/api/tags'
        // list:        
    };
    
    rp.tagChiefDataListProvider.initialize(providerOptions);

    // let url = '/api/tags';
    // let promise = $.getJSON(url)
    // promise.done(function (json) {
    // rp.tagChiefDataListProvider.initialize(json, providerOptions);
    // });
    // promise.fail(function (jqxhr, textStatus, error) {
    //     console.log('Ajax failed fetching tag list.')
    // });
});

