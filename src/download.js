var zip = require('./zip');
var saveAs = require('./filesaver');

function str2bytes (str) {
    var bytes = new Uint8Array(str.length);
    for (var i=0; i<str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

module.exports = function(gj, options) {
    var content = zip(gj, options);
//     var blob = new Blob([str2bytes(content)], {type: 'application/zip'});
//     location.href = 'data:application/zip;base64,' + content;
//     var blob = new Blob([atob(content)], {type: 'application/zip'});
    
    var blob = b64toBlob(content,'application/zip');
    saveAs(blob,'b64.zip');
    
//     saveAs(btoa(content),"hello.zip");
};
