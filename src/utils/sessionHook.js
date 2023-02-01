import Auth from 'handlers/Auth';

export default function withSession(handler) {
  return async (context) => {
    const authToken = context.req.cookies.authToken;
    const userAgent = context.req.headers['user-agent'];

    const user = await Auth.validateSession(authToken, userAgent);

    Object.defineProperty(context.req, 'session', {
      value: { user },
      writable: false,
    });

    return handler(context);
  };
}
