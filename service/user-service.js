const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
  async signUp(name, email, password) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw new Error('User with this email already exists');
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      activationLink,
    });

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();
