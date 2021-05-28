import Formulario from '../../../schemas/Formulario';

interface Request {
  nome: string,
  descricao: string,
  publicado: boolean,
}

class CriarFormularioService {
  public async executar({ nome, descricao, publicado } : Request): Promise<string> {

    var formulario = await Formulario.create({
      nome,
      descricao,
      publicado,
    });

    return formulario._id;
  }
}

export default CriarFormularioService;
