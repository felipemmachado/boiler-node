import { Router } from 'express';

import FormularioRoutes from '@modules/formularios/api/Formulario';

const v1Router = Router();

v1Router.use('/formularios', FormularioRoutes);

export default v1Router;
