var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/user/user';
import ApiError from '../exceptions/api-error';
class UserController {
    static getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.find();
                return res.status(200).json(users);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, about, avatar } = req.body;
                if (!name || !about || !avatar) {
                    throw ApiError.BadRequest('fill in all fields');
                }
                const candidate = yield User.create({
                    name,
                    about,
                    avatar,
                });
                return res.json(candidate);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const candidate = yield User.findById(id);
                if (!candidate) {
                    throw ApiError.BadRequest('user not exists');
                }
                return res.status(200).json(candidate);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.user;
                const { name, about } = req.body;
                const candidate = yield User.findById(_id);
                if (!candidate) {
                    throw ApiError.BadRequest('user not exists');
                }
                const updateCandidateProfile = yield User.findByIdAndUpdate(_id, {
                    name,
                    about,
                }, { new: true });
                return res.status(200).json({ updateCandidateProfile });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static updateAvatarProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.user;
                const { avatar } = req.body;
                const candidate = yield User.findById(_id);
                if (!candidate) {
                    throw ApiError.BadRequest('user not exists');
                }
                if (!avatar) {
                    throw ApiError.BadRequest('avatar field is required');
                }
                const updateCandidateProfile = yield User.findByIdAndUpdate(_id, { avatar }, { new: true });
                return res.status(200).json({ updateCandidateProfile });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
export default UserController;
