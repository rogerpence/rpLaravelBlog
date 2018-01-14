var rp = rp || {};

rp.general = (function () {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function copyTextToClipboard(text) {
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

    function fadeOutHtmlElement(element) {
        var op = 1; // initial opacity
        var timer = setInterval(function() {
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

    return {
        copyTextToClipboard: copyTextToClipboard,
        fadeOutHtmlElement: fadeOutHtmlElement,
        getParameterByName: getParameterByName
    }
})();

rp.showPostPage = (function () {
    const UNORDERED_LIST_TAG_NAME = 'OL';
    const PRE_TAG_NAME = 'PRE';
    const SMALL_TAG = 'small';

    const CODE_COPIED_MESSAGE = 'Code copied to clipboard';

    function hasLineNumbers(element) {
        return element.tagName == UNORDERED_LIST_TAG_NAME;
    }

    var findCodePreTag = function (element) {
        if (element.previousElementSibling && 
            typeof element.previousElementSibling.tagName !== 'undefined') {
            if (element.previousElementSibling.tagName == PRE_TAG_NAME) {
                return element.previousElementSibling;
            }
        }            

        currentElement = element.parentNode.previousSibling;
        while (currentElement.tagName !== PRE_TAG_NAME) {
            currentElement = currentElement.previousSibling;
        }
        return currentElement;
    }

    var collectNumberedCode = function (orderedList) {
        let code = [];
        var orderedListContainer = orderedList.childNodes;
        for (var i = 0; i < orderedListContainer.length; i++) {
            code.push(orderedListContainer[i].innerText);
        }
        return code.join('\n');
    }

    var showCopiedToClipboardMessage = function (parent) {
        var msgElement = document.createElement(SMALL_TAG);
        msgElement.innerText = CODE_COPIED_MESSAGE;
        msgElement.style = 'margin-left: 5px;'
        parent.insertAdjacentElement('afterend', msgElement);
        rp.general.fadeOutHtmlElement(msgElement);
    }

    function assignCopyCodeToClipboardEventHandler(id) {
        var snippets = document.querySelectorAll(id);
        for (var i = 0; i < snippets.length; i++) {
            snippets[i].addEventListener('click', function (e) {
                e.preventDefault();

                var preTag = findCodePreTag(this);
                if (preTag.firstChild.tagName == UNORDERED_LIST_TAG_NAME) {
                    var allLines = collectNumberedCode(preTag.firstChild);
                } else {
                    var allLines = preTag.firstChild.innerText;
                }

                rp.general.copyTextToClipboard(allLines);

                showCopiedToClipboardMessage(this);
            });
        }
    }

    return {
        assignCopyCodeToClipboardEventHandler: assignCopyCodeToClipboardEventHandler
    };
})();

var highlightsStatus = true;

let toggleHighlights = document.getElementById('toggle-highlights');
if (toggleHighlights) {
    document.getElementById('toggle-highlights').addEventListener('click', function(e) {
        e.preventDefault();
        if (highlightsStatus) {
            var highlights = document.querySelectorAll('mark.search-term');
            for (var i=0; i< highlights.length; i++){
                highlights[i].className ="search-term-off";
            }
        }
        else {        
            var highlights = document.querySelectorAll('mark.search-term-off');
            for (var i = 0; i < highlights.length; i++) {
                highlights[i].className = "search-term";
            }
        }        
        highlightsStatus = ! highlightsStatus;
    });
}

rp.codehighlight = (function(){
    function ProgramException(message) {
        this.message = message;
        this.name = 'ProgramException';
     }
    
    const getRange = (str) => {
        const basePattern = '\\s*(\\d{1,3})\\s*-\\s*(\\d{1,3})\\s*';
        const regex = new RegExp(basePattern, 'g');
        const rangePattern = new RegExp('^' + basePattern + '$');
    
        let m;
        let result = [];
    
        if (! str.match(rangePattern)) {
            throw new ProgramException('A range doesn\'t match the correct n - m pattern.');    
        }        
    
        m = regex.exec(str);
        if ((!m) || (m.length !== 3)) {
            throw new ProgramException('A range doesn\'t match the correct n - m pattern.');
        }
    
        let start = parseInt(m[1],10);
        let stop = parseInt(m[2],10);
        if (stop < start) {
            throw new ProgramException('A range\'s second argument must be greater than the first argument.');
        }
    
        for (var i = start; i <= stop; i++) {
            result.push(i);
        }
    
        return result;
    };    
    
    const parseLines = (str) => {
        let lineNumbers = [];
        let isDigit = /^\s*\d{1,3}\s*$/;
    
        let lines = str.split(',');
        for (var i = 0; i < lines.length; i++) {
            let token = lines[i];
            if (lines[i].match(isDigit)) {
                lineNumbers.push(parseInt(lines[i],10));
            }
            else if (lines[i].includes('-')) {
                    var range = getRange(lines[i]);    
                    for (var j = 0; j < range.length; j++) {
                        lineNumbers.push(range[j]);                
                    }                
                 }
            else {
                throw new ProgramException('A token isn\'t numeric or a range.');            
            }            
        }
    
        return lineNumbers;
    }    
    
    let assign = () => {
        let divTags = document.querySelectorAll('div');
        for (let i =0; i <divTags.length; i++) {
            let lineNumbersString = divTags[i].getAttribute('data-lines');
            if (lineNumbersString) {
                // This assumes there is an array of linei numbers. 
                let lineNumbers = parseLines(lineNumbersString);
                let olTag = divTags[i].nextElementSibling.firstElementChild;
                let liTags = olTag.children;
                if (liTags && liTags.length > 0) {
                    for (let j = 0; j < lineNumbers.length; j++) {
                        liTags[lineNumbers[j]].className = 'highlight-code';
                    }
                }                    
            }                
        }       
    }
    return {
        assign: assign
    }

})();

rp.lib.documentReady(function() {  
    rp.showPostPage.assignCopyCodeToClipboardEventHandler('.copy-to-clipboard');
    
    var search = rp.general.getParameterByName('s');
    if (search) {
        if (search == '[pronouns]') {
            search = ['I', 'me', 'my', 'mine', "I'm", "I'll"];
        }
        else {
            search = [search, search +"'s", "." + search];
        }        
        document.getElementById('toggle-highlights').style.display = "inline";    
        var instance = new Mark(document.querySelector("div.show-full-post"));
        instance.mark(search, {
            "ignorePunctuation": ["'","."],
            "accuracy": "exactly",
            "className": "search-term"
        });
    }

    rp.codehighlight.assign();
});
