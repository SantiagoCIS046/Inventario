import * as authService from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
