import express from 'express';
import cookieParser from 'cookie-parser';
import api from './api';
import {
  addSetAuthCookieToResponse,
  addUserAgentToRequest,
} from 'middleware/response';
import { errorHandler } from 'middleware/errors';

export default function createNextJsServer({ app, handle }) {
  const server = express();

  server.use(express.json());
  server.use(addSetAuthCookieToResponse);
  server.use(cookieParser());
  server.use(addUserAgentToRequest);
  server.use('/api', api);
  server.use(errorHandler);

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  return server;
}
