"use strict";

var rp = rp || {};

rp.Lib = {};
rp.String = {};
rp.App = {};
rp.Lib = class Core {
    static documentReady(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }        
    }    

    static getFileNameParts(filename) {
        let result = {"name" : null, "extension" : null};
        let m;
        let match;
        let dot = /(\.)/g;
        while ((match = dot.exec(filename)) != null) {
            m = match;
        }
        if (typeof m == 'undefined') {
            result.name = filename;
        }
        else {
            result.name = filename.substr(0, m.index);
            result.extension = filename.substr(m.index + 1);
        }
        return result;
    }

    static getFileNameFromPath(path) {
        let filename = path.replace(/^.*\\/, '');
        return filename;
    }

    static getJulianDate(date) {
        let julianDate = Math.floor((date / 86400000) - (date.getTimezoneOffset() / 1440) + 2440587.5);
        return julianDate;
    }        

    static getUniqueIdentifier() {
        var now = new Date(); //set any date
        var seconds = (now.getHours() * 60 * 60) + (now.getMinutes() * 60) + now.getSeconds();

        return rp.Lib.getJulianDate(now) + '.' + seconds;
    }  

    static copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");

        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textArea);
    }

    static fadeOutHtmlElement(element) {
        var op = 1; // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            op -= 0.1;
        }, 200);

        setTimeout(function () {
            element.parentNode.removeChild(element)
        }, 2500);
    }    
}

rp.String.StringBuilder = class StringBuilder {
    constructor() {
        this.buffer = [];
    }
    
    append(str) 
    {
        this.buffer.push(str);
    }
    
    toString(delimiter) 
    {
        delimiter = delimiter || '';
        return this.buffer.join(delimiter);
    }    
}

rp.App.collapsize = (function() {
    var collapsedTag;
    
    function addCollapseExpandIcons(firstListHeading) {
        // Add collapse/expand icons above first collapsible element.
        let collapseExpandLinks = '<a id="collapse-all" style="font-size: 125%;" href="#" title="Collapse all"><i class="fa fa-minus-circle"</i></a>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
        collapseExpandLinks = '<span>&nbsp;</span>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
        collapseExpandLinks = '<a id="expand-all" style="font-size: 125%;" href="#" title="Expand all"><i class="fa fa-plus-circle"</i></a>';
        firstListHeading.insertAdjacentHTML('beforebegin', collapseExpandLinks);
    }

    function toggleElementContentDisplay(collaspibleElement) {
        let el = collaspibleElement.parentNode.nextElementSibling;
        do { 
                if (el.classList.contains('collapser')) {
                return;
            }
            el.classList.toggle('visible-no');
        } while (el = el.nextElementSibling);
    }

    function expandOrCollapseContentDisplay(expandOrCollapse) {
        let headings = document.querySelectorAll(collapsedTag);
        for (var i = 0; i < headings.length; i++) {
            let el = headings[i].parentNode.nextElementSibling;
            do { 
                if (el.classList.contains('collapser')) {
                    continue;
                }
                if (expandOrCollapse === 'expand') {
                    el.classList.remove('visible-no');
                }
                else  {
                    el.classList.add('visible-no');
                }                
            } while (el = el.nextElementSibling);
        }
    }        

    function toggleAllCollapseElementsContentVisibility() {
        let headings = document.querySelectorAll(collapsedTag);
        for (var i = 0; i < headings.length; i++) {
            toggleElementContentDisplay(headings[i]);
        }                
    }

    function wrapCollapseElementsWithAnchor(collapseElements) {
        for (var i = 0; i < collapseElements.length; i++) {
            // Create a new anchor tag.
            var anchor = document.createElement('a');
            anchor.className = 'collapser';
            anchor.href = "#";

            // These two lines wrap an anchor tag around the target tag.
            // Insert an anchor tag before the target tag.
            collapseElements[i].parentNode.insertBefore(anchor, collapseElements[i]);
            // Move the target tag inside the anchor tag. 
            anchor.appendChild(collapseElements[i]);

            // Add click event handler to each collapsible element.
            collapseElements[i].addEventListener('click', function (e) {
                e.preventDefault();
                toggleElementContentDisplay(this);
                // var links = this.parentElement.nextElementSibling;
                // links.style.display = (links.style.display == 'none') ? 'block' : 'none';
                return false;
            });
        }                            
    }
    
    function init(targetTagName, InitialCollapse=true) {
        collapsedTag = 'article ' + targetTagName + ':not(.no-collapse)';
        let headings = document.querySelectorAll(collapsedTag);
        if (headings.length == 0) {
            return;
        }

        addCollapseExpandIcons(headings[0]);
        wrapCollapseElementsWithAnchor(headings);
        if (InitialCollapse) {
            toggleAllCollapseElementsContentVisibility();        
        }            

        // Assign the target tag's click handler.
        document.getElementById('collapse-all').addEventListener('click', function (e) {
            e.preventDefault();
            expandOrCollapseContentDisplay('collapse');
            return false;
        });

        // Assign the target tag's click handler.
        document.getElementById('expand-all').addEventListener('click', function (e) {
            e.preventDefault();
            expandOrCollapseContentDisplay('expand');
            return false;
        });        
    }

    return {
        init: init
    };
})();