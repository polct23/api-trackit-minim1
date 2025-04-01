import { ICategory, CategoryModel } from '../models/category';

export class CategoryService {
    async createCategory(category: Partial<ICategory>): Promise<ICategory> {
        const newCategory = new CategoryModel(category);
        return await newCategory.save();
    }

    async getAllCategories(page: number, limit: number): Promise<{ 
        totalCategories: number; 
        totalPages: number; 
        currentPage: number; 
        data: ICategory[]; 
    }> {
        const skip = (page - 1) * limit;
        const totalCategories = await CategoryModel.countDocuments();
        const categories = await CategoryModel.find().skip(skip).limit(limit);

        return {
            totalCategories,
            totalPages: Math.ceil(totalCategories / limit),
            currentPage: page,
            data: categories,
        };
    }

    async getCategoryById(id: string): Promise<ICategory | null> {
        return await CategoryModel.findById(id);
    }

    async updateCategoryById(id: string, category: Partial<ICategory>): Promise<ICategory | null> {
        return await CategoryModel.findByIdAndUpdate(id, category, { new: true });
    }

    async deleteCategoryById(id: string): Promise<ICategory | null> {
        return await CategoryModel.findByIdAndDelete(id);
    }
}

export default new CategoryService();