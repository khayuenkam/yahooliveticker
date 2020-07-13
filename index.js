const WebSocket = require('isomorphic-ws')
const protobuf = require("protobufjs");

const root = protobuf.loadSync('./YPricingData.proto');

const Yaticker = root.lookupType("yaticker");
const ws = new WebSocket('wss://streamer.finance.yahoo.com');

ws.onopen = function open() {
  console.log('connected');
  ws.send(JSON.stringify({
    subscribe: ['MSFT']
  }));
};

ws.onclose = function close() {
  console.log('disconnected');
};

ws.onmessage = function incoming(data) {
  console.log('comming message')
  console.log(Yaticker.decode(new Buffer(data.data, 'base64')))
};