import { Router } from 'express';

import formulariosRouter from '@modules/formularios/api';

const v1Router = Router();

v1Router.use('/formularios', formulariosRouter);

export default v1Router;
