const io = require('socket.io')();
let occupants = [];

io.on('connection', (client) => {

	client.on('subscribeToTimer', (interval) => {
		console.log('client is subscribing to timer with interval ', interval);
		setInterval(() => {
			client.emit('timer', new Date());
		}, interval);
	});

	client.on('subscribeToRoom', (name) => {
		console.log('client is subscribing to Room with name ', name);
		client.name = name;
		client.emit('updateOccupants', io.engine.clientsCount);
	});

	client.on('setPosition', (pos) => {
		console.log(`${client.name} is setting position to `, pos);
		client.broadcast.emit('updatePostion', {
			id: client.id,
			name: client.name,
			pos: pos
		});
	});
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
