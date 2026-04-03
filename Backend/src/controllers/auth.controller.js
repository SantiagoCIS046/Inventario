import * as authService from "../services/auth.service.js";
import { success } from "../utils/response.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    return success(res, user, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    return success(res, data);
  } catch (error) {
    next(error);
  }
};
