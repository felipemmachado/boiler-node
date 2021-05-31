import Pergunta from '@schemas/Pergunta';
import OpcoesResposta from '@schemas/OpcaoResposta';
import Formulario from '@schemas/Formulario';
import MongoMock from '@shared/tests/MongoMock';
import AtualizarFormularioService from '@services/Formulario/AtualizarFormulario/AtualizarFormularioService';

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

  it('deve ser capaz de atualizar um formulario', async () => {
    const atualizarFormularioService = new AtualizarFormularioService();

    let nome = 'Novo';
    let descricao = 'Novo';
    let publicado = false;

    const formCriado = await Formulario.create({
      nome,
      descricao,
      publicado,
    });

    const id = formCriado._id;
    nome = 'editado';
    descricao = 'editado';
    publicado = true;

    await atualizarFormularioService.executar({
      id, nome, descricao, publicado,
    });

    const formularioInserido = await Formulario.findById(id);

    expect(formularioInserido).toEqual(
      expect.objectContaining({
        nome: 'editado',
        descricao: 'editado',
        publicado: true,
      }),
    );
  });
});
