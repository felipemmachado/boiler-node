import { Router } from 'express';

import FormularioRoutes from './Formulario.routes';

const routes = Router();

routes.use('/formularios', FormularioRoutes);

export default routes;
