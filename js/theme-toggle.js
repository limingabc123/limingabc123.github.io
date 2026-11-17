(() => {
    const key = 'liming-color-theme';
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    let saved;
    try { saved = localStorage.getItem(key); } catch (_) {}
    let theme = saved === 'light' || saved === 'dark' ? saved : (media.matches ? 'dark' : 'light');
    function apply(value) {
        theme = value;
        document.documentElement.dataset.theme = value;
        document.querySelectorAll('.theme-toggle').forEach(button => {
            const dark = value === 'dark';
            button.setAttribute('aria-pressed', String(dark));
            button.setAttribute('aria-label', dark ? '切换为浅色主题' : '切换为深色主题');
            button.title = button.getAttribute('aria-label');
            button.querySelector('i').className = dark ? 'fas fa-sun' : 'fas fa-moon';
        });
    }
    apply(theme);
    document.addEventListener('DOMContentLoaded', () => apply(theme));
    document.addEventListener('pjax:complete', () => apply(theme));
    document.addEventListener('click', event => {
        if (!event.target.closest('.theme-toggle')) return;
        apply(theme === 'dark' ? 'light' : 'dark');
        saved = theme;
        try { localStorage.setItem(key, theme); } catch (_) {}
    });
    media.addEventListener('change', event => { if (saved !== 'dark' && saved !== 'light') apply(event.matches ? 'dark' : 'light'); });
})();
