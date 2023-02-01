import express from 'express';
import cookieParser from 'cookie-parser';
import api from './api';

const addSetAuthCookieToResponse = (_req, res, next) => {
  res.setAuthCookie = (authToken) => {
    res.cookie('authToken', authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'Lax',
    });
  };

  next();
};

const addUserAgentToRequest = (req, _res, next) => {
  req.userAgent = req.headers['user-agent'];
  next();
};

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
