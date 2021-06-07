import mongoConfig from '@configs/mongo';
import { MongoClient } from 'mongodb';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      servidor1: MongoClient;
    }
  }
}

const mongoUserPass = mongoConfig.username
  ? `${mongoConfig.username}:${mongoConfig.password}@`
  : '';

console.log('url de conexao', `mongodb://${mongoUserPass}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`);

export default async function connect():Promise<MongoClient> {
  const cliente = new MongoClient(`mongodb://${mongoUserPass}${mongoConfig.host}:${mongoConfig.port}`, { useUnifiedTopology: true });

  // Connect the client to the server
  await cliente.connect();
  // Establish and verify connection
  // await cliente.db(mongoConfig.database).command({ ping: 1 });
  console.log('Connected successfully to server');
  return cliente;
}
