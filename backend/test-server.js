// test-server.js
import io from 'socket.io-client';

const socket = io('http://localhost:5001', {
  query: { userId: 'test-' + Date.now() }
});

socket.on('connect', () => {
  console.log('✅ Connected to server');
  console.log('Socket ID:', socket.id);
  
  // Request online users
  socket.emit('getOnlineUsers');
});

socket.on('getOnlineUsers', (users) => {
  console.log('👥 Online users:', users);
  console.log('Total:', users.length);
  
  // Disconnect after test
  setTimeout(() => {
    socket.disconnect();
    process.exit(0);
  }, 2000);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
  process.exit(1);
});

setTimeout(() => {
  console.log('❌ Connection timeout');
  process.exit(1);
}, 5000);