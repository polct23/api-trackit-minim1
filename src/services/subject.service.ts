import {ISubject, SubjectModel} from '../models/subject';

export class SubjectService {
    async postSubject(subject: Partial<ISubject>): Promise<ISubject> {
        const newSubject = new SubjectModel(subject);
        return newSubject.save();
    }

    async getAllSubjects(): Promise<ISubject[]> {
        return SubjectModel.find();
    }

    async getSubjectById(id: string): Promise<ISubject | null>{
        return SubjectModel.findById(id);
    }

    async updateSubjectById(id: string, subject: ISubject): Promise<ISubject | null> {
        return SubjectModel.findByIdAndUpdate(id, subject, {new: true});
    }

    async deleteSubjectById(id: string): Promise<ISubject | null> {
        return SubjectModel.findByIdAndDelete(id);
    }
}