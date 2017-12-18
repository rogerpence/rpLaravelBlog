var rp = rp || {};

rp.library = (function() {
    var collapsedTag;
    
    function changeDisplay(display) {
        let headings = document.querySelectorAll(collapsedTag);
        for (var i = 0; i < headings.length; i++) {
            if (headings[i].parentElement.nextElementSibling) {
                headings[i].parentElement.nextElementSibling.style.display = display;
            }                
        }           
    }

    function addCollapseExpandIcons(firstListHeading) {
        let collapseExpandLinks = '<a id="collapse-all" style="font-size: 125%;" href="#" title="Collapse all"><i class="fa fa-minus-circle"</i></a>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
        collapseExpandLinks = '<span>&nbsp;</span>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
        collapseExpandLinks = '<a id="expand-all" style="font-size: 125%;" href="#" title="Expand all"><i class="fa fa-plus-circle"</i></a>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
    }

    function collapsize(targetTagName) {
        targetTagName = targetTagName + ':not(.no-collapse)';
        collapsedTag = targetTagName;
        let headings = document.querySelectorAll(targetTagName);
        if (headings.length == 0) {
            return;
        }

        addCollapseExpandIcons(headings[0]);

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
                    var links = this.parentElement.nextElementSibling;
                    links.style.display = (links.style.display == 'none') ? 'block' : 'none';
                    return false;
                });
            }                
        }

        // Assign the target tag's click handler.
        document.getElementById('collapse-all').addEventListener('click', function (e) {
            e.preventDefault();
            changeDisplay('none');
            return false;
        });

        // Assign the target tag's click handler.
        document.getElementById('expand-all').addEventListener('click', function (e) {
            e.preventDefault();
            changeDisplay('block');
            return false;
        });        
    }

    return {
        collapsize: collapsize
    };
})();



