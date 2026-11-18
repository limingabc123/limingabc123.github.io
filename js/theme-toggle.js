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
    document.addEventListener('DOMContentLoaded', () => {
        if (!document.querySelector('.night-sky')) {
            const sky = document.createElement('div');
            sky.className = 'night-sky';
            sky.setAttribute('aria-hidden', 'true');
            let seed = 42;
            const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
            for (let i = 0; i < 145; i++) {
                const star = document.createElement('span');
                star.className = 'night-star' + (i % 4 === 0 ? ' warm' : '');
                star.style.cssText = `left:${random()*100}%;top:${random()*100}%;--duration:${3+random()*5}s;--delay:-${random()*8}s`;
                sky.appendChild(star);
            }
            for (let i = 0; i < 5; i++) {
                const meteor = document.createElement('span');
                meteor.className = 'night-meteor';
                meteor.style.cssText = `--top:${65 + i * 7}%;--left:${3 + (i * 13) % 45}%;--period:${10 + i * 2}s;--offset:-${i * 2.7}s`;
                sky.appendChild(meteor);
            }
            document.body.prepend(sky);
        }
        apply(theme);
    });
    document.addEventListener('pjax:complete', () => apply(theme));
    document.addEventListener('click', event => {
        if (!event.target.closest('.theme-toggle')) return;
        apply(theme === 'dark' ? 'light' : 'dark');
        saved = theme;
        try { localStorage.setItem(key, theme); } catch (_) {}
    });
    media.addEventListener('change', event => { if (saved !== 'dark' && saved !== 'light') apply(event.matches ? 'dark' : 'light'); });
})();



