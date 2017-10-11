
let documentReady = () => {

    var simplemdeAbstract = new SimpleMDE({
        element: document.getElementById("abstract"),
        autofocus: false
        // toolbar: false
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
};

rp.core.documentReady(documentReady);
