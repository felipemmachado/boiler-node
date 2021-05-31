import ValidatorError from '@shared/errors/ValidatorError';
import Validator from 'validatorjs';
import { CriarFormularioRequest } from './CriarFormularioService';

class CriarFormularioServiceValidator {
  Valid({ nome, descricao }: CriarFormularioRequest): void | Error {
    const validation = new Validator({
      nome,
      descricao,
    }, {
      nome: 'required|max:100',
      descricao: 'required|max:200',
    });

    if (!validation.passes()) {
      throw new ValidatorError(validation.errors.all());
    }
  }
}

export default CriarFormularioServiceValidator;
