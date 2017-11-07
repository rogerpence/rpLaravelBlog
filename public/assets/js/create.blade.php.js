

(function() {
    document.getElementById('title').addEventListener('input', function () {
        var slug = document.getElementById('slug');
        var slugText = this.value.replace(/(\s+)/g, '-').toLowerCase();
        slugText = slugText.replace(/(\.)/g, '').toLowerCase();
        slug.value = slugText;
    });
})();

let documentReady = () => {

    var simplemdeAbstract = new SimpleMDE({
        element: document.getElementById("abstract"),
        autofocus: false
        //toolbar: true
    });

    var simplemdeBody = new SimpleMDE({
        element: document.getElementById("body"),
        autofocus: false
    });


    const MAX_SEO_TITLE_LENGTH = 70;
    const MAX_SEO_DESC_LENGTH = 160;

    new rp.core.TypingTracker('title', MAX_SEO_TITLE_LENGTH)
    new rp.core.TypingTracker('seo_description', MAX_SEO_DESC_LENGTH)

    $('[data-toggle="popover"]').popover()

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

        rp.tagChiefDataListProvider.registerInputHandler(function (e) {
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
            tagTextInputId: 'tag-text-input',
            url: '/api/tags'
            //list: ['a','b','c']       
        };

        rp.tagChiefDataListProvider.initialize(providerOptions);

    
};

rp.core.documentReady(documentReady);
