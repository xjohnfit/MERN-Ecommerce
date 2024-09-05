import categoryModel from '../models/categoryModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Name is required' });

        const existingCategory = await categoryModel.findOne({ name });

        if (existingCategory)
            return res.status(400).json({ message: 'Category already exists' });

        const category = await categoryModel.create({ name });
        res.json(category);
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await categoryModel.findOne({ _id: categoryId });        

        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const removedCategory = await categoryModel.findByIdAndDelete(
            req.params.categoryId
        );
        res.json(removedCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const listCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.json(categories);
    } catch (error) {
        console.error(error);
        return res.status(400).json(error.message);
    }
});

const readCategory = asyncHandler(async (req, res) => {
    try {
        const category = await categoryModel.findOne({_id: req.params.id});
        res.json(category);
    } catch (error) {
        console.error(error);
        return res.status(400).json(error.message);
        
    }
});


export { createCategory, updateCategory, deleteCategory, listCategories, readCategory };
