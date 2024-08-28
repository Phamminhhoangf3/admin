/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import exitHook from 'async-exit-hook';
import cookieParser from 'cookie-parser';
import { APIs_V1 } from './routes/v1/index.js';
import { CLOSE_DB, CONNECT_DB } from './config/mongodb.js';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js';
import { env } from './config/environment.js';
import { corsOptions } from './config/cors.js';

const START_SERVER = () => {
  const app = express();

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(errorHandlingMiddleware);

  app.use(cookieParser());

  app.use('/v1', APIs_V1);

  app.get('/', (req, res) => res.send('Wellcome to api admin!'));

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Production port:${process.env.PORT}`);
    });
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`Local dev: ${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`);
    });
  }

  exitHook(() => {
    CLOSE_DB();
    console.log('exit done!');
  });
};

(async () => {
  try {
    await CONNECT_DB();
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
