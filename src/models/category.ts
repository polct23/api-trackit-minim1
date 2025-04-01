import { ObjectId, Schema, model } from 'mongoose';

export interface ICategory {
  _id: ObjectId;
  name: string; 
  description: string; 
  isActive: boolean; 
  priority: number; 
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true }, // Tipo string
  description: { type: String, required: true }, // Tipo string
  isActive: { type: Boolean, default: true }, // Tipo boolean
  priority: { type: Number, required: true, min: 0 }, // Tipo integer
});

export const CategoryModel = model("Category", categorySchema);