import express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from  'body-parser';
import { createConnection } from 'typeorm';
import AppRoutes from './routes';
import getConf from './utils/getORMConf';

(async () => {
  try {
    /**
     * Init DB
     */
    const conf = await getConf();
    const conn = await createConnection({
      name: 'InitDB',
      type: conf.type,
      host: conf.host,
      port: conf.port,
      username: conf.username,
      password: conf.password,
    });
    const queryRunner = await conn.createQueryRunner();
    await queryRunner.createDatabase(conf.database, true);
    await conn.close();

    await createConnection();
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register all application routes
    AppRoutes.forEach(route => {
      (app as any)[route.method](route.path, (request: Request, response: Response, next: Function) => {
        route.action(request, response)
          .then(() => next)
          .catch(err => next(err));
      });
    });

    // start express server
    app.listen(3001);
    console.log('Express application is up and running on port 3000');
  } catch (error) {
    console.log('TypeORM connection error: ', error);
  }
})();