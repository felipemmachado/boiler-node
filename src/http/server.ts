import 'dotenv/config';
import connect from '@shared/mongo/connectionServidor1';
import app from './app';

app.listen(3333, async () => {
  try {
    global.servidor1 = await connect();
  } catch (e) {
    console.log('error', e);
  }

  // eslint-disable-next-line no-console
  console.log('Server started on por 3333!');
});
