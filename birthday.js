(() => {
  const dateKey = () => new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date());
  const initialDate = dateKey();
  const checkDate = () => { if (dateKey() !== initialDate) location.reload(); };
  setInterval(checkDate, 30000);
  document.addEventListener('visibilitychange', checkDate);
  if (initialDate !== '2026-09-13') return;
  document.title = 'Xou da Bibs • Feliz aniversário!';
  document.querySelector('meta[name="theme-color"]').content = '#0645a3';
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'birthday.css?v=20260913';
  document.head.appendChild(stylesheet);
  document.body.className = 'birthday';
  document.body.innerHTML = `
    <main class="birthday-stage">
      <header class="birthday-header">
        <p class="birthday-date">★ 13 DE SETEMBRO • DIA DA BIBS ★</p>
        <h1 class="birthday-logo"><span>XOU</span><small>★ DA ★</small><span>BIBS</span></h1>
        <p class="birthday-subtitle">Hoje o xou é todo seu, Bibs!</p>
      </header>
      <section class="birthday-card" aria-labelledby="song-title">
        <div class="birthday-cake" aria-hidden="true">🎂</div>
        <p class="birthday-label">A MÚSICA DE HOJE</p>
        <h2 id="song-title">Parabéns da Xuxa</h2>
        <p id="artist">Xuxa</p>
        <div class="birthday-player" aria-label="Player da música de aniversário">
          <button id="play-button" type="button" aria-label="Tocar música">▶</button>
          <input id="progress" type="range" min="0" max="100" value="0" step="0.1" aria-label="Progresso da música">
          <div class="birthday-times"><span id="current-time">0:00</span><span id="duration">0:00</span></div>
          <audio id="audio" preload="metadata"></audio>
        </div>
        <p id="note" hidden></p><p id="today" hidden></p>
      </section>
      <p class="birthday-ribbon">★ Feliz aniversário, Bibs! ★</p>
      <aside class="birthday-message" aria-label="Mensagem para a Bibs">
        <p>Hoje é seu dia que dia mais feliz bibi, te amo muito e textin no zap se quiser</p>
      </aside>
    </main>`;
})();
