const allowedCors = ['https://kniws.nomoredomains.rocks', 'http://kniws.nomoredomains.rocks', 'https://localhost:3000', 'http://localhost:3000'];
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (allowedCors === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    return res.end();
  }
  next();
};
