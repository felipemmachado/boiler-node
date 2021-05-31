import { Router } from 'express';

import CriarFormularioService from '../services/Formulario/CriarFormulario/CriarFormularioService';
import Formulario from '../schemas/Formulario';

import garantirAutenticacao from './middlewares/garantirAutenticacao';

const FormularioRoutes = Router();

// FormularioRoutes.use(garantirAutenticacao);

FormularioRoutes.get('/', async (request, response) => {
  try {
    const list = await Formulario.find({});
    return response.json(list);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

FormularioRoutes.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const form = await Formulario.findOne({ _id: id });

    if (!form) { throw Error('Form not found'); }

    return response.json(form);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

FormularioRoutes.post('/', async (request, response) => {
  try {
    const { nome, descricao, publicado } = request.body;

    const createForm = new CriarFormularioService();

    const id = await createForm.executar({
      nome,
      descricao,
      publicado,
    });

    return response.json({
      id,
      nome,
      descricao,
      publicado,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default FormularioRoutes;
