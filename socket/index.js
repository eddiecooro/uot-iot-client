const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 2222
});

wss.on('listening', () => {
  console.log('Socket server is listening on port 2222');
});
wss.on('connection', ws => {
  console.log('Someone connected');
  setTimeout(() => {
    console.log('Creating');
    ws.send(
      JSON.stringify({
        type: 'create',
        data: { id: 1241241241, name: 'New new todo', done: false }
      })
    );
  }, 15000);
  setTimeout(() => {
    console.log('Updating');
    ws.send(
      JSON.stringify({
        type: 'update',
        data: { id: 4, name: 'Buy Hello', done: true }
      })
    );
  }, 2000);
  setTimeout(() => {
    console.log('Deleting');
    ws.send(JSON.stringify({ type: 'delete', data: { id: 3 } }));
  }, 10000);
});
