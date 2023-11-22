require('dotenv').config();
const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(id, refreshToken) {
    const tokenData = await tokenModel.findOne({ where: { id: id } });
    if (tokenData) {
      tokenData.token = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({
      refreshToken: refreshToken,
    });
    return token;
  }
}

module.exports = new TokenService();
