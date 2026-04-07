import * as authService from "../services/auth.service.js";
import { success } from "../utils/response.js";

export const register = async (req, res, next) => {
  try {
    console.log('📥 Datos recibidos en register:', req.body);
    const { email, password, nombre } = req.body;
    
    if (!email || !password || !nombre) {
      const error = new Error('Faltan campos requeridos: nombre, email y password son obligatorios');
      error.status = 400;
      throw error;
    }

    const user = await authService.register(req.body);
    return success(res, user, 201);
  } catch (error) {
    console.error('❌ ERROR REGISTER:', error.message);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    console.log('🔑 Intento de login para:', req.body.email);
    const data = await authService.login(req.body);
    return success(res, data);
  } catch (error) {
    console.error('❌ ERROR LOGIN:', error.message);
    next(error);
  }
};
