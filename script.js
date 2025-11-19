// Basic interactive JS: theme toggle, filter projects, modal
document.addEventListener('DOMContentLoaded', function() {
  // theme
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme') || 'light';
  setTheme(saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  });

  function setTheme(name) {
    if (name === 'dark') {
      root.setAttribute('data-theme','dark');
      toggle.textContent = '☀️';
    } else {
      root.setAttribute('data-theme','light');
      toggle.textContent = '🌙';
    }
  }

  // Filters
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#project-grid .card');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      cards.forEach(c => {
        const tags = c.getAttribute('data-tags').split(' ');
        if (f === 'all' || tags.includes(f)) {
          c.style.display = '';
        } else {
          c.style.display = 'none';
        }
      });
    });
  });

  // Modal
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalLink = document.getElementById('modal-link');
  const openBtns = document.querySelectorAll('.open-project');
  const modalClose = document.getElementById('modal-close');

  openBtns.forEach(b => {
    b.addEventListener('click', () => {
      modalTitle.textContent = b.dataset.title;
      modalDesc.textContent = b.dataset.desc;
      modalLink.href = b.dataset.link || '#';
      modal.setAttribute('aria-hidden','false');
    });
  });

  modalClose.addEventListener('click', () => {
    modal.setAttribute('aria-hidden','true');
  });

  // footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});
