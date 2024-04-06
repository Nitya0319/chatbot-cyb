const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
  const userMessage = userInput.value;
  if (userMessage.trim()) {
    renderChatBubble(userMessage, 'user');
    fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    })
   .then(response => response.json())
   .then(data => {
      renderChatBubble(data.message, 'assistant');
    })
   .catch(error => {
      console.error('Error:', error);
    });
    userInput.value = '';
  }
});

function renderChatBubble(message, role) {
  const chatBubble = document.createElement('li');
  chatBubble.classList.add('chat-bubble', role);
  chatBubble.textContent = message;
  chatHistory.appendChild(chatBubble);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}
