import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields;
        
        //validation
        switch(true){
            case !name:
                return res.status(400).json({ message: "Name is required" });
            case !description:
                return res.status(400).json({ message: "Description is required" });
            case !price:
                return res.status(400).json({ message: "Price is required" });
            case !category:
                return res.status(400).json({ message: "Category is required" });
            case !quantity:
                return res.status(400).json({ message: "Quantity is required" });
            case !brand:
                return res.status(400).json({ message: "Brand is required" });
        }

        const product = new Product({...req.fields});
        await product.save();
        res.status(201).json(product);
        
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

export { addProduct };
