import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_SERVER, {
  autoConnect: false
});

export const connectSocket = (userId) => {
  socket.query = { userId };
  socket.connect();
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  socket.disconnect();
};