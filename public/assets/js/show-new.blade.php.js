var rp = rp || {};

rp.general = (function () {
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

    return {
        copyTextToClipboard: copyTextToClipboard,
        fadeOutHtmlElement: fadeOutHtmlElement
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

rp.showPostPage.assignCopyCodeToClipboardEventHandler('.copy-to-clipboard');






















// var snippets = document.querySelectorAll('pre');
// for (var i = 0; i < snippets.length; i++) {
//     //snippets[i].insertAdjacentHTML('beforebegin', '<a class="copy-code-button" href="#"><i class="fa fa-clipboard"></i></a>');
//     //snippets[i].insertAdjacentHTML('beforebegin', '<a class="copy-code-button" href="#">copy</a>');
// }

// var snippets = document.querySelectorAll('.copy-to-clipboard');
// for (var i = 0; i < snippets.length; i++) {
//     let code = [];
//     snippets[i].addEventListener('click', function (e) {
//         e.preventDefault();
//         let content = this.parentNode.previousSibling.previousSibling.firstChild.childNodes;//.innerText;
//         for (var i = 0; i < content.length; i++) {
//             code.push(content[i].innerText);
//         }            
//         let allLines = code.join('\n');
        
//         alert(allLines);
//         code = [];            
//     });
// }
