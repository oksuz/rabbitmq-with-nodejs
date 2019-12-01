module.exports = [
  {
    name: 'my.fanout.exchage',
    type: 'fanout',
    assertAs: 'exchange',
    options: {
      durable: false,
      autoDelete: true
    }
  },
  {
    name: 'my.direct.exchage',
    type: 'direct',
    assertAs: 'exchange',
    options: {
      durable: false,
      autoDelete: true
    }
  },
  {
    name: 'my.topic.exchage',
    type: 'topic',
    assertAs: 'exchange',
    options: {
      durable: false,
      autoDelete: true
    }
  },
  {
    name: 'my.headers.exchage',
    type: 'headers',
    assertAs: 'exchange',
    options: {
      durable: false,
      autoDelete: true
    }
  },
  {
    assertAs: 'queue',
    name: "fanout_q1",
    pattern: '',
    boundTo: 'my.fanout.exchage',
    options: {
      durable: false,
      autoDelete: true
    }
  },
  {
    assertAs: 'queue',
    name: "fanout_q2",
    pattern: '',
    boundTo: 'my.fanout.exchage',
    options: {
      durable: false,
      autoDelete: true
    }
  },
  {
    assertAs: 'queue',
    name: "direction_q1",
    pattern: 'direct-routing-key1',
    boundTo: 'my.direct.exchage',
    options: {
      durable: false,
      autoDelete: true
    }
  },
  {
    assertAs: 'queue',
    name: "direction_q2",
    pattern: 'direct-routing-key2',
    boundTo: 'my.direct.exchage',
    options: {
      durable: false,
      autoDelete: true
    }
  },
  {
    assertAs: 'queue',
    name: "topic_q1",
    pattern: 'hello.*',
    boundTo: 'my.topic.exchage',
    options: {
      durable: false,
      autoDelete: true
    }
  },
  {
    assertAs: 'queue',
    name: "topic_q2",
    pattern: '#.ehlo',
    boundTo: 'my.topic.exchage',
    options: {
      durable: false,
      autoDelete: true
    }
  },
  {
    assertAs: 'queue',
    name: "headers_q1",
    pattern: '',
    headers: {
      'x-match': 'all',
      job: 'done'
    },
    boundTo: 'my.headers.exchage',
    options: {
      durable: false,
      autoDelete: true
    }
  },
];
