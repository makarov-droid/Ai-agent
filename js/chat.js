let chatAgentName = '';

// ⚠️ После деплоя бэкенда замени этот URL на реальный (например https://gstack-api.onrender.com)
const API_BASE = 'https://ai-agent-9w6a.onrender.com';

function initChat(agentId) {
  const agent = agents.find(a => a.id === agentId);
  if (!agent) return;
  chatAgentName = agent.name;
  document.getElementById('chat-agent-name').textContent = agent.name;
  document.getElementById('messages').innerHTML = '';
  // Приветственное сообщение от агента
  addMessage('agent', `Привет! Я ${agent.name}, ${agent.role}. Чем могу помочь?`);
}

async function sendMessage() {
  const input = document.getElementById('message-input');
  const text = input.value.trim();
  if (!text) return;

  addMessage('user', text);
  input.value = '';

  const typingId = addTypingIndicator();

  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentName: chatAgentName, message: text })
    });

    removeTypingIndicator(typingId);

    if (!response.ok) {
      throw new Error('Ошибка сети');
    }

    const data = await response.json();
    addMessage('agent', data.reply);
  } catch (error) {
    removeTypingIndicator(typingId);
    addMessage('agent', 'Извини, произошла ошибка. Попробуй позже.');
    console.error(error);
  }
}

function addMessage(type, text) {
  const messagesDiv = document.getElementById('messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${type}`;
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addTypingIndicator() {
  const messagesDiv = document.getElementById('messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message agent typing';
  typingDiv.textContent = '...';
  typingDiv.id = 'typing-' + Date.now();
  messagesDiv.appendChild(typingDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  return typingDiv.id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
