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
exports.UserService = void 0;
const user_1 = require("../models/user");
class UserService {
    postUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_1.UserModel(user);
            return yield newUser.save();
        });
    }
    getAllUsers(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalUsers = yield user_1.UserModel.countDocuments({ available: true });
            const users = yield user_1.UserModel.find({ available: true }).skip(skip).limit(limit);
            return {
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
                data: users,
            };
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.UserModel.findOne({ _id: id, available: true });
        });
    }
    updateUserById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.UserModel.findOneAndUpdate({ _id: id, available: true }, user, { new: true });
        });
    }
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.UserModel.findByIdAndDelete(id);
        });
    }
    deactivateUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.UserModel.findByIdAndUpdate(id, { available: false }, { new: true });
        });
    }
}
exports.UserService = UserService;
exports.default = new UserService();
