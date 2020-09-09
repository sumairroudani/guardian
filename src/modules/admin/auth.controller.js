const Admin = require('../models/admin/admin');
const User = require('../models/user/user');
const passport = require('passport');


exports.getLogin =  (req,res) => {
      res.render('admin/login');
};

exports.postLogin = (req, res, next) => {
    passport.authenticate('admin-local',{
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    }) (req, res, next); 
};

exports.getDasboard = async (req,res) => {
   const applicationCount = await User.find({isSubmit : true}).countDocuments();
   const applicationAcceptCount = await User.find({isApprove: true}).countDocuments();
   const applicationRejectCount = await User.find({isApprove: false}).countDocuments();
   const applicationPendingCount = await User.find({isApprove: null}).countDocuments();
    //$user = await User.findOne({_id : req.params.id}).lean();
    res.render('admin/dashboard',{
        'applicationCount': applicationCount,
        'applicationAcceptCount': applicationAcceptCount,
        'applicationRejectCount': applicationRejectCount,
        'applicationPendingCount': applicationPendingCount
    });
};

exports.logout = async (req,res) => {
    req.logout();
    res.redirect('/admin/login');
 };









