import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
const App = () => {
  // React.useEffect(() => {
  //   socket.emit('login', { name: 'Dung', email: 'dung@gmail.com' });
  // }, []);

  // socket.on('login-success', (data) => {
  //   console.log(data);
  // });

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  
  return <div>App</div>;
};

export default App;
