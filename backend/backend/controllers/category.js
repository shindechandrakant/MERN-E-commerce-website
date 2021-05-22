const Category = require("../models/category")



exports.getCategoryById = (req, res, next, categoryId) => {

    Category.findById(categoryId).exec( (err, category) => {

        if(err) {
            return res.status(400).json({
                msg : "Category not found!",
                error : err
            });
        }

        req.category = category

    });

    next();
}


exports.createCategory = (req, res) => {

    const category = new Category(req.body);
    category.save((err, category) => {

        if(err) {
            return res.status(400).json({
                msg : "Unable to save category in DB!",
                error : err
            });
        }
        res.status(200).json({ category });
    });
}


exports.getCategory = (req, res) => {

    return res.json(req.category)
}

exports.getAllCategory = (req, res) => {

    Category.find().exec((err, categories) => {

        if(err) {
            return res.status(400).json({
                msg : "Categories not found!",
                error : err
            });
        }
        res.json(categories)
    });
}

exports.updateCategory = (req, res) => {

    const category = req.category;
    category.name = req.body.name;

    category.save( (err, category) => {

        if(err) {
            return res.status(400).json({
                msg : "Unable to update category!",
                error : err
            });
        }

        res.status(200).json(category);
    });
}



exports.removeCategory = (req, res) => {

    const category = req.category;

    category.remove( (err, category) => {

        if(err) {
            return res.status(400).json({
                msg : "Unable to remove category!",
                error : err
            });
        }

        res.json({
            msg : "Successfully Deleted",
            category : category
        })

    });



}






