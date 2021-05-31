import { injectable, inject } from 'tsyringe';

import Formulario from '../../../schemas/Formulario';

import LoggerProvider from '../../../shared/adapters/models/LoggerProvider';

interface Request {
  nome: string,
  descricao: string,
  publicado: boolean,
}

@injectable()
class CriarFormularioService {
  constructor(
    @inject('LoggerProvider') private loggerProvider: LoggerProvider,
  ) {
  }

  public async executar({ nome, descricao, publicado } : Request): Promise<string> {
    const formulario = await Formulario.create({
      nome,
      descricao,
      publicado,
    });

    this.loggerProvider.log(
      'warn',
      '[Formulario Criado]',
    );

    return formulario._id;
  }
}

export default CriarFormularioService;
