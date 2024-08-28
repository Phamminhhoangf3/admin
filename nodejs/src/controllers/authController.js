import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { authService } from '../services/authService.js';
import { responseHandlingMiddleware } from '../middlewares/responseHandlingMiddleware.js';
import { env } from '../config/environment.js';

const register = async (req, res, next) => {
  try {
    const { password, username } = req.body;
    const accountExists = await authService.findAccount(username);
    if (accountExists) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ statusCode: StatusCodes.BAD_REQUEST, message: 'Tài khoản đã tồn tại!' });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const account = await authService.register({ ...req.body, password: hash });
      responseHandlingMiddleware(res, account);
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const account = await authService.findAccount(username);
    if (!account) {
      res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Đăng nhập không thành công!'
      });
    } else {
      bcrypt.compare(password, account.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            {
              _id: account._id,
              username
            },
            env.JWT_SECRET,
            {
              expiresIn: maxAge
            }
          );
          res.cookie('token', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            secure: true
          });
          res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            message: 'Đăng nhập thành công!',
            data: { username: account.username }
          });
        } else {
          res.status(StatusCodes.BAD_REQUEST).json({
            statusCode: StatusCodes.BAD_REQUEST,
            message: 'Mật khẩu không chính xác!'
          });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

export const authController = {
  register,
  login
};
