import express from 'express';
import Auth from 'handlers/Auth';
import { catchErrors } from 'utils/asyncCatch';

const router = new express.Router();

router.post(
  '/login',
  catchErrors(async (req, res) => {
    const { username = '', password = '' } = req.body;
    const { userAgent } = req;

    const [user, authToken] = await Auth.authenticate(
      username,
      password,
      userAgent
    );

    res.setAuthCookie(authToken);
    res.json(user);
  })
);

router.post(
  '/logout',
  catchErrors(async (req, res) => {
    const { userAgent } = req;
    const { authToken } = req.cookies;
    await Auth.invalidateSession(authToken, userAgent);
    res.clearCookie('authToken');
    res.json({ message: 'logout' });
  })
);

router.post(
  '/logout-all',
  catchErrors(async (req, res) => {
    const { userAgent } = req;
    const { authToken } = req.cookies;
    await Auth.invalidateSessions(authToken, userAgent);
    res.clearCookie('authToken');
    res.json({ message: 'logout' });
  })
);

router.post(
  '/register',
  catchErrors(async (req, res) => {
    const { username = '', password = '' } = req.body;
    const { userAgent } = req;

    const [user, authToken] = await Auth.register(
      username,
      password,
      userAgent
    );

    res.setAuthCookie(authToken);
    res.json(user);
  })
);

export default router;
