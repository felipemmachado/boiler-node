import Formulario from '@modules/formularios/schemas/Formulario';
import mongose, { Schema } from 'mongoose';

export interface AtualizarFormularioRequest {
  id: string,
  nome: string,
  descricao: string,
  publicado: boolean,
}

class AtualizarFormularioService {
  public async executar(request : AtualizarFormularioRequest): Promise<void> {
    /*
    const thingSchema = new Schema({});
    const Thing = mongose.model('Formulario', thingSchema);
    const thing = new Thing({ iAmNotInTheSchema: true });
    thing.save(); */

    const form = await Formulario.findOne({ _id: request.id });

    if (!form) { throw Error('Form not found'); }

    await form.update({
      nome: request.nome,
      descricao: request.descricao,
      publicado: request.publicado,
    });
  }
}

export default AtualizarFormularioService;
