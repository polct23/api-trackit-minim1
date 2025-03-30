import { IUser, UserModel } from '../models/user';

export class UserService {
    async postUser(user: Partial<IUser>): Promise<IUser> {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async getAllUsers(page: number, limit: number): Promise<{ 
        totalUsers: number; 
        totalPages: number; 
        currentPage: number; 
        data: IUser[]; 
    }> {
        const skip = (page - 1) * limit;
    
        const totalUsers = await UserModel.countDocuments({ available: true });
    
        const users = await UserModel.find().skip(skip).limit(limit);
    
        return {
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            data: users,
        };
    }
    

    async getUserById(id: string): Promise<IUser | null> {
        return await UserModel.findOne({ _id: id, available: true });
    }

    async updateUserById(id: string, user: Partial<IUser>): Promise<IUser | null> {
        return await UserModel.findOneAndUpdate({ _id: id, available: true }, user, { new: true });
    }

    async deleteUserById(id: string): Promise<IUser | null> {
        return await UserModel.findByIdAndDelete(id);
    }

    async deactivateUserById(id: string): Promise<IUser | null> {
        return await UserModel.findByIdAndUpdate(id, { available: false }, { new: true });
    }
}

export default new UserService();
