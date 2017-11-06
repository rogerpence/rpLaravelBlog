var rp = rp || {};

rp.tagChiefDataListProvider = (function () {

    const DATALIST_ID = 'all-tags';
    const TAG_TEXT_INPUT_ID = 'tag-text-input';

    const isTagInDataList = (tagToFind, targetId) => {
        targetId = targetId || DATALIST_ID;

        let el = document.getElementById(targetId);

        if (el.hasChildNodes()) {
            let children = el.childNodes;

            for (let i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.tagName === 'OPTION') {
                    var tagText = child.value;
                    if (tagToFind === tagText) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const removeTagsFromDatalist = () => {
        el = document.getElementById(DATALIST_ID);
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    };

    const addTagsToDataList = (tags, targetId, newTag) => {
        let tagList = [];

        if (typeof newTag !== 'undefined') {
            tags.push(newTag);
        }

        for (let i = 0, len = tags.length; i < len; i++) {
            tagList.push(`<option value="${tags[i]}">`);
        }

        let el = document.getElementById(targetId);
        el.insertAdjacentHTML('afterbegin', tagList.sort().join(''));
    };

    const appendTagIfNotPresent = (tagToFind, targetId) => {
        targetId = targetId || DATALIST_ID;
        
        let el = document.getElementById(DATALIST_ID);
        let tags = [];

        if (el.hasChildNodes()) {
            let children = el.childNodes;

            for (let i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.tagName === 'OPTION') {
                    var tagText = child.value;
                    if (tagToFind === tagText) {
                        return false;
                    }
                    tags.push(tagText);
                }                
            }
            removeTagsFromDatalist();
            addTagsToDataList(tags, DATALIST_ID, tagToFind);      
            return true;
        }
    };    

    const registerInputHandler = (fn) => {
        document.getElementById('tag-text-input').addEventListener('input', fn);        
    };

    return {
        registerInputHandler: registerInputHandler,
        addTagsToDataList: addTagsToDataList,
        isTagInDataList: isTagInDataList,
        appendTagIfNotPresent: appendTagIfNotPresent
    };

}());
    

const tagChiefOptions = {
    // Other options to consider:
    //   - mixedCaseTags
    //   - allowDuplicateTags

    // All of the editableTags properties are optional.

    // Spell your keys correctly! An incorrect spelling won't cause an error.     
    editableTags: {
        tagTextInputId: TAG_TEXT_INPUT_ID, // default is 'tag-text-input'
        inputTagIdForServer: 'tag-list-for-server', // default is 'tag-list-for-server'
        initialTags: [],
        onTagAddedHandler: (tag) => {
            // Add code here to be performed when a tag is added.
            // The tag added is passed as the single argument to this event handler.
            console.log('added: ' + tag);
            rp.tagChiefDataListProvider.appendTagIfNotPresent(tag);
            let el = document.getElementById(TAG_TEXT_INPUT_ID);
            el.focus();
            el.value = '';
        },
        onTagRemovedHandler: (tag) => {
            // Add code here to be performed when a tag is removed.
            // The tag removed is passed as the single argument to this event handler.
            console.log('removed: ' + tag);
        }
    },

    // If the outputTags key is provided, it must 
    // provide both the 'tags' key and the 'containerId' key.
    // This set of keys is only required if you're going to call 'addTagsForReadOnly'
    // outputTags: {
    //     tags: ['php', 'laravel', 'eloquent', 'db', 'mysql'],
    //     containerId: 'tag-output-container'
    // }
};


$(function() {
    rp.tagchief.setOptions(tagChiefOptions);

    rp.tagChiefDataListProvider.registerInputHandler(function(e) {
        let tagText = this.value;

        let isDupe = rp.tagchief.isDuplicate(tagText);

        if (rp.tagChiefDataListProvider.isTagInDataList(tagText) && ! isDupe ) {
            rp.tagchief.addTag(tagText);
            this.value = '';
            this.focus();        
        }    

        if (isDupe) {
            this.value = '';
            this.focus();        
        }            
    });    

    let url = '/api/tags?startswith=' + 'j';
    let promise = $.getJSON(url)
    promise.done(function (json) {
        rp.tagChiefDataListProvider.addTagsToDataList(json, DATALIST_ID);
    });
    promise.fail(function (jqxhr, textStatus, error) {
        console.log('Ajax failed fetching tag list.')
    });
});
