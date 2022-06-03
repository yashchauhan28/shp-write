var zip = require('./zip');
var saveAs = require('./filesaver');

function str2bytes (str) {
    var bytes = new Uint8Array(str.length);
    for (var i=0; i<str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}

module.exports = function(gj, options) {
    var content = zip(gj, options);
//     var blob = new Blob([str2bytes(content)], {type: 'application/zip'});
//     location.href = 'data:application/zip;base64,' + content;
    var blob = new Blob([atob(content)], {type: 'application/zip'});
    saveAs(blob,"hello.zip");
//     saveAs(btoa(content),"hello.zip");
};
