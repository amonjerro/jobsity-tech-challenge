const SocketServer = require(`socket.io`)

class Socket {
  constructor () {
    this.connected = false
    this.io = null
  }

  //Singleton socket connection
  startConnection (server) {
    if (this.connected) return this.io
    else {
      this.io = SocketServer(server)
      this.connected = true
      return this.io
    }
  }

  getConnection () {
    return this.io
  }
}

module.exports = new Socket()
