const express = require('express');

const router = express.Router();
const {getLogin, postLogin, getDasboard,logout} = require('./auth.controller');
const {getAllApplications, getApplication,acceptApplication,rejectApplication} = require('./application.controller');
const {ensureAuthenticated, forwardAuthenticated} = require('../middleware/admin.auth');


router.get('/login',forwardAuthenticated,getLogin);
router.post('/login',forwardAuthenticated,postLogin);
//router.get('/dashboard',ensureAuthenticated,getDasboard);
router.get('/dashboard',ensureAuthenticated,getDasboard);
router.get('/applications',ensureAuthenticated,getAllApplications);
router.get('/application-details/:id',ensureAuthenticated,getApplication);
router.get('/application-accept/:id',ensureAuthenticated,acceptApplication);
router.get('/application-reject/:id',ensureAuthenticated,rejectApplication);
router.get('/logout',logout);

module.exports = router;