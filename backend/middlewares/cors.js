const allowedCors = [
  'https://mesto.ageshinobi.nomoredomains.rocks',
  'http://mesto.ageshinobi.nomoredomains.rocks',
  'https://api.mesto.ageshinobi.nomoredomains.rocks',
  'http://api.mesto.ageshinobi.nomoredomains.rocks',
  'https://localhost:3001',
  'http://localhost:3001',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};

module.exports = {
  cors,
};
