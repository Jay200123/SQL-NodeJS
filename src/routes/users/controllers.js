import { UserModel } from "./models.js";
import { StudentModel } from "../students/model.js";
import { SuccessHandler, ErrorHandler } from "../../utils/index.js";

export class UserController {
  static async getAllUsers(req, res, next) {
    const data = await UserModel.getAll();
    return SuccessHandler(res, "User Records Successfully Retrieved", data);
  }

  static async getOneUser(req, res, next) {
    const data = await UserModel.getById(req.params.id);
    return SuccessHandler(res, "User Record Successfully Retrieved", data);
  }

  static async createUser(req, res, next) {
    const user = await UserModel.getByName(req.body.name);

    if (user) {
      return next(new ErrorHandler("User Already Exists", 400));
    }

    const data = await UserModel.insert(req.body);

    if (data) {
      await StudentModel.insert(req.body);
    }
    return SuccessHandler(res, "User Record Successfully Created", data);
  }

  static async updateUser(req, res, next) {
    const data = await UserModel.updateById(req.params.id, req.body);
    return SuccessHandler(res, "User Record Successfully Updated", data);
  }

  static async deleteUser(req, res, next) {
    const data = await UserModel.deleteById(req.params.id);
    return SuccessHandler(res, "User Record Successfully Deleted", data);
  }
}
