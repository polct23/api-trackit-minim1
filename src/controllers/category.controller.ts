import { Request, Response } from 'express';
import { ICategory } from '../models/category';
import CategoryService from '../services/category.service';

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: The category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Error creating category
 */
export async function createCategory(req: Request, res: Response): Promise<void> {
    try {
        const category = req.body as ICategory;
        const newCategory = await CategoryService.createCategory(category);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: "Error creating category", error });
    }
}


/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories with pagination
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of categories with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCategories:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       400:
 *         description: Error getting categories
 */
export async function getAllCategories(req: Request, res: Response): Promise<void> {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const categoriesPaginated = await CategoryService.getAllCategories(page, limit);
        res.status(200).json(categoriesPaginated);
    } catch (error) {
        res.status(400).json({ message: "Error getting categories", error });
    }
}
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: The category description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       400:
 *         description: Error getting category
 */
export async function getCategoryById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const category = await CategoryService.getCategoryById(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ message: "Error getting category", error });
    }
}

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The updated category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       400:
 *         description: Error updating category
 */
export async function updateCategoryById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const category = req.body as ICategory;
        const updatedCategory = await CategoryService.updateCategoryById(id, category);
        if (!updatedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: "Error updating category", error });
    }
}

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: The deleted category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       400:
 *         description: Error deleting category
 */
export async function deleteCategoryById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const deletedCategory = await CategoryService.deleteCategoryById(id);
        if (!deletedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(deletedCategory);
    } catch (error) {
        res.status(400).json({ message: "Error deleting category", error });
    }
}