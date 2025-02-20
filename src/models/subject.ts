import {ObjectId, Schema, model} from 'mongoose';

export interface ISubject {
  _id: ObjectId;
  name: string;
  description: string;
  teacher: string;
  difficulty: string;
}

const subjectSchema = new Schema<ISubject>({
  name: {type: String, required: true},
  description: {type: String, required: true},
  teacher: {type: String, required: true},
  difficulty: {type: String, required: true},
});

export const SubjectModel = model("Subject", subjectSchema);