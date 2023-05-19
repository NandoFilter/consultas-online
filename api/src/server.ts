import socket from './app'

const port = process.env.PORT || socket.PORT

socket.app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
