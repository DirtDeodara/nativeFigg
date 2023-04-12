import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useSocket } from '../context/SocketContext';

const GameRoom = () => {
  const socket = useSocket();
  const name = Math.random().toString(36).substring(7);

  const [username, setUsername] = useState(name);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [guess, setGuess] = useState('');
  const [number, setNumber] = useState('');
  const roomId = '123';

  useEffect(() => {
    console.log(messages)
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.emit('join', { roomId, username });

      socket.on('roomState', (room) => {
        setMessages(room.messages);
      });

      socket.on('message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      socket.on('winner', (data) => {
        alert(`${data.username} won!`);
      });

    }
  }, [socket]);

  const getNumber = () => { // TODO: start here
    socket.emit('getNumber', (data) => {
      setNumber(data.number);
    });
  };

  const sendMessage = () => {
    socket.emit('message', { roomId, username, message });
    setMessage('');
  };

  const submitNumber = () => {
    socket.emit('submitGuess', { roomId, guessedNumber: guess });
  };

  const renderMessage = ({ item }) => (
    <Text>
      {item.username}: {item.message}
    </Text>
  );

  return (
    <View>
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={setUsername} />

      <Text>Chat:</Text>
      <FlatList data={messages} renderItem={renderMessage} />
      <TextInput value={message} onChangeText={setMessage} />
      <Button title="Send" onPress={sendMessage} />

      <Text>Number:</Text>
      <TextInput value={guess} onChangeText={setGuess} />
      <Button title="Submit" onPress={submitNumber} />
    </View>
  );
};

export default GameRoom;
