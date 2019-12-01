const amqp = require('amqplib');
const config = require('./exchangesAndQueues');

class AmqpClient {

  constructor(url, config) {

    if (!url) {
      throw new Error('amqp url is empty')
    }

    this.url = url
    this.config = config;
    this.connection = null;
  }

  async boot() {
    await this.connect();

    const channel = await this.connection.createChannel();
    await this.createExchanges(channel);
    await this.createQueues(channel);
    await channel.close();
  }

  async createExchanges(channel) {

    const exchanges = this.config.filter(entry => {
      return entry.assertAs === 'exchange';
    });

    for (const i in exchanges) {
      const { name, type, options } = exchanges[i];
      await channel.assertExchange(name, type, options);
      console.log(`[exchange] ${name} created with type ${type}`);
    }
    
  }

  async createQueues(channel) {
    const qs = this.config.filter(entry => {
      return entry.assertAs === 'queue';
    });

    for (const i in qs) {
      const { name, options  } = qs[i];
      await channel.assertQueue(name, options);
      console.log(`[queue] ${name} created`);
      await this.boundQueue(channel, qs[i]);
    }
  }

  async boundQueue(channel, q) {
    const { name, boundTo, headers, pattern } = q;
    await channel.bindQueue(name, boundTo, pattern, headers || {});
    console.log(`[queue-bound] ${name} binded to ${boundTo} with pattern: '${pattern}' and params: '${JSON.stringify(headers || {})}'`)
  }

  async connect() {
    if (this.connection != null) {
      return this.connection;
    }

    this.connection = await amqp.connect(this.url);

    return this.connection;
  }

}


module.exports = new AmqpClient('amqp://localhost', config);