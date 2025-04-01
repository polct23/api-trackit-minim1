"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const router = (0, express_1.Router)();
router.post('/', category_controller_1.createCategory); // Crear una nueva categoría
router.get('/', category_controller_1.getAllCategories); // Obtener todas las categorías
router.get('/:id', category_controller_1.getCategoryById); // Obtener una categoría por ID
router.put('/:id', category_controller_1.updateCategoryById); // Actualizar una categoría por ID
router.delete('/:id', category_controller_1.deleteCategoryById); // Eliminar una categoría por ID
exports.default = router;
