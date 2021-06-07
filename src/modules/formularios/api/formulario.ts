import { Router } from 'express';
import { container } from 'tsyringe';

import CriarFormularioService from '@modules/formularios/services/CriarFormulario/CriarFormularioService';
import { ObjectId } from 'mongodb';

// import garantirAutenticacao from './middlewares/garantirAutenticacao';

const FormularioRoutes = Router();

// FormularioRoutes.use(garantirAutenticacao);

FormularioRoutes.get('/', async (request, response) => {
  try {
    const list = await global.servidor1.db('formularios-api').collection('formularios').find({}).toArray();
    return response.json(list);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

FormularioRoutes.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const form = await global.servidor1.db('formularios-api').collection('formularios').findOne({ _id: new ObjectId(id) });

    if (!form) { throw Error('Form not found'); }

    return response.json(form);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

FormularioRoutes.put('/', async (request, response) => {
  const { nome, descricao, publicado } = request.body;

  return response.json({});
});

FormularioRoutes.post('/', async (request, response) => {
  const { nome, descricao, publicado } = request.body;

  const createForm = container.resolve(CriarFormularioService);

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
});

export default FormularioRoutes;
