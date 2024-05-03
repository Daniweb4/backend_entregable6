const { getAll, create,  remove } = require('../controllers/productimg.controller');
const express = require('express');
const upload = require('../utils/multer');

const routerProductimg = express.Router();

routerProductimg.route('/')
    .get(getAll)
    .post(upload.single('image'), create);

routerProductimg.route('/:id')
    
    .delete(remove)

module.exports = routerProductimg;