require('dotenv').config()
var jwt = require('jsonwebtoken');

module.exports = {
  async generate(id) {
    return jwt.sign({
      id
    }, process.env.SECRET, {
      expiresIn: '1 day' // expires in 5min
    });
  },

  async validate(req, res, next) {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        message: 'No token provided.'
      });
    }

    const parts = authHeader.split(' ')

    if (!parts.length === 2) {
      return res.status(401).send({
        message: 'Token error'
      })
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({
        message: 'Token malformatted'
      })
    }

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res.status(403).send({
          message: 'Failed to authenticate token.'
        });
      }
      req.userId = decoded.id;
      next();
    })
  }
}