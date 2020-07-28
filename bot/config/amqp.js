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
        this.consumerChannel.assertQueue(process.env.BOT_CONSUMER_QUEUE, {durable: false})
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


  reply(originalMsg, replyMsg){
    this.publishChannel.assertQueue(originalMsg.properties.replyTo,{durable:false})
    this.publishChannel.sendToQueue(originalMsg.properties.replyTo, Buffer.from(JSON.stringify(replyMsg)))
    this.consumerChannel.ack(originalMsg)
  }

  consume(callback){
      this.consumerChannel.consume(process.env.BOT_CONSUMER_QUEUE, (msg)=>{
        console.log(msg)
        try{
          let messageContents = JSON.parse(msg.content.toString())
          callback(msg, messageContents)
        } catch(error){
          let d = new Date()
          console.error(`[ERROR - ${d.toISOString()}]'`)
          console.error('Message could not be parsed as JSON')
          this.reply(msg, {ok:false, message:'There was a problem parsing this message'})
        }
      })
  }

  disconnect(){
    this.connection.close()
  }


}

module.exports = new AMQPSingleton()
