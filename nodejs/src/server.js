/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import exitHook from 'async-exit-hook';
import { APIs_V1 } from './routes/v1';
import { CLOSE_DB, CONNECT_DB } from './config/mongodb';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
import { env } from './config/environment';
import { corsOptions } from './config/cors';

const START_SERVER = () => {
  const app = express();

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use('/v1', APIs_V1);

  app.get('/', (req, res) => res.send('Express on Vercel'));

  app.use(errorHandlingMiddleware);

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
