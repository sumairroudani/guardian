const express = require('express');

const router = express.Router();
const {getLogin, postLogin, getRegister, postRegister, getRegisterDetail, postRegisterDetail} = require('./auth.controller');
const multer = require('multer'); 

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./src/modules/public/users/images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({
            storage
        });


router.get('/login',getLogin);
router.post('/login',postLogin);
router.get('/register',getRegister);
router.post('/register',postRegister);
router.get('/register-detail',getRegisterDetail);
router.post('/register-detail',upload.single('photo'),postRegisterDetail);


module.exports = router;