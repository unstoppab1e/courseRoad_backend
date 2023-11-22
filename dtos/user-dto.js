module.exports = class UserDto {
  id;
  name;
  email;
  isActivated;

  constructor(model) {
    this.id = model.dataValues.id;
    this.name = model.name;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
};
