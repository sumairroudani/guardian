const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load Model
const Admin = require('../models/admin/admin');
const User = require('../models/user/user');


module.exports =  function(passport){
    passport.use(
            'admin-local' , new LocalStrategy({ 
              usernameField: 'email',
              passwordField: 'password'  }, (email,password, done) => {
                // Match Admin
                Admin.findOne({ email : email })
               .then(admin => {
                if(!admin){
                  
                  return done(null, false, {
                      message: 'That Email is Not Registered'
                  });
                }
                
                 bcrypt.compare(password,admin.password,(err, isMatch) =>{

                if(isMatch){
                  return done(null,admin);
                }else{
                  return done(null,false, {
                      message: 'Password Incorrect'
                  });
                }

               });
                

               }).catch(err => console.log(err));
               
            })
        );
          passport.use(
                  'user-local' , new LocalStrategy({ 
                    usernameField: 'email',
                    passwordField: 'password'  }, (email,password, done) => {
                      // Match Admin
                      User.findOne({ email : email })
                     .then(user => {
                      if(!user){
                        
                        return done(null, false, {
                            message: 'That Email is Not Registered'
                        });
                      }
                      
                       bcrypt.compare(password,user.password,(err, isMatch) =>{
      
                      if(isMatch){
                        return done(null,user);
                      }else{
                        return done(null,false, {
                            message: 'Password Incorrect'
                        });
                      }
      
                     });
                      
      
                     }).catch(err => console.log(err));
                     
                  })
              );      
                
        passport.serializeUser((admin, done) => {
            done(null, admin.id);
          });
          
          passport.deserializeUser((id, done) => {
            Admin.findById(id, (err, admin) => {
              done(err, admin);
            });
          });
        }