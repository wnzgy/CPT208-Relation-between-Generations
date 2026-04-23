(function () {
  var AudioCtxCtor = window.AudioContext || window.webkitAudioContext;
  var storageKey = 'timelens-audio-v3';
  var playbackKey = 'timelens-audio-playback-v1';
  var defaults = {
    enabled: true,
    bgm: true,
    sfx: true,
    volume: 0.28
  };

  var saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
  } catch (_) {
    saved = null;
  }

  var state = Object.assign({}, defaults, saved || {});
  state.volume = Math.max(0, Math.min(1, Number(state.volume) || defaults.volume));

  var uiOpen = false;
  var booted = false;
  var sfxCtx = null;
  var bgm = null;
  var resumeAfterHidden = false;
  var lastSavedSecond = -1;
  var pendingResumeTime = 0;

  function readPlayback() {
    try {
      return JSON.parse(localStorage.getItem(playbackKey) || 'null');
    } catch (_) {
      return null;
    }
  }

  function writePlayback(payload) {
    localStorage.setItem(playbackKey, JSON.stringify(payload));
  }

  (function restorePlaybackTime() {
    var savedPlayback = readPlayback();
    if (!savedPlayback) return;
    if (!Number.isFinite(savedPlayback.time)) return;
    pendingResumeTime = Math.max(0, Number(savedPlayback.time));
  })();

  var scriptBase = (function () {
    var script = document.currentScript;
    if (script && script.src) return new URL('.', script.src);
    return new URL('./', window.location.href);
  })();

  var track = {
    title: 'Morning',
    artist: 'Kevin MacLeod',
    license: 'CC BY 4.0',
    sourcePage: 'https://incompetech.com/music/royalty-free/music.html',
    url: new URL('../audio/morning-kevin-macleod.mp3', scriptBase).href
  };

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function rememberPlayback(isPlaying) {
    if (!bgm) return;
    writePlayback({
      time: Number.isFinite(bgm.currentTime) ? Number(bgm.currentTime) : 0,
      isPlaying: !!isPlaying,
      updatedAt: Date.now()
    });
  }

  function ensureSfxCtx() {
    if (!AudioCtxCtor) return null;
    if (!sfxCtx) sfxCtx = new AudioCtxCtor();
    if (sfxCtx.state === 'suspended') sfxCtx.resume();
    return sfxCtx;
  }

  function playTone(freq, duration, gainAmount, type, startOffset) {
    var ctx = ensureSfxCtx();
    if (!ctx) return;
    var now = ctx.currentTime + (startOffset || 0);
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, gainAmount), now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function ensureBgm() {
    if (bgm) return bgm;
    bgm = new Audio(track.url);
    bgm.loop = true;
    bgm.preload = 'auto';
    bgm.volume = state.volume;
    bgm.setAttribute('aria-hidden', 'true');

    function applyResumeTime() {
      if (!Number.isFinite(pendingResumeTime) || pendingResumeTime <= 0) return;
      try {
        var duration = Number(bgm.duration);
        var seekTime = pendingResumeTime;
        if (Number.isFinite(duration) && duration > 0) {
          seekTime = seekTime % duration;
        }
        bgm.currentTime = seekTime;
      } catch (_) {
        return;
      }
      pendingResumeTime = 0;
    }

    bgm.addEventListener('loadedmetadata', applyResumeTime);
    if (bgm.readyState >= 1) applyResumeTime();

    bgm.addEventListener('timeupdate', function () {
      if (bgm.paused) return;
      var second = Math.floor(bgm.currentTime || 0);
      if (second !== lastSavedSecond) {
        lastSavedSecond = second;
        rememberPlayback(true);
      }
    });

    return bgm;
  }

  function startBgm() {
    if (!state.enabled || !state.bgm) return;
    var player = ensureBgm();
    player.volume = state.volume;
    player.play()
      .then(function () {
        rememberPlayback(true);
      })
      .catch(function () {
        // Browser autoplay restrictions are expected before user gesture.
      });
  }

  function stopBgm(keepPlayingIntent) {
    if (!bgm) return;
    rememberPlayback(!!keepPlayingIntent);
    bgm.pause();
  }

  function refreshAudio() {
    if (!state.enabled || !state.bgm) {
      stopBgm(false);
      return;
    }
    startBgm();
  }

  function playClickSfx() {
    if (!state.enabled || !state.sfx) return;
    playTone(680, 0.07, state.volume * 0.05, 'triangle', 0.0);
    playTone(920, 0.06, state.volume * 0.035, 'sine', 0.03);
  }

  function buildUi() {
    if (document.getElementById('audio-hud')) return;

    var style = document.createElement('style');
    style.id = 'audio-hud-style';
    style.textContent = [
      '.audio-hud{position:fixed;right:14px;bottom:14px;z-index:2800;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;}',
      '.audio-pill{border:1px solid rgba(148,163,184,.35);background:rgba(15,23,42,.82);color:#fff;border-radius:999px;padding:10px 14px;font-size:12px;font-weight:700;cursor:pointer;backdrop-filter:blur(10px);}',
      '.audio-panel{margin-top:8px;min-width:232px;border:1px solid rgba(148,163,184,.35);background:rgba(15,23,42,.93);color:#e2e8f0;border-radius:14px;padding:12px;display:none;box-shadow:0 16px 36px rgba(2,6,23,.45);}',
      '.audio-panel.open{display:block;}',
      '.audio-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px;font-size:12px;}',
      '.audio-row:last-child{margin-bottom:0;}',
      '.audio-row input[type="range"]{width:120px;}',
      '.audio-row label{display:flex;align-items:center;gap:8px;cursor:pointer;}',
      '.audio-credit{margin-top:8px;padding-top:8px;border-top:1px solid rgba(148,163,184,.2);font-size:11px;line-height:1.35;color:#cbd5e1;}',
      '.audio-credit a{color:#a5b4fc;text-underline-offset:2px;}',
      '@media (max-width:768px){.audio-hud{right:10px;bottom:10px;}.audio-panel{min-width:202px;}}'
    ].join('');
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.className = 'audio-hud';
    wrap.id = 'audio-hud';
    wrap.innerHTML = [
      '<button id="audio-pill" class="audio-pill" type="button">♪ Audio: On</button>',
      '<div id="audio-panel" class="audio-panel">',
      '<div class="audio-row"><label><input id="audio-enabled" type="checkbox"> Audio Enabled</label></div>',
      '<div class="audio-row"><label><input id="audio-bgm" type="checkbox"> Warm Music</label></div>',
      '<div class="audio-row"><label><input id="audio-sfx" type="checkbox"> Click SFX</label></div>',
      '<div class="audio-row"><span>Volume</span><input id="audio-volume" type="range" min="0" max="100" step="1"></div>',
      '<div class="audio-credit">',
      'Track: <strong>' + track.title + '</strong> - ' + track.artist + '<br>',
      'License: ' + track.license + ' · <a href="' + track.sourcePage + '" target="_blank" rel="noopener noreferrer">source</a>',
      '</div>',
      '</div>'
    ].join('');
    document.body.appendChild(wrap);

    var pill = document.getElementById('audio-pill');
    var panel = document.getElementById('audio-panel');
    var enabledInput = document.getElementById('audio-enabled');
    var bgmInput = document.getElementById('audio-bgm');
    var sfxInput = document.getElementById('audio-sfx');
    var volumeInput = document.getElementById('audio-volume');

    function render() {
      pill.textContent = state.enabled ? '♪ Audio: On' : '♪ Audio: Off';
      enabledInput.checked = state.enabled;
      bgmInput.checked = state.bgm;
      sfxInput.checked = state.sfx;
      volumeInput.value = String(Math.round(state.volume * 100));
      panel.classList.toggle('open', uiOpen);
    }

    pill.addEventListener('click', function () {
      uiOpen = !uiOpen;
      render();
    });

    enabledInput.addEventListener('change', function () {
      state.enabled = enabledInput.checked;
      if (!state.enabled) rememberPlayback(false);
      saveState();
      refreshAudio();
      render();
    });

    bgmInput.addEventListener('change', function () {
      state.bgm = bgmInput.checked;
      if (!state.bgm) rememberPlayback(false);
      saveState();
      refreshAudio();
      render();
    });

    sfxInput.addEventListener('change', function () {
      state.sfx = sfxInput.checked;
      saveState();
      render();
    });

    volumeInput.addEventListener('input', function () {
      state.volume = Math.max(0, Math.min(1, Number(volumeInput.value) / 100));
      if (bgm) bgm.volume = state.volume;
      saveState();
    });

    document.addEventListener('click', function (event) {
      if (!wrap.contains(event.target)) {
        uiOpen = false;
        render();
      }
    });

    render();
    refreshAudio();
  }

  function lazyBoot() {
    if (booted) return;
    booted = true;
    ensureSfxCtx();
    refreshAudio();
  }

  window.addEventListener('pointerdown', lazyBoot, { once: true });
  window.addEventListener('keydown', lazyBoot, { once: true });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      resumeAfterHidden = !!(bgm && !bgm.paused);
      stopBgm(resumeAfterHidden);
      return;
    }
    if (resumeAfterHidden) refreshAudio();
    resumeAfterHidden = false;
  });

  window.addEventListener('pagehide', function () {
    if (bgm) rememberPlayback(!bgm.paused);
  });

  window.addEventListener('beforeunload', function () {
    if (bgm) rememberPlayback(!bgm.paused);
  });

  document.addEventListener(
    'click',
    function (event) {
      var target = event.target;
      if (!target) return;
      if (!target.closest('button, a, [role="button"], input[type="submit"], input[type="checkbox"], input[type="range"]')) return;
      playClickSfx();
    },
    true
  );

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildUi);
  } else {
    buildUi();
  }
})();
