const User = require('../models/user/user');
const moment = require('moment');

exports.getAllApplications = async (req,res) => {
    try {
        const users = await User.find({isApprove: null, isSubmit : true}).lean();
        res.render('admin/applications',{'users':users,'moment': moment});
    } catch (err) {
        console.log(err);
    }
};

exports.getApplication = async (req,res) => {
    try {
         const user = await User.findOne({_id : req.params.id}).lean();
         res.render('admin/application-detail',{user, 'moment': moment});
        
    } catch (err) {
        console.log(err);
    }
};


exports.acceptApplication = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{isApprove : true});
        return res.redirect("/admin/applications");
        
    } catch (err) {
        console.log(err);
    }
};


exports.rejectApplication = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{isApprove : false});
        return res.redirect("/admin/applications");
        
    } catch (err) {
        console.log(err);
    }
};





