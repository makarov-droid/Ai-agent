function initChat(agentId) {
  const agent = agents.find(a => a.id === agentId);
  if (!agent) return;
  document.getElementById('chat-agent-name').textContent = agent.name;
  document.getElementById('messages').innerHTML = '';
}

function sendMessage() {
  const input = document.getElementById('message-input');
  const text = input.value.trim();
  if (!text) return;
  
  addMessage('user', text);
  input.value = '';
  
  // Эхо-ответ (заглушка)
  setTimeout(() => {
    addMessage('agent', `Вы сказали: "${text}". Я пока учусь, но скоро смогу помочь по-настоящему!`);
  }, 500);
}

function addMessage(type, text) {
  const messagesDiv = document.getElementById('messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${type}`;
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
