"use strict";

var rp = rp || {};

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

        let currentElement = element.parentNode.previousSibling;
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
        rp.Lib.fadeOutHtmlElement(msgElement);
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

                rp.Lib.copyTextToClipboard(allLines);

                showCopiedToClipboardMessage(this);
            });
        }
    }

    return {
        assignCopyCodeToClipboardEventHandler: assignCopyCodeToClipboardEventHandler
    };
})();

rp.Lib.documentReady(function() {  
    rp.showPostPage.assignCopyCodeToClipboardEventHandler('.copy-to-clipboard');    
});