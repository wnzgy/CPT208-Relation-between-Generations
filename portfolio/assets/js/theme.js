(function () {
  const storageKey = 'timelens-theme';
  const root = document.documentElement;

  function preferredTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-theme-label]').forEach((el) => {
      el.textContent = theme === 'dark' ? 'Light' : 'Dark';
    });
    // Force a repaint (gentle reflow) to fix Safari stuck-render bugs with backdrop-filters
    if (document.body) {
      document.body.style.transform = 'translateZ(0)';
      setTimeout(() => { if (document.body) document.body.style.transform = ''; }, 50);
    }
  }

  const saved = localStorage.getItem(storageKey);
  applyTheme(saved || preferredTheme());

  document.addEventListener('click', function (event) {
    const btn = event.target.closest('[data-theme-toggle]');
    if (!btn) return;
    event.preventDefault();
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(storageKey, nextTheme);
    
    // Force a page reload to guarantee the new theme applies perfectly across all cached stylesheets
    window.location.reload();
  });
})();
