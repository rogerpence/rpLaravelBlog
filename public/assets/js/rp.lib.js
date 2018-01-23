var rp = rp || {};

rp.core = {}

rp.Core = class Core {
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
    
}

rp.lib = (function() {
    // function documentReady(fn) {
    //     if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    //         fn();
    //     } else {
    //         document.addEventListener('DOMContentLoaded', fn);
    //     }
    // };

//    var getFileNameParts = function(filename) {
//         let result = {"name" : null, "extension" : null};
//         let m;
//         let dot = /(\.)/g;
//         while ((match = dot.exec(filename)) != null) {
//             m = match;
//         }
//         if (typeof m == 'undefined') {
//             result.name = filename;
//         }
//         else {
//             result.name = filename.substr(0, m.index);
//             result.extension = filename.substr(m.index + 1);
//         }
//         return result;
//     }
    
    var getFileNameFromPath = function(path) {
        filename = path.replace(/^.*\\/, '');
        return filename;
    }

    var getJulianDate = function(date) {
        let julianDate = Math.floor((date / 86400000) - (date.getTimezoneOffset() / 1440) + 2440587.5);
        return julianDate;
    }        

    var getUniqueIdentifier = function() {
        var now = new Date(); //set any date
        var seconds = (now.getHours() * 60 * 60) + (now.getMinutes() * 60) + now.getSeconds();

        return getJulianDate(now) + '.' + seconds;
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
        getFileNameFromPath: getFileNameFromPath,
        getJulianDate: getJulianDate,
        getUniqueIdentifier: getUniqueIdentifier,
        copyTextToClipboard: copyTextToClipboard,
        fadeOutHtmlElement: fadeOutHtmlElement
    }
})();
