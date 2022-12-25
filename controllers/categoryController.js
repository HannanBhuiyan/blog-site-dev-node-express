const Category = require('../models/CategoryModel')


exports.categoryListController = (req, res) => {
     res.render('../views/dashboard/category/list-category.ejs', {title: "List Category"})
}


exports.categoryCreateGetController = (req, res) => {
     res.render('../views/dashboard/category/create-category.ejs', {title: "Create Category"})
}

exports.categoryCreatePostController = (req, res) => {

}

