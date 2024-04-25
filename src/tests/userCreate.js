const User = require("../models/User")

const userCreate = async () => {
  const user = {
    firstName: 'Danilo',
    lastName: "Omar",
    email: "daniloomarmontecel@gmail.com",
    password: "danilo1234",
    phone: "093838383"
  }
  await User.create(user)
}

module.exports = userCreate

