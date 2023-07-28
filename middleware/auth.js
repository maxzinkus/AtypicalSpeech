const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/jwt.json')['jwtSecret'];

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