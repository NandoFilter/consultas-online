interface Token {
  header: object
  payload: object
  signature: string
  expires: number
}

const decode = (token: string): Token => {
  if (!token) return {} as Token

  const tokenArray = token.split('.')
  const header = JSON.parse(atob(tokenArray[0]))
  const payload = JSON.parse(atob(tokenArray[1]))

  const decodedToken: Token = {
    header,
    payload,
    signature: tokenArray[2],
    expires: payload.exp,
  }

  return decodedToken
}

const isTokenValid = (token: string) => {
  if (!token || !localStorage.getItem('token')) {
    return false
  }

  const decodedToken = decode(token)

  return decodedToken.expires * 1000 > Date.now()
}

export default {
  decode,
  isTokenValid,
}
