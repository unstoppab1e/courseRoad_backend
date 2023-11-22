const userService = require('../service/user-service');

class userController {
  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const userData = await userService.signUp(name, email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.signIn(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res) {
    const users = await User.findAll();
    res.json(users);
  }
  async getOneUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findOne({ where: { id } });
      res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new userController();
