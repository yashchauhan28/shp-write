var zip = require('./zip');
var saveAs = require('./filesaver');

module.exports = function(gj, options) {
    var content = zip(gj, options);
    var blob = new Blob(content, {type: 'application/zip'});
    //location.href = 'data:application/zip;base64,' + content;
    saveAs(blob,"hello.zip");
};
