import * as dotenv from 'dotenv';
import next from 'next';
import createNextJsServer from './src';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createNextJsServer({ app, handle });
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`server - Ready on http://localhost:${PORT}`);
  });
});
