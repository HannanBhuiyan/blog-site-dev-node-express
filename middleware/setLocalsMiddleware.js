module.exports = () => {
     return (req, res, next) => {
          res.locals.user = req.user
          res.locals.isLoggedIn = req.session.isLoggedIn
          res.locals.toastr = req.toastr.render()
          next()
     }
}