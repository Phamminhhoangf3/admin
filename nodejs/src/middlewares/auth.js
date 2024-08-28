import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';
import { StatusCodes } from 'http-status-codes';

export const userAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          statusCodes: StatusCodes.UNAUTHORIZED,
          message: 'Not Authorized'
        });
      }
      // else if (decodedToken.role !== 'basic') {
      //   return res.status(StatusCodes.UNAUTHORIZED).json({
      //     statusCodes: StatusCodes.UNAUTHORIZED,
      //     message: 'Not Authorized'
      //   });
      // }
      else {
        next();
      }
    });
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCodes: StatusCodes.UNAUTHORIZED,
      message: 'Not authorized, token not available'
    });
  }
};
