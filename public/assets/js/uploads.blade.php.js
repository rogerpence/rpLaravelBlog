var rp = rp || {};

rp.uploads = (function() {
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
    
    function getFileNameFromPath(path) {
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

    return {
        getFileNameFromPath: getFileNameFromPath,
        getUniqueIdentifier: getUniqueIdentifier,
        getJulianDate: getJulianDate,
        getFileNameParts: getFileNameParts
    };
})();

rp.uploadImageModal = (function () {
    function configure() {
        var modal = new tingle.modal({
            footer: true,
            stickyFooter: false,
            closeMethods: ['escape'],
            closeLabel: "Close",
            cssClass: ['custom-class-1', 'custom-class-2'],
            onOpen: function () {
                document.getElementById('file-upload').value = '';
                document.getElementById('image-name').value = '';
            },
            onClose: function () {
                //console.log('modal closed');
            },
            beforeClose: function () {
                return true; // close the modal
                //return false; // nothing happens
            }
        });

        // Load modal content from innerHTML of a given element id.            
        modal.setContent(document.getElementById('upload-container').innerHTML);

        document.getElementById('show-upload-window').addEventListener('click', (e) => {
            e.preventDefault();
            modal.open()
        });

        document.getElementById('cancel-button').addEventListener('click', (e) => {
            e.preventDefault();
            modal.close()
        });        
    }

    return {
        configure: configure
    }
})();


function documentReady() {

    rp.uploadImageModal.configure();

    document.getElementById('file-upload').addEventListener('blur', function (e) {
        let fullFileName = this.value;
        if (fullFileName != '') {
            fileName = rp.uploads.getFileNameFromPath(fullFileName);
            let fileNameParts = rp.uploads.getFileNameParts(fileName);

            let newFileName = fileNameParts.name + '.' + 
                            rp.uploads.getUniqueIdentifier() + '.' + 
                            fileNameParts.extension;

            //document.getElementById('file-upload-target-name').innerText = 'File will be uploaded as: ' + newFileName;
            document.getElementById('image-name').value = newFileName;
            document.getElementById("submit-button").disabled = false;
        }
        else {
            document.getElementById('image-name').value = '';
            document.getElementById("submit-button").disabled = true;
        }           
    });                
}        

rp.core.documentReady(documentReady);


