const socket = io();

socket.on('message', (message) => {
  console.log('Received: ' + message);
})

document.querySelector('#sendMessageForm').addEventListener('submit', (e) => {
  const message = e.target.elements.message.value;
  console.log(message);
  socket.emit('sendMessage', message);
  e.preventDefault()
});

document.querySelector('#send-location').addEventListener('click', (e) => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position); 
    const { latitude, longitude } = position.coords;
    socket.emit('sendLocation', { latitude, longitude });
  });
});
