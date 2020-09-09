const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//Passport Config
require('./src/modules/config/passport')(passport);

const path = require('path');
const adminRoutes = require('./src/modules/admin/admin.routes');
const userRoutes = require('./src/modules/user/user.routes');

//DB Config
const db = require('./src/modules/config').mongoURI;

//Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${db}`);
  });

// app.use(function(req, res, next) {
//     res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//     next();
// });
  


//EJS
//app.use(expressLayouts);
app.set('views', path.join(__dirname, '/src/modules/views'));
app.set('view engine', 'ejs');
app.use(express.static('./src/modules/public'));

//BodyParser
app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(session({
    secret: "secret",
    name: 'name',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session({
    secret: 'secret',
    name: 'name',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

//Connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.admin = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

const PORT = process.env.PORT || 5000;

app.use('/admin',adminRoutes);
app.use(userRoutes);
// var as = 'admin';
// bcrypt.genSalt(10, (err, salt) =>
//  bcrypt.hash(as,salt, (err,hash) =>{
//     if(err) throw err; 
//     console.log(hash);
//  }))


app.listen(PORT, console.log(`Server Started On Port ${PORT}`));