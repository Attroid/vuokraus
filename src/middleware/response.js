export function addSetAuthCookieToResponse(_req, res, next) {
  res.setAuthCookie = (authToken) => {
    res.cookie('authToken', authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'Lax',
    });
  };

  next();
}

export function addUserAgentToRequest(req, _res, next) {
  req.userAgent = req.headers['user-agent'];
  next();
}
