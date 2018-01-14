/*
    


*/

var rp = rp || {};

rp.core = (function () {

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

                rp.core.documentReady(afterDocumentLoaded);
            </script>        

        */

        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    };

    return {
        documentReady: documentReady
    };
}());