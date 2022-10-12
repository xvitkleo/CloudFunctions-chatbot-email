// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Options
const autoscroll = () => {
  const $newMessage = $messages.lastElementChild;

  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  const visibleHeight = $messages.offsetHeight;

  const containerHeight = $messages.scrollHeight;

  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

async function getRespond(message) {
  //const { token } = rootState.auth;

  const res = await fetch(
    `https://us-central1-crm-chatbot-365214.cloudfunctions.net/chatbox/message?message=${message}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    },
  );

  if (res.status !== 200) {
    throw new Error('Something went wrong, please try again.');
  }

  const response = await res.json();
  if (response === undefined) return 'No entiendo su pregunta';
  return response;
}

function addMessage(message, user) {
  let div = document.createElement('div');
  div.className = 'message';
  let p = document.createElement('p');
  let spanUsername = document.createElement('span');
  spanUsername.className = 'message__name';
  spanUsername.innerHTML = user;
  let spanMeta = document.createElement('span');
  spanMeta.className = 'message__meta';
  spanMeta.innerHTML = formatAMPM(new Date());
  let pMessage = document.createElement('p');
  pMessage.innerHTML = message;
  p.appendChild(spanUsername);
  p.appendChild(spanMeta);
  div.appendChild(p);
  div.appendChild(pMessage);

  $messages.prepend(div);
}

$messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute('disabled', 'disabled');

  const message = e.target.elements.message.value;
  addMessage(message, 'guest');
  $messageFormButton.removeAttribute('disabled');
  $messageFormInput.value = '';
  $messageFormInput.focus();
  const respond = await getRespond(message);
  addMessage(respond.answer, 'bot');
  autoscroll();
});
