

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

    $( "#tag-text-input" ).autocomplete( {
        source : function(req, add) {
            // req.term = value entered in text box.
            let url = '/api/tags?startswith=' + req.term;
            let promise = $.getJSON(url)
            promise.done(function(json) {
                add(json);                
            });
            promise.fail(function(jqxhr,textStatus,error) {    
               let x = 'x';                     
            });
        },    
        select : function(e, ui) {
            document.getElementById('tag-text-input').value = '';

            // var TABKEY = 9;
            // this.value = ui.item.value;

            // if (event.keyCode == TABKEY) { 
            //     event.preventDefault();
            //     this.value = this.value + " ";
            //     $('#search').focus();
            // }

            return false;

            //$( "#slug" ).val( ui.item.value );
            return false;
        } 
    });     

    // $( "input#post-tags" ).autocomplete( {
    //     source : function( req, add ) {
    //         var s = [ "John", "Paul", "George", "Ringo" ];
    //         add( s );
    //     },
    //     select : function( e, ui ) {
    //         $( "#slug" ).val( ui.item.value );
    //     } 
    // });     
    
};

rp.core.documentReady(documentReady);
