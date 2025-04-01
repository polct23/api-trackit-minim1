import { Router } from 'express';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} from '../controllers/category.controller';

const router = Router();

router.post('/', createCategory); // Crear una nueva categoría
router.get('/', getAllCategories); // Obtener todas las categorías
router.get('/:id', getCategoryById); // Obtener una categoría por ID
router.put('/:id', updateCategoryById); // Actualizar una categoría por ID
router.delete('/:id', deleteCategoryById); // Eliminar una categoría por ID

export default router;