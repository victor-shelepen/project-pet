import WS, {WebSocketServer} from 'ws'
import EventEmitter from 'events'

export const groups = [
  {
    name: 'currency',
    title: 'Currency',
    description: 'Currency library usage.'
  }
]

export const commands = [
  {
    name: 'listen',
    group: 'currency',
    title: 'Listen currency rates from binance.',
    handler: async () => {
      const bridge = new EventEmitter()
      const socketServer = new WebSocketServer({ port: 9001 })
      socketServer.on('connection', function connection(socket) {
        socket.on('message', function message(data) {
          // Stub ...
        });

        bridge.on('event', (data) => {
          socket.send(data)
        });
      });

      const symbol = 'BNBBTC';
      const binanceSocket = new WS(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);
      binanceSocket.on('message', async (data) => {
        const incomingData = JSON.parse(data.toString());
        bridge.emit('event', Buffer.from(JSON.stringify(incomingData)))
      });
    }
  },
]
