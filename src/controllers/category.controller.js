"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = createCategory;
exports.getAllCategories = getAllCategories;
exports.getCategoryById = getCategoryById;
exports.updateCategoryById = updateCategoryById;
exports.deleteCategoryById = deleteCategoryById;
const category_service_1 = __importDefault(require("../services/category.service"));
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
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = req.body;
            const newCategory = yield category_service_1.default.createCategory(category);
            res.status(201).json(newCategory);
        }
        catch (error) {
            res.status(400).json({ message: "Error creating category", error });
        }
    });
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
function getAllCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const categoriesPaginated = yield category_service_1.default.getAllCategories(page, limit);
            res.status(200).json(categoriesPaginated);
        }
        catch (error) {
            res.status(400).json({ message: "Error getting categories", error });
        }
    });
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
function getCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const category = yield category_service_1.default.getCategoryById(id);
            if (!category) {
                res.status(404).json({ message: "Category not found" });
                return;
            }
            res.status(200).json(category);
        }
        catch (error) {
            res.status(400).json({ message: "Error getting category", error });
        }
    });
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
function updateCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const category = req.body;
            const updatedCategory = yield category_service_1.default.updateCategoryById(id, category);
            if (!updatedCategory) {
                res.status(404).json({ message: "Category not found" });
                return;
            }
            res.status(200).json(updatedCategory);
        }
        catch (error) {
            res.status(400).json({ message: "Error updating category", error });
        }
    });
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
function deleteCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const deletedCategory = yield category_service_1.default.deleteCategoryById(id);
            if (!deletedCategory) {
                res.status(404).json({ message: "Category not found" });
                return;
            }
            res.status(200).json(deletedCategory);
        }
        catch (error) {
            res.status(400).json({ message: "Error deleting category", error });
        }
    });
}
