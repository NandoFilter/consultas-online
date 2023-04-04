import { Request, Response, NextFunction } from 'express'
import jwt = require('jsonwebtoken')
import { User } from '../models'

export function checkToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'] as string
    const token = authHeader.split(' ')[1]

    const secret = process.env.SECRET_KEY as string

    jwt.verify(token, secret)

    next()
  } catch (err) {
    res.status(400).json({
      message: 'Token inválido'
    })
  }
}

export function generateToken(res: Response, user: User) {
  try {
    const secret = process.env.SECRET_KEY

    let token

    if (secret) {
      token = jwt.sign(
        {
          id: user.id
        },
        secret
      )
    }

    return token
  } catch (err) {
    res.status(400).json({
      message: 'Erro ao gerar token'
    })
  }
}

module.exports = {
  checkToken,
  generateToken
}
