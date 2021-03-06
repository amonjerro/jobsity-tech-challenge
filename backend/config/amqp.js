const AMQP = require(`amqplib/callback_api`)

class AMQPSingleton {
  constructor () {
    this.connection = null
    this.connected = false
    this.publishChannel = null
    this.consumerChannel = null
  }

  //Singleton AMQP Consumer connection
  startConnection(callback){
    if (this.connected) return this.connection
    else {
      AMQP.connect(process.env.AMQP_CONNECTION,(err, conn)=>{
        if(err){
            let d = new Date()
            console.error(`[ERROR - ${d.toISOString()}]'`)
            console.error(err)
            process.exit(0)
        } else {
            this.connection = conn
            this.startProducerChannel()
            this.startConsumerChannel(callback)
            this.connected = true
        }
      })   
    }
  }

  //Get the consumer
  startConsumerChannel(callback){
    this.connection.createChannel((err,channel)=>{
        let d = new Date()
        if(err){
            
            console.error(`[ERROR - ${d.toISOString()}]'`)
            console.error(err)
            return false
        }
        console.info(`[AMQP SUCCESS - ${d.toISOString()}]`)
        console.info('Consumer online')
        this.consumerChannel = channel
        this.consumerChannel.assertQueue(process.env.APP_ID, {durable: false})
        this.consume(callback)
    })
  }

  startProducerChannel(){
    this.connection.createChannel((err,channel)=>{
        let d = new Date()
        if(err){
            
            console.error(`[ERROR - ${d.toISOString()}]'`)
            console.error(err)
            return false
        }
        console.info(`[AMQP SUCCESS - ${d.toISOString()}]`)
        console.info('Producer online')
        this.publishChannel = channel
    })
  }


  publish(queue, message){
    this.publishChannel.assertQueue(queue,{durable:false})
    this.publishChannel.sendToQueue(queue, Buffer.from(message), { replyTo:process.env.APP_ID })
  }

  consume(callback){
      this.consumerChannel.consume(process.env.APP_ID, (msg)=>{
          let messageContents = JSON.parse(msg.content.toString())
          callback(messageContents)
      }, {
        noAck:true
      })
  }

  disconnect(){
    this.connection.close()
  }


}

module.exports = new AMQPSingleton()
