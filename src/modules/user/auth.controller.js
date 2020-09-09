const bcrypt = require('bcryptjs');
const User = require('../models/user/user');
const passport = require('passport');



exports.getLogin =  (req,res) => {
      res.render('user/login');
};

exports.postLogin = (req, res, next) => {
    passport.authenticate('user-local',{
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }) (req, res, next); 
};

exports.getRegister =  (req,res) => {
    res.render('user/signup');
};

exports.postRegister = async (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const registrationType = req.body.registrationType;
    const productTrade = req.body.productTrade;
    const hearAbout = req.body.hearAbout;
    
    const user = await User.findOne({ email: email });
     
    if (user) {
        req.flash("error", "User already exists");
        return res.redirect("/register");
      }else{
        var newUser = new User({
        email: email,
        password: password,
        registrationType,
        productTrade,
        hearAbout,
        });
        await newUser.save();
        
        return res.render("user/register-detail",{id:newUser.id});
    }
};

exports.getRegisterDetail =  (req,res) => {
    res.render('user/register-detail',{id:''});
};
exports.postRegisterDetail = async (req,res) =>{
    
    try{
        req.body.photo = req.file.path;

        const user = await User.findByIdAndUpdate(req.body.id, req.body, {upsert: true});
        
        
      return res.redirect("/login");
    }
    catch(err){
        console.log(err);
    }
};


