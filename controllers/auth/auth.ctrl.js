const { AdminUser } = require('../../models')
const bcrypt = require("bcryptjs")

exports.register = async (req, res, next) => {
    const { username, password } = req.body

    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }

    const oldUser = await AdminUser.findOne({ where: { username } });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
            
      await AdminUser.create({
        username,
        password: hashedPassword,
      }).then(user =>
        res.status(200).json({
          message: "User successfully created",
          user,
        })
      )
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: err.mesage,
      })
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body
    // Check if username and password is provided
    if (!username || !password) {
      return res.status(400).json({
        message: "Username or Password not present",
      })
    }
    try {
        const user = await AdminUser.findOne({where: { username }})
        if (!user) {
          res.status(401).json({
            message: "Login not successful",
            error: "User not found",
          })
        } else {
            bcrypt.compare(password, user.password).then(function (result) {
                console.log('=====>', result)
                result
                ? res.status(200).json({
                    message: "Login successful",
                    user,
                  })
                : res.status(400).json({ message: "Login not succesful" })
            })
        }
      } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        })
      }
  }