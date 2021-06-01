import { container } from 'tsyringe';

import Pergunta from '@schemas/Pergunta';
import OpcoesResposta from '@schemas/OpcaoResposta';
import Formulario from '@schemas/Formulario';
import MongoMock from '@shared/tests/MongoMock';
import CriarFormularioService from '@services/Formulario/CriarFormulario/CriarFormularioService';

describe('Formulario', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  beforeEach(async () => {
    await Formulario.deleteMany({});
    await Pergunta.deleteMany({});
    await OpcoesResposta.deleteMany({});
  });

  it('deve retornar erro ao tentar criar um formulario sem nome', async () => {
    const criarFormularioService = container.resolve(CriarFormularioService);

    const nome = '';
    const descricao = 'Formulário que faz várias coisas';
    const publicado = false;

    try {
      await criarFormularioService.executar({ nome, descricao, publicado });
      expect(true).toBe(false);
    } catch (e) {
      expect(true).toBe(true);
    }
  });

  it('deve ser capaz de salvar um novo formulario', async () => {
    const criarFormularioService = container.resolve(CriarFormularioService);

    const nome = 'Formulario X';
    const descricao = 'Formulário que faz várias coisas';
    const publicado = false;

    const id = await criarFormularioService.executar({ nome, descricao, publicado });

    const formularioInserido = await Formulario.findById(id);

    expect(formularioInserido).toEqual(
      expect.objectContaining({
        nome: 'Formulario X',
        descricao: 'Formulário que faz várias coisas',
        publicado: false,
      }),
    );
  });
});
