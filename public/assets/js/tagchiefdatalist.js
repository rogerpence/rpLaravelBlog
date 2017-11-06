var rp = rp || {};

rp.tagChiefDataListProvider = (function () {

    let datalistId;
    let tagTextInputId;
    let tagList = [];
    let newTags = [];

    const initialize = (options) => {
        datalistId = options.datalistId;
        tagTextInputId = options.tagTextInputId;

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

        var tagsArray = tagList.concat(newTags);

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
        if (newTags.includes(tagToFind)) {
            return false;
        }
        if (tagList.includes(tagToFind)) {
            return false;
        }
        
        newTags.push(tagToFind);
        assignTagsListToDataList();      
        hideDatalistDropDown();        

        return true;
    }        

    const removeIfAdhocTag = (tag) => {
        // If tag is in newTags array it is an adhoc tag. 
        let index = newTags.indexOf(tag);
        if (index > -1) {
            newTags.splice(index, 1);
            assignTagsListToDataList();        
        }            
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
        appendTagIfAdhocTag: appendTagIfAdhocTag,
        hideDatalistDropDown: hideDatalistDropDown,
        clearAndFocusTagInputElement: clearAndFocusTagInputElement,
        removeIfAdhocTag: removeIfAdhocTag
    };

}());  

const tagChiefOptions = {
    editableTags: {
        tagTextInputId: 'tag-text-input', // default is 'tag-text-input'
        inputTagIdForServer: 'tag-list-for-server', // default is 'tag-list-for-server'
        initialTags: [],
        onTagAddedHandler: (tag) => {
        //tagList.push(tagToFind);
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

$(function() {
    rp.tagchief.setOptions(tagChiefOptions);

    rp.tagChiefDataListProvider.registerInputHandler(function(e) {
        let tagText = this.value;
        let isDupe = rp.tagchief.isDuplicate(tagText);

        if (rp.tagChiefDataListProvider.isTagInTagList(tagText) && !isDupe) {
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
        //list: ['a','b','c']       
    };
    
    rp.tagChiefDataListProvider.initialize(providerOptions);
});

