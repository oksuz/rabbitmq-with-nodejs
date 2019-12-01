const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const amqpCli = require('./Amqp');

const webApp = express();

const staticPath = path.resolve(__dirname + '/../public');
webApp.use('/web', express.static(staticPath))
webApp.use(bodyParser.json());
webApp.use((err, req, res, next) => {

  if (res.headersSent) {
    return next(err);
  };

  res.status(500).json({
    error: err.message
  })

});

const init = async init => {
  await amqpCli.boot();

  webApp.post('/message', async (req, res, next) => {
    const { exchange, payload, pattern, messageHeders } = req.body;

    
    const channel = await amqpCli.connection.createChannel();
    try {
      const options = {};
      options.headers = messageHeders || {};

      channel.publish(exchange, pattern || '', Buffer.from(payload), options)
      return res.status(204).json()
    } catch(e) {
      next(e);
    } finally {
      channel.close()
    }

  })

  webApp.listen(9000, () => {
    console.log('http server started at ' + 9000);
  });
}


init();

