var rp = rp || {};

rp.library = (function() {
    var targetTagName;
    
    function collapseAll(targetTagName) {
        let headings = document.querySelectorAll(targetTagName);
        for (var i = 0; i < headings.length; i++) {
            headings[i].parentElement.nextElementSibling.style.display = 'none';
        }           
    }

    function collapsize(targetTagName) {
        let headings = document.querySelectorAll(targetTagName);
        for (var i = 0; i < headings.length; i++) {
            // Create a new anchor tag.
            var anchor = document.createElement('a');
            anchor.className = 'collapser';
            anchor.href = "#";

            // These two lines wrap an anchor tag around the target tag.
            headings[i].parentNode.insertBefore(anchor, headings[i]);
            anchor.appendChild(headings[i]);

            // Hide content that immediately follows the target tag.
            headings[i].parentElement.nextElementSibling.style.display = 'none';

            // Assign the target tag's click handler.
            headings[i].addEventListener('click', function (e) {
                e.preventDefault();
                collapseAll('h5');
                var links = this.parentElement.nextElementSibling;
                links.style.display = (links.style.display == 'none') ? 'block' : 'none';
            });
        }
    }

    return {
        collapsize: collapsize
    };
})();



