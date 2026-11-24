export function mountVoice(els, state, resize) {
  const bar = document.createElement('div');
  bar.className = 'chat-voice-bar';
  bar.innerHTML = '<button type="button" aria-pressed="false">🎙 Speak</button><select aria-label="Speech language"><option value="en-US">English</option><option value="zh-CN">中文</option></select><label><input type="checkbox"> Auto read</label><button type="button">■ Stop</button><span role="status" aria-live="polite"></span>';
  els.input.parentElement.before(bar);
  const [mic, stop] = bar.querySelectorAll('button');
  const lang = bar.querySelector('select'), auto = bar.querySelector('input'), status = bar.querySelector('span');
  const synth = window.speechSynthesis, Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let session = null, timer, playbackTimer, utterance = null, current = null, generation = 0;
  let voices = synth ? synth.getVoices() : [];
  if (synth) synth.addEventListener("voiceschanged", () => { voices = synth.getVoices(); });
  const test = document.createElement("button"); test.type = "button"; test.textContent = "🔊 Test voice";
  bar.insertBefore(test, status);
  test.onclick = () => read(lang.value === "zh-CN" ? "你好，我是小茗，很高兴认识你。" : "Hello, I am Ming. Nice to meet you.", test);
  try { lang.value = localStorage.ming_voice_language || 'en-US'; auto.checked = localStorage.ming_voice_auto === 'true'; } catch (_) {}
  function halt() {
    generation++; clearTimeout(timer); clearTimeout(playbackTimer);
    const old = session; session = null; if (old) old.abort();
    if (synth) synth.cancel();
    utterance = null;
    if (current) current.textContent = '🔊 Read'; current = null;
    mic.textContent = '🎙 Speak'; mic.setAttribute('aria-pressed', 'false');
    els.input.readOnly = false; els.floatingBot.dataset.voice = ''; status.textContent = '';
  }
  lang.onchange = () => { halt(); try { localStorage.ming_voice_language = lang.value; } catch (_) {} };
  auto.onchange = () => { try { localStorage.ming_voice_auto = auto.checked; } catch (_) {} if (!auto.checked) halt(); };
  function read(text, button) {
    if (current === button && button) { halt(); return; }
    halt(); if (!synth) { status.textContent = '当前浏览器不支持朗读，请用系统浏览器打开。'; return; }
    const token = generation;
    const speech = new SpeechSynthesisUtterance(text.replace(/```[\s\S]*?```/g, ' ').replace(/[#*_`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'));
    speech.lang = /[\u3400-\u9fff]/.test(text) ? 'zh-CN' : 'en-US';
    voices = synth.getVoices();
    const voice = voices.find(v => v.lang.toLowerCase() === speech.lang.toLowerCase()) || voices.find(v => v.lang.slice(0, 2) === speech.lang.slice(0, 2));
    if (voice) speech.voice = voice;
    current = button; if (button) button.textContent = '■ Stop';
    utterance = speech; speech.volume = 1; speech.rate = 1;
    status.textContent = '正在启动语音…';
    playbackTimer = setTimeout(() => { if (generation === token) { halt(); status.textContent = '语音未启动：请用 Safari / Chrome 打开，并检查媒体音量和系统语音。'; } }, 6000);
    speech.onstart = () => { if (generation !== token) return; clearTimeout(playbackTimer); els.floatingBot.dataset.voice = 'speaking'; status.textContent = '正在朗读…'; };
    speech.onend = () => { if (generation === token) halt(); };
    speech.onerror = event => { if (generation === token) { halt(); status.textContent = '朗读失败（' + event.error + '），请尝试系统浏览器或检查系统语音。'; } };
    try { synth.resume(); synth.speak(speech); } catch (_) { halt(); status.textContent = '无法启动朗读，请使用系统浏览器重试。'; }
  }
  mic.onclick = () => {
    if (session) { session.stop(); return; }
    halt(); if (!Recognition) return;
    const base = els.input.value, rec = new Recognition(); session = rec;
    rec.lang = lang.value; rec.interimResults = true; rec.continuous = false;
    els.input.readOnly = true; mic.textContent = '■ Finish'; mic.setAttribute('aria-pressed', 'true');
    status.textContent = 'Listening…'; els.floatingBot.dataset.voice = 'listening';
    rec.onresult = event => {
      if (session !== rec) return;
      let text = ''; for (let i = 0; i < event.results.length; i++) text += event.results[i][0].transcript;
      els.input.value = base + (base && !/\s$/.test(base) ? ' ' : '') + text; resize();
    };
    rec.onerror = event => {
      if (session !== rec) return; halt();
      status.textContent = ({'not-allowed':'Microphone permission denied. You can still type.', 'no-speech':'No speech detected. Please retry.', network:'Recognition service unavailable. Please type or retry.', 'audio-capture':'No microphone available.'})[event.error] || 'Voice input failed. Please retry or type.';
    };
    rec.onend = () => { if (session === rec) { halt(); status.textContent = 'Review your text, then send.'; } };
    try { rec.start(); timer = setTimeout(() => { if (session === rec) rec.stop(); }, 60000); }
    catch (_) { halt(); status.textContent = 'Unable to start microphone. Please retry.'; }
  };
  stop.onclick = halt;
  document.addEventListener('chat-voice-stop', halt);
  document.addEventListener('visibilitychange', () => { if (document.hidden) halt(); });
  window.addEventListener('pagehide', halt);
  function addRead(element, text) {
    if (!synth || element.querySelector('.voice-read')) return;
    const button = document.createElement('button'); button.type = 'button'; button.className = 'voice-read'; button.textContent = '🔊 Read';
    button.setAttribute('aria-label', 'Read answer or stop playback'); button.onclick = () => read(text, button);
    element.querySelector('.msg-content').appendChild(button); return button;
  }
  els.messages.querySelectorAll('.message.bot').forEach(el => addRead(el, el.querySelector('.msg-content').textContent));
  document.addEventListener('chat-voice-reply', event => {
    const button = addRead(event.detail.element, event.detail.text);
    if (auto.checked && state.isOpen && !document.hidden) read(event.detail.text, button);
  });
  if (!Recognition || !window.isSecureContext) { mic.disabled = true; status.textContent = 'Voice input unavailable in this browser; you can still type.'; }
  if (!synth) { auto.disabled = true; auto.checked = false; }
}
