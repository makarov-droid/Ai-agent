(function() {
  // Инициализация Telegram WebApp
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();

  // Применяем тему
  const setTheme = () => {
    const style = document.documentElement.style;
    style.setProperty('--tg-theme-bg', tg.themeParams.bg_color || '#ffffff');
    style.setProperty('--tg-theme-text', tg.themeParams.text_color || '#000000');
    style.setProperty('--tg-theme-hint', tg.themeParams.hint_color || '#999999');
    style.setProperty('--tg-theme-link', tg.themeParams.link_color || '#2481cc');
    style.setProperty('--tg-theme-button', tg.themeParams.button_color || '#2481cc');
    style.setProperty('--tg-theme-button-text', tg.themeParams.button_text_color || '#ffffff');
    style.setProperty('--tg-theme-secondary-bg', tg.themeParams.secondary_bg_color || '#f4f4f4');
  };

  tg.onEvent('themeChanged', setTheme);
  setTheme();

  // Роутинг
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
  }

  // Главный экран
  renderCategories('все');
  renderAgents('все');

  document.getElementById('categories').addEventListener('click', (e) => {
    if (e.target.classList.contains('category-chip')) {
      const cat = e.target.dataset.category;
      renderCategories(cat);
      renderAgents(cat);
    }
  });

  document.getElementById('agents-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.agent-card');
    if (card) {
      const id = parseInt(card.dataset.id);
      showAgentDetail(id);
      showScreen('agent-screen');
      window.currentAgentId = id;
    }
  });

  document.getElementById('back-from-agent').addEventListener('click', () => {
    showScreen('home-screen');
  });

  document.getElementById('agent-detail').addEventListener('click', (e) => {
    if (e.target.id === 'chat-btn') {
      initChat(window.currentAgentId);
      showScreen('chat-screen');
    }
  });

  document.getElementById('back-from-chat').addEventListener('click', () => {
    showScreen('agent-screen');
  });

  document.getElementById('send-btn').addEventListener('click', sendMessage);
  document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
})();
