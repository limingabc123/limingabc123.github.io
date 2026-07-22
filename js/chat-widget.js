/* ============================================
   Liming's Chat Widget - AI Assistant
   架构：前端 → Cloudflare Worker 代理 → DeepSeek API
   API Key 仅存储在 Worker 环境变量中，前端不可见
   ============================================ */
(function () {
  'use strict';

  // ---- Configuration ----
  var CONFIG = {
    // Cloudflare Worker 代理地址（API Key 在服务端，前端不可见）
    defaultEndpoint: 'https://liming-chat-proxy.limingabc.workers.dev',
    defaultModel: 'deepseek-chat',
    defaultSystemPrompt:
      '你是Liming（李明）的个人AI小助理。你的职责是帮助访问Liming个人主页的访客了解Liming的背景、研究方向和成就。请用中文回复，语气友好、专业、热情。你了解以下关于Liming的信息：\n' +
      '- Liming（李明）目前是西安电子科技大学通信工程学院的博士研究生，师从Nan Cheng教授\n' +
      '- 她是UNIC（Ubiquitous Networking and Intelligent Computing Lab）实验室的成员\n' +
      '- 她在河南师范大学获得了计算机科学与技术硕士学位，师从Peiyan Yuan教授\n' +
      '- 她曾在xFusion Digital Co., Ltd.和郑州财经学院工作\n' +
      '- 主要研究方向：生成式AI、AI驱动的智能通信系统插件开发、基于Lyapunov的深度强化学习用于资源分配\n' +
      '- 研究应用场景：V2X网络、卫星通信、航空通信、移动通信\n' +
      '- 技术技能：C、Java、Go、PHP、MATLAB、Python、HTML5、CSS3、JavaScript、Git、RAG\n' +
      '- 她发表了多篇论文，包括IEEE Transactions on Emerging Topics in Computing等期刊\n' +
      '请根据以上信息回答访客的问题。如果被问到不清楚的信息，请诚实地说不知道。',
    storageKey: 'liming_chat_history',
    configKey: 'liming_chat_config',
  };

  // ---- State ----
  var state = {
    messages: [],
    isOpen: false,
    isLoading: false,
    config: {},
  };

  // ---- DOM cache ----
  var els = {};

  // ---- Init ----
  function init() {
    loadConfig();
    loadHistory();
    buildWidget();
    cacheElements();
    bindEvents();
    if (state.messages.length === 0) {
      addWelcomeMessage();
    } else {
      renderMessages();
    }
  }

  // ---- Config persistence ----
  function loadConfig() {
    try {
      var saved = localStorage.getItem(CONFIG.configKey);
      if (saved) {
        state.config = JSON.parse(saved);
        // 迁移：旧版 config 可能包含 apiKey，新版全部走后端代理
        if (state.config.apiKey) {
          delete state.config.apiKey;
        }
        // 迁移：旧版 endpoint 指向了 DeepSeek 直连，改成默认占位
        if (
          state.config.endpoint &&
          state.config.endpoint.indexOf('api.deepseek.com') !== -1
        ) {
          state.config.endpoint = CONFIG.defaultEndpoint;
        }
        if (
          state.config.endpoint &&
          state.config.endpoint.indexOf('api.openai.com') !== -1
        ) {
          state.config.endpoint = CONFIG.defaultEndpoint;
        }
        saveConfig();
      } else {
        state.config = {
          endpoint: CONFIG.defaultEndpoint,
          model: CONFIG.defaultModel,
          systemPrompt: CONFIG.defaultSystemPrompt,
        };
      }
    } catch (e) {
      state.config = {
        endpoint: CONFIG.defaultEndpoint,
        model: CONFIG.defaultModel,
        systemPrompt: CONFIG.defaultSystemPrompt,
      };
    }
  }

  function saveConfig() {
    try {
      localStorage.setItem(CONFIG.configKey, JSON.stringify(state.config));
    } catch (e) {
      /* ignore */
    }
  }

  // ---- Message persistence ----
  function loadHistory() {
    try {
      var saved = localStorage.getItem(CONFIG.storageKey);
      if (saved) {
        state.messages = JSON.parse(saved);
      }
    } catch (e) {
      state.messages = [];
    }
  }

  function saveHistory() {
    try {
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(state.messages));
    } catch (e) {
      /* ignore */
    }
  }

  // ---- Build HTML structure ----
  function buildWidget() {
    var html =
      '\
<button id="chat-toggle" aria-label="打开聊天">\
  <span class="chat-icon">💬</span>\
  <span class="close-icon">✕</span>\
</button>\
<div id="chat-panel">\
  <div id="chat-header">\
    <div class="header-left">\
      <div class="avatar">🤖</div>\
      <div class="header-info">\
        <h3>Liming的小助理</h3>\
        <div class="status"><span class="dot"></span>在线</div>\
      </div>\
    </div>\
    <div class="header-actions">\
      <button id="btn-settings" title="设置" aria-label="设置">⚙️</button>\
      <button id="btn-close-panel" title="关闭" aria-label="关闭">✕</button>\
    </div>\
  </div>\
  <div id="chat-messages"></div>\
  <div id="chat-input-area">\
    <textarea id="chat-input" rows="1" placeholder="输入消息..." aria-label="输入消息"></textarea>\
    <button id="chat-send" aria-label="发送">➤</button>\
  </div>\
  <div id="chat-settings">\
    <div class="settings-header">\
      <h3>⚙️ 设置</h3>\
      <button id="btn-close-settings" aria-label="关闭设置">✕</button>\
    </div>\
    <div class="settings-body">\
      <div class="setting-group">\
        <label>API Endpoint</label>\
        <input type="url" id="setting-endpoint" value="' +
      escapeHtml(state.config.endpoint || CONFIG.defaultEndpoint) +
      '" />\
        <div class="hint">部署的 Cloudflare Worker 地址</div>\
      </div>\
      <div class="setting-group">\
        <label>模型名称</label>\
        <input type="text" id="setting-model" value="' +
      escapeHtml(state.config.model || CONFIG.defaultModel) +
      '" />\
        <div class="hint">如 deepseek-chat, gpt-4o, qwen-plus 等</div>\
      </div>\
      <div class="setting-group">\
        <label>系统提示词</label>\
        <textarea id="setting-prompt" rows="4">' +
      escapeHtml(state.config.systemPrompt || CONFIG.defaultSystemPrompt) +
      '</textarea>\
        <div class="hint">定义 AI 助手的角色和行为</div>\
      </div>\
      <div class="settings-status" id="settings-status"></div>\
      <div class="settings-actions">\
        <button class="btn-save" id="btn-save-settings">💾 保存设置</button>\
        <button class="btn-clear" id="btn-clear-chat">🗑️ 清空对话</button>\
      </div>\
      <div class="settings-actions" style="margin-top: 6px;">\
        <button class="btn-reset" id="btn-reset-settings" style="flex: 1;">↺ 恢复默认</button>\
      </div>\
    </div>\
  </div>\
</div>';

    var container = document.createElement('div');
    container.id = 'chat-widget-container';
    container.innerHTML = html;
    document.body.appendChild(container);
  }

  // ---- Cache DOM refs ----
  function cacheElements() {
    els.toggle = document.getElementById('chat-toggle');
    els.panel = document.getElementById('chat-panel');
    els.messages = document.getElementById('chat-messages');
    els.input = document.getElementById('chat-input');
    els.send = document.getElementById('chat-send');
    els.settings = document.getElementById('chat-settings');
    els.btnSettings = document.getElementById('btn-settings');
    els.btnClosePanel = document.getElementById('btn-close-panel');
    els.btnCloseSettings = document.getElementById('btn-close-settings');
    els.btnSave = document.getElementById('btn-save-settings');
    els.btnClear = document.getElementById('btn-clear-chat');
    els.btnReset = document.getElementById('btn-reset-settings');
    els.settingEndpoint = document.getElementById('setting-endpoint');
    els.settingModel = document.getElementById('setting-model');
    els.settingPrompt = document.getElementById('setting-prompt');
    els.settingsStatus = document.getElementById('settings-status');
  }

  // ---- Bind events ----
  function bindEvents() {
    els.toggle.addEventListener('click', togglePanel);
    els.btnClosePanel.addEventListener('click', closePanel);
    els.btnSettings.addEventListener('click', openSettings);
    els.btnCloseSettings.addEventListener('click', closeSettings);
    els.btnSave.addEventListener('click', saveSettings);
    els.btnClear.addEventListener('click', clearChat);
    els.btnReset.addEventListener('click', resetSettings);
    els.send.addEventListener('click', sendMessage);
    els.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    els.input.addEventListener('input', autoResizeInput);
    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (els.settings.classList.contains('open')) {
          closeSettings();
        } else if (state.isOpen) {
          closePanel();
        }
      }
    });
    // Click outside to close
    document.addEventListener('click', function (e) {
      if (
        state.isOpen &&
        !els.panel.contains(e.target) &&
        !els.toggle.contains(e.target)
      ) {
        closePanel();
      }
    });
  }

  // ---- Toggle Panel ----
  function togglePanel() {
    if (state.isOpen) {
      closePanel();
    } else {
      openPanel();
    }
  }

  function openPanel() {
    state.isOpen = true;
    els.panel.classList.add('open');
    els.toggle.classList.add('active');
    scrollToBottom();
    els.input.focus();
  }

  function closePanel() {
    state.isOpen = false;
    els.panel.classList.remove('open');
    els.toggle.classList.remove('active');
    closeSettings();
  }

  // ---- Settings ----
  function openSettings() {
    els.settings.classList.add('open');
    els.settingsStatus.className = 'settings-status';
    els.settingsStatus.style.display = 'none';
  }

  function closeSettings() {
    els.settings.classList.remove('open');
  }

  function saveSettings() {
    state.config.endpoint = els.settingEndpoint.value.trim() || CONFIG.defaultEndpoint;
    state.config.model = els.settingModel.value.trim() || CONFIG.defaultModel;
    state.config.systemPrompt = els.settingPrompt.value.trim() || CONFIG.defaultSystemPrompt;
    saveConfig();
    showSettingsStatus('✅ 设置已保存', 'success');
    // Add a small delay then close settings
    setTimeout(function () {
      closeSettings();
    }, 800);
  }

  function resetSettings() {
    state.config = {
      endpoint: CONFIG.defaultEndpoint,
      model: CONFIG.defaultModel,
      systemPrompt: CONFIG.defaultSystemPrompt,
    };
    els.settingEndpoint.value = CONFIG.defaultEndpoint;
    els.settingModel.value = CONFIG.defaultModel;
    els.settingPrompt.value = CONFIG.defaultSystemPrompt;
    saveConfig();
    showSettingsStatus('✅ 已恢复默认设置', 'success');
  }

  function showSettingsStatus(msg, type) {
    els.settingsStatus.textContent = msg;
    els.settingsStatus.className = 'settings-status ' + type;
    els.settingsStatus.style.display = 'block';
  }

  // ---- Clear Chat ----
  function clearChat() {
    state.messages = [];
    saveHistory();
    els.messages.innerHTML = '';
    addWelcomeMessage();
    showSettingsStatus('✅ 对话已清空', 'success');
  }

  // ---- Welcome Message ----
  function addWelcomeMessage() {
    var div = document.createElement('div');
    div.className = 'welcome-msg';
    div.innerHTML =
      '<div class="welcome-icon">👋</div>' +
      '<h4>你好！我是 Liming 的小助理 🤖</h4>' +
      '<p>我可以帮你了解Liming的背景、研究方向、论文发表等信息。<br>有什么想问的吗？</p>';
    els.messages.appendChild(div);
  }

  // ---- Render Messages ----
  function renderMessages() {
    els.messages.innerHTML = '';
    if (state.messages.length <= 1) {
      // Only system message, show welcome
      addWelcomeMessage();
      return;
    }
    state.messages.forEach(function (msg) {
      if (msg.role === 'system') return;
      if (msg.role === 'user') {
        appendMessageUI('user', msg.content);
      } else if (msg.role === 'assistant') {
        appendMessageUI('bot', msg.content);
      }
    });
    scrollToBottom();
  }

  // ---- Append message to UI ----
  function appendMessageUI(role, text) {
    var container = document.createElement('div');
    container.className = 'message ' + role;

    var avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = role === 'user' ? '👤' : '🤖';

    var bubble = document.createElement('div');
    bubble.className = 'msg-content';

    if (role === 'bot') {
      bubble.innerHTML = renderMarkdown(text);
    } else {
      bubble.textContent = text;
    }

    container.appendChild(avatar);
    container.appendChild(bubble);
    els.messages.appendChild(container);
    scrollToBottom();
  }

  // ---- Update bot message (for streaming) ----
  function updateBotMessage(el, text) {
    if (!el) return;
    var content = el.querySelector('.msg-content');
    if (content) {
      content.innerHTML = renderMarkdown(text);
    }
    scrollToBottom();
  }

  // ---- Remove typing indicator ----
  function removeTypingIndicator() {
    var typing = document.querySelector('.typing-indicator');
    if (typing) typing.remove();
  }

  // ---- Show typing indicator ----
  function showTypingIndicator() {
    var div = document.createElement('div');
    div.className = 'typing-indicator';
    div.innerHTML =
      '<div class="dots"><span></span><span></span><span></span></div>';
    els.messages.appendChild(div);
    scrollToBottom();
  }

  // ---- Send Message ----
  function sendMessage() {
    var text = els.input.value.trim();
    if (!text) return;
    if (state.isLoading) return;

    // Remove welcome message if it exists
    var welcome = els.messages.querySelector('.welcome-msg');
    if (welcome) welcome.remove();

    // Check if endpoint is configured
    if (!state.config.endpoint || state.config.endpoint.indexOf('YOUR-WORKER') !== -1) {
      appendMessageUI('error', '⚠️ 请先在设置中配置后端代理地址（Cloudflare Worker URL）。');
      return;
    }

    // Add user message
    appendMessageUI('user', text);
    els.input.value = '';
    autoResizeInput();

    // Build messages array for API
    var apiMessages = [];
    // System prompt
    if (state.config.systemPrompt) {
      apiMessages.push({ role: 'system', content: state.config.systemPrompt });
    }
    // Conversation history (last 20 messages to limit context)
    var historyMessages = state.messages.filter(function (m) {
      return m.role !== 'system';
    });
    var recentHistory = historyMessages.slice(-20);
    recentHistory.forEach(function (m) {
      apiMessages.push({ role: m.role, content: m.content });
    });
    // Current message
    apiMessages.push({ role: 'user', content: text });

    // Save to state
    state.messages.push({ role: 'user', content: text });
    saveHistory();

    // Add bot placeholder
    var botEl = document.createElement('div');
    botEl.className = 'message bot';
    botEl.innerHTML =
      '<div class="msg-avatar">🤖</div><div class="msg-content"></div>';
    els.messages.appendChild(botEl);

    var botContent = '';
    state.isLoading = true;
    els.send.disabled = true;
    showTypingIndicator();

    // Call API
    callAPI(apiMessages)
      .then(function (fullText) {
        removeTypingIndicator();
        updateBotMessage(botEl, fullText);
        state.messages.push({ role: 'assistant', content: fullText });
        saveHistory();
        state.isLoading = false;
        els.send.disabled = false;
      })
      .catch(function (err) {
        removeTypingIndicator();
        botEl.remove();
        appendMessageUI('error', '⚠️ ' + err.message);
        state.isLoading = false;
        els.send.disabled = false;
        // Remove the user message from state since API failed
        state.messages.pop();
        saveHistory();
      });
  }

  // ---- API Call (通过后端代理，API Key 在服务端) ----
  function callAPI(apiMessages) {
    return new Promise(function (resolve, reject) {
      var endpoint = state.config.endpoint || CONFIG.defaultEndpoint;
      var model = state.config.model || CONFIG.defaultModel;

      if (!endpoint) {
        reject(new Error('请先在设置中配置后端代理地址'));
        return;
      }

      var xhr = new XMLHttpRequest();
      xhr.open('POST', endpoint, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              var resp = JSON.parse(xhr.responseText);
              var text =
                resp.choices &&
                resp.choices[0] &&
                resp.choices[0].message &&
                resp.choices[0].message.content;
              if (text) {
                resolve(text);
              } else {
                reject(new Error('API 返回格式异常'));
              }
            } catch (e) {
              reject(new Error('解析响应失败: ' + e.message));
            }
          } else {
            var errMsg = 'API 请求失败 (HTTP ' + xhr.status + ')';
            try {
              var errResp = JSON.parse(xhr.responseText);
              if (errResp.error && errResp.error.message) {
                errMsg += ': ' + errResp.error.message;
              }
            } catch (e) {
              /* ignore */
            }
            reject(new Error(errMsg));
          }
        }
      };

      xhr.onerror = function () {
        reject(new Error('网络请求失败，请检查代理地址是否正确'));
      };

      xhr.ontimeout = function () {
        reject(new Error('请求超时，请稍后重试'));
      };

      xhr.timeout = 60000;

      var body = JSON.stringify({
        model: model,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 4096,
        stream: false,
      });

      xhr.send(body);
    });
  }

  // ---- Markdown Renderer (Simple) ----
  function renderMarkdown(text) {
    if (!text) return '';
    var html = text;

    // Escape HTML first
    html = escapeHtml(html);

    // Code blocks (must be before inline code)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function (_, lang, code) {
      var langClass = lang ? ' class="language-' + lang + '"' : '';
      return (
        '<pre><code' +
        langClass +
        '>' +
        code.trim() +
        '</code></pre>'
      );
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');

    // Bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );

    // Unordered lists
    html = html.replace(/^[\s]*[-*+]\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Ordered lists
    html = html.replace(/^[\s]*\d+\.\s+(.+)$/gm, '<li>$1</li>');

    // Line breaks (double newline = paragraph)
    html = html.replace(/\n\n/g, '</p><p>');

    // Single line breaks
    html = html.replace(/\n/g, '<br>');

    // Wrap in paragraph if not already
    if (!html.startsWith('<')) {
      html = '<p>' + html + '</p>';
    }

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');

    // Fix nested paragraphs in list items
    html = html.replace(/<li>(.*?)<\/li>/g, function (_, content) {
      return '<li>' + content.replace(/<\/?p>/g, '').replace(/<br>/g, '') + '</li>';
    });

    // Fix ul/li with br
    html = html.replace(/<ul>\s*<br>/g, '<ul>');
    html = html.replace(/<\/li>\s*<br>/g, '</li>');

    return html;
  }

  // ---- Utility: escape HTML ----
  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ---- Utility: auto-resize textarea ----
  function autoResizeInput() {
    els.input.style.height = 'auto';
    els.input.style.height = Math.min(els.input.scrollHeight, 100) + 'px';
  }

  // ---- Utility: scroll to bottom ----
  function scrollToBottom() {
    requestAnimationFrame(function () {
      els.messages.scrollTop = els.messages.scrollHeight;
    });
  }

  // ---- Run on DOM ready ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
