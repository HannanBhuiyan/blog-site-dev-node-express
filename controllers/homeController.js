const Flash = require('../utils/Flash')

exports.getHomeController = (req, res) => {
     res.render('./frontend/pages/index.ejs', 
     {
          title: 'Home', 
          flashMessage: Flash.getMessage(req)
     })
}