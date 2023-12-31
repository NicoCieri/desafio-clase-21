import { createHash, isValidPassword } from "../../utils.js";
import { UserModel } from "./models/user.model.js";

export default class UserDao {
  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.getByEmail(email);
      console.log("existUser", existUser);
      if (!existUser) {
        const isAdmin = email === "admin@coder.com" && password === "admin1234";
        return await UserModel.create({
          ...user,
          role: isAdmin ? "admin" : "user",
          password: createHash(password),
        });
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if (!userExist) return false;
      return isValidPassword(password, userExist) ? userExist : false;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const userExists = await UserModel.findById(id);
      return userExists ?? false;
    } catch (error) {
      console.log(error);
    }
  }

  async getByEmail(email) {
    try {
      const userExists = await UserModel.findOne({ email });
      return userExists ?? false;
    } catch (error) {
      console.log(error);
    }
  }
}
