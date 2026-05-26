const agents = [
  {
    id: 1,
    name: 'Архи',
    role: 'Архитектор',
    category: 'бизнес',
    description: 'Проектирую системы любой сложности.',
    longDescription: 'Архи — стратег и архитектор. Поможет спроектировать архитектуру приложения, базы данных, выбрать технологии и предусмотреть риски.',
    exampleTasks: ['Спроектировать CRM', 'Архитектура микросервисов', 'Рефакторинг монолита']
  },
  {
    id: 2,
    name: 'Кью',
    role: 'QA Инженер',
    category: 'бизнес',
    description: 'Тестирую и нахожу баги.',
    longDescription: 'Кью проведёт тщательное тестирование, напишет чек-листы, найдёт уязвимости и граничные случаи.',
    exampleTasks: ['Тестирование API', 'Составить тест-план', 'Проверить безопасность']
  },
  {
    id: 3,
    name: 'Фикс',
    role: 'Разработчик',
    category: 'бизнес',
    description: 'Исправляю баги и пишу код.',
    longDescription: 'Фикс — мастер дебага. Быстро находит причину ошибки и предлагает исправление.',
    exampleTasks: ['Починить баг', 'Оптимизировать код', 'Написать модуль']
  },
  {
    id: 4,
    name: 'Клин',
    role: 'Чистильщик',
    category: 'бизнес',
    description: 'Привожу код в порядок.',
    longDescription: 'Клин удаляет мёртвый код, унифицирует стиль, делает проект опрятным и готовым к релизу.',
    exampleTasks: ['Рефакторинг', 'Удалить легаси', 'Настроить линтер']
  },
  {
    id: 5,
    name: 'Синк',
    role: 'DevOps',
    category: 'бизнес',
    description: 'Синхронизирую процессы и CI/CD.',
    longDescription: 'Синк отвечает за деплой, настройку окружений, CI/CD пайплайны и синхронизацию веток.',
    exampleTasks: ['Настроить CI', 'Обновить зависимости', 'Деплой на сервер']
  },
  {
    id: 6,
    name: 'ФинГуру',
    role: 'Финансовый советник',
    category: 'жизнь',
    description: 'Анализирую расходы и даю советы.',
    longDescription: 'Поможет спланировать бюджет, проанализировать траты, подскажет, как сэкономить.',
    exampleTasks: ['Анализ бюджета', 'План накоплений', 'Совет по инвестициям']
  },
  {
    id: 7,
    name: 'ЛайфКоуч',
    role: 'Коуч',
    category: 'жизнь',
    description: 'Помогаю ставить цели и достигать их.',
    longDescription: 'Коуч для личного роста: постановка целей, трекинг привычек, мотивация.',
    exampleTasks: ['Поставить цель', 'Трекер привычек', 'Еженедельный обзор']
  }
];

const categories = ['все', 'бизнес', 'жизнь'];

function renderCategories(activeCategory) {
  const container = document.getElementById('categories');
  container.innerHTML = categories.map(cat => {
    const activeClass = cat === activeCategory ? 'active' : '';
    return `<span class="category-chip ${activeClass}" data-category="${cat}">${cat}</span>`;
  }).join('');
}

function renderAgents(filterCategory = 'все') {
  const grid = document.getElementById('agents-grid');
  const filtered = filterCategory === 'все' ? agents : agents.filter(a => a.category === filterCategory);
  grid.innerHTML = filtered.map(agent => `
    <div class="agent-card" data-id="${agent.id}">
      <h3>${agent.name}</h3>
      <p>${agent.role} · ${agent.description}</p>
      <div class="agent-tags">
        <span class="tag">${agent.category}</span>
      </div>
    </div>
  `).join('');
}

function showAgentDetail(id) {
  const agent = agents.find(a => a.id === id);
  if (!agent) return;
  document.getElementById('agent-detail').innerHTML = `
    <div class="agent-detail-card">
      <h2>${agent.name}</h2>
      <p class="description">${agent.longDescription}</p>
      <h4>Примеры задач:</h4>
      <ul>${agent.exampleTasks.map(t => `<li>${t}</li>`).join('')}</ul>
      <button id="chat-btn" style="margin-top:12px; padding:10px 24px; border-radius:12px; background:var(--tg-theme-button); color:var(--tg-theme-button-text); border:none; cursor:pointer;">💬 Чат с ${agent.name}</button>
    </div>
  `;
}
