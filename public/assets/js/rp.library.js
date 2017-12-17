var rp = rp || {};

rp.library = (function() {
    var collapsedTag;
    
    function collapseAll() {
        let headings = document.querySelectorAll(collapsedTag);
        for (var i = 0; i < headings.length; i++) {
            headings[i].parentElement.nextElementSibling.style.display = 'none';
        }           
    }

    function collapsize(targetTagName) {
        collapsedTag = targetTagName;
        let headings = document.querySelectorAll(targetTagName);
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
                    collapseAll('h5');
                    var links = this.parentElement.nextElementSibling;
                    links.style.display = (links.style.display == 'none') ? 'block' : 'none';
                });
            }                
        }
    }

    return {
        collapsize: collapsize
    };
})();



