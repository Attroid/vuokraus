import express from 'express';
import cookieParser from 'cookie-parser';
import api from './api';
import {
  addSetAuthCookieToResponse,
  addUserAgentToRequest,
} from 'middleware/response';

export default function createNextJsServer({ app, handle }) {
  const server = express();

  server.use(express.json());
  server.use(addSetAuthCookieToResponse);
  server.use(cookieParser());
  server.use(addUserAgentToRequest);

  server.use('/api', api);

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  return server;
}
