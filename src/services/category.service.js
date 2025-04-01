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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_1 = require("../models/category");
class CategoryService {
    createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = new category_1.CategoryModel(category);
            return yield newCategory.save();
        });
    }
    getAllCategories(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalCategories = yield category_1.CategoryModel.countDocuments();
            const categories = yield category_1.CategoryModel.find().skip(skip).limit(limit);
            return {
                totalCategories,
                totalPages: Math.ceil(totalCategories / limit),
                currentPage: page,
                data: categories,
            };
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_1.CategoryModel.findById(id);
        });
    }
    updateCategoryById(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_1.CategoryModel.findByIdAndUpdate(id, category, { new: true });
        });
    }
    deleteCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_1.CategoryModel.findByIdAndDelete(id);
        });
    }
}
exports.CategoryService = CategoryService;
exports.default = new CategoryService();
