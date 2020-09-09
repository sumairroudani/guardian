module.exports = {
    ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/admin/login') // if not auth
    },
  
    forwardAuthenticated: (req, res, next) => {
      if (!req.isAuthenticated()) {
        return next()
      }
      res.redirect('/admin/dashboard');  // if auth    
    }
  }