import express from 'express';
import Auth from 'handlers/Auth';

const router = new express.Router();

router.post('/login', async (req, res) => {
  const { username = '', password = '' } = req.body;
  const { userAgent } = req;

  try {
    const [user, authToken] = await Auth.authenticate(
      username,
      password,
      userAgent
    );
    res.setAuthCookie(authToken);
    res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: 'wrong credentials' });
  }
});

router.post('/logout', async (req, res) => {
  const { userAgent } = req;
  const { authToken } = req.cookies;
  await Auth.invalidateSession(authToken, userAgent);
  res.clearCookie('authToken');
  res.json({ message: 'logout' });
});

router.post('/logout-all', async (req, res) => {
  const { userAgent } = req;
  const { authToken } = req.cookies;
  await Auth.invalidateSessions(authToken, userAgent);
  res.clearCookie('authToken');
  res.json({ message: 'logout' });
});

router.post('/register', async (req, res) => {
  const { username = '', password = '' } = req.body;
  const { userAgent } = req;

  try {
    const [user, authToken] = await Auth.register(
      username,
      password,
      userAgent
    );
    res.setAuthCookie(authToken);
    res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: 'something went wrong' });
  }
});

export default router;
