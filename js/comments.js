(() => {
    'use strict';
    const root = document.getElementById('twikoo');
    if (!root || !root.dataset.envId || root.dataset.initialized) return;
    root.dataset.initialized = 'true';
    function fail() {
        root.replaceChildren();
        const message = document.createElement('p');
        message.setAttribute('role', 'alert');
        message.textContent = '评论加载失败，请检查网络或稍后重试。';
        const retry = document.createElement('button');
        retry.className = 'button is-small';
        retry.textContent = '重新加载';
        retry.onclick = () => location.reload();
        root.append(message, retry);
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/twikoo@2.0.17/dist/twikoo.min.js';
    script.onerror = fail;
    script.onload = () => {
        Promise.resolve().then(() => window.twikoo.init({
            envId: root.dataset.envId,
            el: '#twikoo',
            path: root.dataset.path,
            lang: 'zh-CN'
        })).catch(fail);
    };
    document.head.append(script);
})();
