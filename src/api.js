import openSocket from 'socket.io-client';
const  socket = openSocket('https://davidway.ie:8080');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function subscribeToRoom(name, cb) {
  socket.emit('subscribeToRoom', name);
  socket.on('updateOccupants',  occupants => cb(null, occupants));
}

function subscribeToPositionUpdates(cb) {
  socket.on('updatePostion', dot => cb(null, dot));
}

function setPosition(pos) {
  socket.emit('setPosition', pos);
}

export { subscribeToTimer, subscribeToRoom, subscribeToPositionUpdates, setPosition };
