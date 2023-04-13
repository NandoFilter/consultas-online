import { Request, Response, NextFunction } from 'express'
import jwt = require('jsonwebtoken')
import { User } from '../models'

export function checkToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'] as string
    const token = authHeader.split(' ')[1]

    const secret = process.env.SECRET_KEY

    if (secret) {
      jwt.verify(token, secret)
    }

    next()
  } catch (err) {
    res.status(400).json({
      message: 'Token inválido'
    })
  }
}

export function generateToken(user: User) {
  try {
    const secret = process.env.SECRET_KEY

    let result = {
      token: '',
      exp: new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour
    }

    if (secret) {
      result.token = jwt.sign(
        {
          id: user.id,
          exp: result.exp.getTime()
        },
        secret
      )
    }

    return result
  } catch (err) {
    throw err
  }
}

module.exports = {
  checkToken,
  generateToken
}
