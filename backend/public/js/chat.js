const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

socket.on('message', (message) => {
  console.log('Received: ' + message);
  const html = Mustache.render(messageTemplate, {
    message
  });
  $messages.insertAdjacentHTML('beforeend', html)
});

socket.on('locationMessage', (url) => {
  console.log('Received: ' + url);
  const html = Mustache.render(locationTemplate, {
    url
  });
  $messages.insertAdjacentHTML('beforeend', html)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();

  $messageForm.setAttribute('disabled', 'disabled');

  const message = e.target.elements.message.value;
  console.log(message);
  socket.emit('sendMessage', message, (error) => {
    $messageForm.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();
    
    if (error) {
      return console.log('Profanity is not allowed');  
    }
    console.log('The message was delivered');
  });
});

document.querySelector('#send-location').addEventListener('click', (e) => {
  $sendLocationButton.setAttribute('disabled', 'disabled');

  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit('sendLocation', { latitude, longitude }, () => {
      $sendLocationButton.removeAttribute('disabled');
      console.log('Location shared!');
    });
  });
});
