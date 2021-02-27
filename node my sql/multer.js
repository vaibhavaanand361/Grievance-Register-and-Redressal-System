module.exports = () => {
    const multer = require("multer");
    const path= require('path');
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './uploads');
        },
        filename(req, file, cb) {
            file.filename = Date.now() + file.originalname;
            cb(null, `${file.filename}`);
        }
    });

   
    const uploadImg = multer({
        storage: storage ,
        limits:{fileSize:4000000}
    });
    
    

    return uploadImg;
};