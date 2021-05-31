import 'reflect-metadata';
import './infra/mongoose/connection';

import express from 'express';
import cors from 'cors';
import TokenExpiredError from './shared/errors/TokenExpiredError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: express.NextFunction,
  ) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(err.stack);
    }

    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        code: 'token.expired',
        message: err.message,
      });
    }

    return res.status(500).json({ error: 'Internal server error' });
  },
);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on por 3333!');
});
