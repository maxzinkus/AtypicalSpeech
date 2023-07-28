const { AdminUser } = require('../../models')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const jwtSecret = '35d3331f40dac9c738ab5b9f0ed745adf7a126b218b0dc477d0a006e1914640f423d0e'

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
      }).then(user => {
        const maxAge = 24 * 60 * 60;

        const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 24hrs in sec
            }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
        });

        res.status(200).json({
          message: "User successfully created",
          user,
        })
      })
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
                if(result){
                    const maxAge = 24 * 60 * 60;

                    const token = jwt.sign(
                        { id: user._id, username, role: user.role },
                        jwtSecret,
                        {
                          expiresIn: maxAge, // 24hrs in sec
                        }
                    );
    
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 24hrs in ms
                    });

                    res.status(200).json({
                        message: "Login successful",
                        user,
                    })
                }else{
                    res.status(400).json({ message: "Login not succesful" })
                }
            })
        }
      } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        })
      }
  }

  exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(203).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== "admin") {
            return res.status(203).json({ message: "Not authorized" })
          } else {
            next()
          }
        }
      })
    } else {
      return res
        .status(203)
        .json({ message: "Not authorized, token not available" })
    }
  }

  exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(203).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== "user") {
            return res.status(203).json({ message: "Not authorized" })
          } else {
            next()
          }
        }
      })
    } else {
      return res
        .status(203)
        .json({ message: "Not authorized, token not available" })
    }
  }