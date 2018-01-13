var rp = rp || {};

rp.lib = (function() {
    const getFormHash = (targetId) => {
        let form = document.getElementById(targetId);
        let formData = new FormData(form);

        // Update formData with most recent 'abstract' and 'body' buffers
        // before they are collected.
        formData.set('abstract', rp.abstractMarkdownEditor.getCurrentAbstract());
        formData.set('body', rp.bodyMarkdownEditor.getCurrentBody());

        // Collect all of formData's values.
        let inputsValues = [];
        for(let [key, value] of formData.entries()) {
            inputsValues.push(value);
        }
        //  Do this if you'd rather store a hash than the full value
        //  of form data. 
        //  const shaObj = new jsSHA("SHA-256", "TEXT");
        //  shaObj.update(inputsValues.join(''))
        //  return = shaObj.getHash("HEX");     

        return inputsValues.join('');         
    }         

    var postJSONFileUpload = function(url, callback) {
        var form = document.getElementById('form-upload-image');
        var formData = new FormData(form);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        xhr.onload = function() {        
            var status = xhr.status;
            
            if (status == 200) {
                callback(xhr.response);
            } else {
                callback(status);
            }
        };

        xhr.send(formData);        
    }

    // Same declaration as below.
    //async function getJson2(url) {

    const getJson2 = async (url) => {
        let response = await fetch(url, {
            method: "GET"                
        });
        return await response.json();
    }

    // Also works. GET seems to be the default. 
    // const getJson2 = async (url) => {
    //     let response = await fetch(url);
    //     return await response.json();
    // }
    

    var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        
        xhr.onload = function() {        
            var status = xhr.status;
            
            if (status == 200) {
                callback(xhr.response);
            } else {
                callback(status);
            }
        };
        
        xhr.send();
    };

    var submitJSON = function(options) {
        let method = options.method || 'POST';
        xhr = new XMLHttpRequest();
        xhr.open(method, options.url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () { 
            if (xhr.readyState == 4 && xhr.status == 200) {
                    var t = xhr.responseText;
                    var json = JSON.parse(xhr.responseText);
                    options.callback(json);
                }
            }
        xhr.send(JSON.stringify(options.data));        
   }

   var getFileNameParts = function(filename) {
        let result = {"name" : null, "extension" : null};
        let m;
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
        getFileNameParts: getFileNameParts,
        getFileNameFromPath: getFileNameFromPath,
        getJulianDate: getJulianDate,
        getUniqueIdentifier: getUniqueIdentifier,
        getJSON: getJSON,
        getJson2: getJson2,
        submitJSON: submitJSON,
        postJSONFileUpload: postJSONFileUpload,
        copyTextToClipboard: copyTextToClipboard,
        fadeOutHtmlElement: fadeOutHtmlElement,
        getFormHash: getFormHash
    }
})();
