import * as userService from "../services/user.service.js";
import { success } from "../utils/response.js";

export const getUsersController = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    success(res, users);
  } catch (error) {
    next(error);
  }
};

export const createUserController = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    success(res, user, 201);
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    success(res, user);
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    success(res, { message: "Usuario eliminado" });
  } catch (error) {
    next(error);
  }
};
