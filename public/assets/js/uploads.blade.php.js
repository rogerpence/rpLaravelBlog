var rp = rp || {};

rp.uploads = (function() {

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

    var showImagesList = function(json) {
        let template = '<button title="{title}" class="button-{action}"><i class="fa fa-{icon}"></i></button>';
        let buttons = [];
        buttons.push(template.replace('{action}','copy').
                replace('{icon}','clipboard').
                replace('{title}', 'Copy filename to clipboard'));
        buttons.push(template.replace('{action}','edit').
                replace('{icon}','pencil').
                replace('{title}', 'Edit image'));
        buttons.push(template.replace('{action}','preview').
                replace('{icon}','picture-o').
                replace('{title}', 'Preview image'));

        let formatAsDateOnly = function(data, type) {
            if (type=='display') {
                return data.substr(0, 10);
            }
            else {
                return data;
            }
        };                

        $('#datatable').DataTable().destroy();        
        $('#datatable').DataTable({
            data: json,
            columns: [
                { data: 'name'},
                { data: 'description'},
                { data: 'created_at', 
                  render: function(data, type, row) {
                      return formatAsDateOnly(data, type);
                  }
                },
                { data: null, defaultContent: buttons.join('') }
            ]                
        });        
    }

    var getUploadedImages = function() {
        getJSON('/api/images', getUploadedImagesCallBack);
    }

    var getUploadedImagesCallBack = function(json) {
        console.log(json);
        showImagesList(json);
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

    return {
        getFileNameFromPath: getFileNameFromPath,
        getUniqueIdentifier: getUniqueIdentifier,
        getJulianDate: getJulianDate,
        getFileNameParts: getFileNameParts,
        getUploadedImages: getUploadedImages
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

    // Assign button event handlers when datatable is drawn.
    $('#datatable').DataTable().on('draw', function() {
        let table = $('#datatable').DataTable();

        let assignButtonEvent = function(selector) {
            let buttons = document.querySelectorAll(selector);            
            for (let i=0; i <buttons.length; i++) {
                buttons[i].addEventListener('click', function(e){
                    let button = this.className;
                    let tr = this.parentElement.parentElement;
                    var data = table.row($(tr)).data();
                });
            }    
        }            
        
        assignButtonEvent('.button-copy');
        assignButtonEvent('.button-edit');
        assignButtonEvent('.button-preview');
    });

    document.getElementById('test-button').addEventListener('click', function(e) {
        rp.uploads.getUploadedImages();
    })

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

    rp.uploads.getUploadedImages();
}        

rp.core.documentReady(documentReady);


// function showOpenOpportunitiesOnOpenOppsTab(json) {
//     summarizeOpenOpportunities(json.data);

//     var totalEstimatedRevenue = 0;
//      $('#open-table-data').DataTable().destroy();
//      $('#open-table-data').DataTable( {
//          //ajax: '/v1.0/opps/open/5?week=13&year=2016',
//          data: json.data,
//          columns: [
//              { data: 'Owner.owner', 'width': '12%'},
//              { data: 'Account', 'width': '28%'},
//              { data: 'EstimatedRevenue', 'width': '12%', 'className': 'align-right',
//                      'render': function( data, type, row ) {
//                           if (type=='display') {
//                               totalEstimatedRevenue += parseInt(data, 10);
//                               language = row.Owner.language;
//                               return rp.common.formatValueForOwner(data, language)
//                               //return numeral(data).format('0,0');
//                           }
//                           else {
//                               return data;
//                           }
//                      }
//              },
//              { data: 'Phase', 'width': '6%' },
//              // { data: 'Currency',  'width': '6%', 'className': "dt-left" },
//              { data: 'ProposedSolution' }
//          ],
//          "bAutoWidth": false
//      } );
//  }


