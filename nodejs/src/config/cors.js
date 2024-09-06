import { env } from '../config/environment.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { WHITELIST_DOMAINS } from '../utils/constants.js';

export const corsOptions = {
  origin: function (origin, callback) {
    if (env.BUILD_MODE === 'dev') {
      return callback(null, true);
    }
    if (!origin || WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(
      new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`)
    );
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true
};
