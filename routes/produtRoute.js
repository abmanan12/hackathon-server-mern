const express = require('express');

const router = express.Router();

const Product = require('../models/ProductModel');


// create new Product
router.post('/create-product', async (req, res) => {

    const { name, description, price, category, quantity, image, size, color } = req.body;

    if (!name || !description || !price || !category || !quantity || !image || !size || !color) {
        return res.status(422).json('Plz fill all fields properly')
    }

    try {

        const products = new Product(req.body);

        await products.save();

        res.status(200).send({
            success: true, products,
            message: "Product Created Successfully",
        });

    }
    catch (error) {
        res.status(500).send(error);
    }
})


// get all products
router.get('/getproducts', async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).send({
            success: true, message: "Products ",
            counTotal: products.length, products,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})


// delete single product
router.get('/deleteproduct/:id', async (req, res) => {

    const productId = req.params.id;

    try {

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(422).json('Product not found');
        }

        await Product.findByIdAndDelete(productId)

        res.status(200).send({
            message: "Product Deleted successfully",
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
})


// update single product
router.put('/updateproduct/:id', async (req, res) => {

    const productId = req.params.id;

    try {

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(422).json('Product not found');
        }

        const products = await Product.findByIdAndUpdate(productId, req.body, { new: true })

        res.status(200).send({
            products,
            message: "Product Updated successfully",
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
})



module.exports = router;