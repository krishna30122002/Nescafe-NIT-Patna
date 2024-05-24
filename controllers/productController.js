import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import dotenv from 'dotenv'
import orderModel from "../models/orderModel.js";

dotenv.config();

// payment
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity } =
            req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name isrequired" });
            case !description:
                return res
                    .status(500)
                    .send({ error: "description is requires" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category isrequired" });
            case !quantity:
                return res.status(500).send({ error: "Qquantity is required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({
                    error: "Photo is required and should be less than 1024 MBs",
                });
        }

        // important
        const products = new productModel({
            ...req.fields,
            slug: slugify(name),
        });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating products",
        });
    }
};

export const getProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalCnt: products.length,
            message: "Product fetched successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting products",
        });
    }
};

export const getSingleProductController = async (req, res) => {
    try {
        const products = await productModel
            .findOne({ slug: req.params.slug })
            .populate("category")
            .select("-photo");
        res.status(200).send({
            success: true,
            message: "Product fetched successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single products",
        });
    }
};

export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel
            .findById(req.params.pid)
            .select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting product photo",
        });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting product",
        });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name isrequired" });
            case !description:
                return res
                    .status(500)
                    .send({ error: "description is requires" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category isrequired" });
            case !quantity:
                return res.status(500).send({ error: "Qquantity is required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({
                    error: "Photo is required and should be less than 1024 MBs",
                });
        }

        // important
        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            {
                ...req.fields,
                slug: slugify(name),
            },
            { new: true }
        );

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating products",
        });
    }
};

export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) {
            args.category = checked;
        }
        if (radio.length) {
            args.prices = { $gte: radio[0], $lte: radio[1] };
        }
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error while applying filters",
        });
    }
};

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error while counting products",
        });
    }
};

export const productListController = async (req, res) => {
    try {
        const perPage = 8;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error in pagination",
        });
    }
};

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const result = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error in search product api",
        });
    }
};

export const similarProductsController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(4)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error in getting similar products",
        });
    }
};

export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel
            .find({ category })
            .populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting products",
        });
    }
};

//payment api

export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((i) => {total += i.price});
        let newTransaction=gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        },
        function(error,result){
            if(result){
                const order=new orderModel({
                    products:cart,
                    payment:result,
                    buyer:req.user._id
                }).save();
                res.json({ok:true})
            }else{
                res.status(500).send(error)
            }
        }
    )
    } catch (error) {
        console.log(error);
    }
};
