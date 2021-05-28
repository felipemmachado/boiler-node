import Formulario from '@schemas/Formulario';

interface Request {
  id: string,
  nome: string,
  descricao: string,
  publicado: boolean,
}

class AtualizarFormularioService {
  public async executar({
    id, nome, descricao, publicado,
  } : Request): Promise<void> {
    const form = await Formulario.findOne({ _id: id });

    if (!form) { throw Error('Form not found'); }

    await form.update({
      nome,
      descricao,
      publicado,
    });
  }
}

export default AtualizarFormularioService;
