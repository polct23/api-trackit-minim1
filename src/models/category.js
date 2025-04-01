"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true }, // Tipo string
    description: { type: String, required: true }, // Tipo string
    isActive: { type: Boolean, default: true }, // Tipo boolean
    priority: { type: Number, required: true, min: 0 }, // Tipo integer
});
exports.CategoryModel = (0, mongoose_1.model)("Category", categorySchema);
