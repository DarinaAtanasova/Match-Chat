const path = require('path');

function checkFileType(file, callback) {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if(extName && mimeType) {
        return callback(null, true);
    }
    else {
        callback("Error: Images only");
    }
}

module.exports = checkFileType;