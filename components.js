// Carrega fonte Inter
(function () {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap';
  document.head.appendChild(link);
})();

document.addEventListener('DOMContentLoaded', function () {
(function () {
  var NAV = [
    { group: 'Dados funcionais' },
    { label: 'Ficha funcional',           href: 'ficha_funcional_readonly_1.html' },
    { label: 'Outros vínculos',           href: '#' },
    { group: 'Financeiro' },
    { label: 'Contracheques',             href: 'contracheque_3.html' },
    { label: 'Fichas financeiras',        href: 'fichas_financeiras.html' },
    { label: 'Consignações',              href: 'consignacoes_2.html' },
    { label: 'Comprovante de rendimentos',href: 'comprovante_rendimentos_1.html' },
    { label: 'Simulador de proventos',    href: 'simulador_proventos_4.html' },
    { group: 'Previdência e carreira' },
    { label: 'Extrato previdenciário',    href: 'extrato_previdenciario_2.html' },
    { label: 'Tempo de serviço',          href: 'tempo_servico.html' },
    { label: 'Previsão de aposentadoria', href: 'previsao_aposentadoria_3.html' },
    { label: 'Períodos aquisitivos',      href: 'periodos_aquisitivos.html' },
    { group: 'Frequência e ponto' },
    { label: 'Cartão ponto',              href: 'cartao_ponto_2.html' },
    { label: 'Frequência',                href: '#' },
    { group: 'Institucional' },
    { label: 'Eleições',                  href: '#' },
    { label: 'Doações',                   href: '#', muted: true },
  ];

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // fechar painel ao clicar fora
  document.addEventListener('click', function (e) {
    var wrap = document.getElementById('rh-ponto-wrap');
    var painel = document.getElementById('rh-ponto-panel');
    if (painel && painel.classList.contains('open') && wrap && !wrap.contains(e.target)) {
      fecharPonto();
    }
  });

  // ── Header ────────────────────────────────────────────────────────────────
  var headerEl = document.getElementById('rh-header');
  if (headerEl) {
    headerEl.outerHTML =
      '<header class="app-header">' +
        '<div class="app-logo"><span class="logo-rh">RH</span><span class="logo-rest">24Horas</span></div>' +
        '<div class="header-spacer"></div>' +

        // Botão de ponto
        '<div class="header-ponto-wrap" id="rh-ponto-wrap">' +
          '<button class="header-ponto-btn" id="rh-ponto-btn">' +
            '<svg width="14" height="14" viewBox="0 0 16 16" fill="none">' +
              '<circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/>' +
              '<path d="M8 4.5V8l2.5 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
            ' Registrar ponto ' +
            '<span class="ponto-status-pill" id="rh-ponto-pill">0 hoje</span>' +
          '</button>' +
          '<div class="ponto-panel" id="rh-ponto-panel">' +
            '<div class="ponto-panel-header">' +
              '<span class="ponto-panel-title">Marcações de ponto</span>' +
              '<span class="ponto-panel-data" id="rh-panel-data"></span>' +
            '</div>' +
            '<div class="ponto-relogio-wrap">' +
              '<div class="ponto-relogio">' +
                '<span id="rh-relogio-hm">--:--</span><span class="ponto-relogio-seg" id="rh-relogio-s">:--</span>' +
              '</div>' +
              '<div class="ponto-relogio-label">hora atual</div>' +
            '</div>' +
            '<div class="ponto-marcacoes">' +
              '<div class="ponto-marcacoes-label">Registros de hoje</div>' +
              '<div class="ponto-chips" id="rh-chips"></div>' +
            '</div>' +
            '<div class="ponto-resumo">' +
              '<div class="ponto-resumo-item">' +
                '<span class="ponto-resumo-label">Trabalhado</span>' +
                '<span class="ponto-resumo-val ok" id="rh-trabalhado">00:00</span>' +
              '</div>' +
              '<div class="ponto-resumo-item">' +
                '<span class="ponto-resumo-label">C.H. diária</span>' +
                '<span class="ponto-resumo-val">08:00</span>' +
              '</div>' +
              '<div class="ponto-resumo-item">' +
                '<span class="ponto-resumo-label">Saldo</span>' +
                '<span class="ponto-resumo-val warn" id="rh-saldo">−08:00</span>' +
              '</div>' +
            '</div>' +
            '<div class="ponto-acao">' +
              '<button class="btn-registrar-agora" id="rh-btn-registrar">' +
                '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 4.5V8l2.5 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                ' Registrar agora' +
              '</button>' +
            '</div>' +
            '<div class="ponto-confirm" id="rh-ponto-confirm">' +
              '<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#4d824d" stroke-width="2"/><path d="M10 16l4 4 8-8" stroke="#4d824d" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '<div class="ponto-confirm-hora" id="rh-confirm-hora">--:--</div>' +
              '<div class="ponto-confirm-msg">Marcação registrada com sucesso</div>' +
              '<div class="ponto-confirm-sub" id="rh-confirm-sub"></div>' +
            '</div>' +
            '<div class="ponto-panel-footer">' +
              '<svg width="11" height="11" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M8 7v5M8 5v.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' +
              ' Os registros são inseridos com a data e hora atual. O horário pode ser ajustado.' +
            '</div>' +
          '</div>' +
        '</div>' +

        // Notificações
        '<a class="header-notif" href="mensagens.html">' +
          '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="flex-shrink:0">' +
            '<path d="M8 2a4 4 0 0 1 4 4v3l1 2H3l1-2V6a4 4 0 0 1 4-4zm-1 11a1 1 0 0 0 2 0"' +
            ' stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg>' +
          ' Mensagens <span class="notif-count">2</span>' +
        '</a>' +

        // Usuário
        '<div class="header-user" id="rh-user-btn">' +
          '<div class="user-info">' +
            '<span class="user-name">José Antônio Pereira</span>' +
            '<span class="user-role">Assistente administrativo</span>' +
          '</div>' +
          '<div class="user-avatar">CR</div>' +
          '<div class="user-dropdown" id="rh-user-dropdown">' +
            '<div class="dropdown-item exit">Encerrar sessão</div>' +
          '</div>' +
        '</div>' +
      '</header>';
  }

  // ── Sidebar ───────────────────────────────────────────────────────────────
  var sidebarEl = document.getElementById('rh-sidebar');
  if (sidebarEl) {
    var html = '';
    NAV.forEach(function (item) {
      if (item.group) {
        html += '<div class="nav-group-label">' + item.group + '</div>';
      } else {
        var isCurrent = item.href !== '#' && item.href === currentPage;
        var cls = 'nav-item' + (isCurrent ? ' current' : '') + (item.muted ? ' muted' : '');
        html += '<a class="' + cls + '" href="' + item.href + '">' + item.label + '</a>';
      }
    });
    sidebarEl.innerHTML = html;
  }

  // ── Dropdown usuário ──────────────────────────────────────────────────────
  var userBtn = document.getElementById('rh-user-btn');
  var userDropdown = document.getElementById('rh-user-dropdown');
  if (userBtn && userDropdown) {
    userBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      userDropdown.classList.toggle('open');
    });
    document.addEventListener('click', function () {
      userDropdown.classList.remove('open');
    });
  }

  // ── Ponto ─────────────────────────────────────────────────────────────────
  var marcacoes = [];
  var timerRelogio = null;

  // data no painel
  var panelData = document.getElementById('rh-panel-data');
  if (panelData) {
    panelData.textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
  }

  renderChips();
  atualizarPill();

  // botão registrar
  var btnRegistrar = document.getElementById('rh-btn-registrar');
  if (btnRegistrar) btnRegistrar.addEventListener('click', registrar);

  // botão ponto (toggle painel)
  var pontoBtn = document.getElementById('rh-ponto-btn');
  if (pontoBtn) {
    pontoBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var painel = document.getElementById('rh-ponto-panel');
      if (painel.classList.contains('open')) {
        fecharPonto();
      } else {
        document.getElementById('rh-ponto-confirm').classList.remove('show');
        document.querySelector('.ponto-acao').style.display = '';
        painel.classList.add('open');
        iniciarRelogio();
      }
    });
  }

  function fecharPonto() {
    var painel = document.getElementById('rh-ponto-panel');
    if (painel) painel.classList.remove('open');
    pararRelogio();
  }

  function iniciarRelogio() {
    tickRelogio();
    timerRelogio = setInterval(tickRelogio, 1000);
  }

  function pararRelogio() {
    clearInterval(timerRelogio);
    timerRelogio = null;
  }

  function tickRelogio() {
    var agora = new Date();
    var hh = String(agora.getHours()).padStart(2, '0');
    var mm = String(agora.getMinutes()).padStart(2, '0');
    var ss = String(agora.getSeconds()).padStart(2, '0');
    var hmEl = document.getElementById('rh-relogio-hm');
    var sEl  = document.getElementById('rh-relogio-s');
    if (hmEl) hmEl.textContent = hh + ':' + mm;
    if (sEl)  sEl.textContent  = ':' + ss;
  }

  function registrar() {
    var agora = new Date();
    var hh = String(agora.getHours()).padStart(2, '0');
    var mm = String(agora.getMinutes()).padStart(2, '0');
    var horaStr = hh + ':' + mm;

    marcacoes.push(horaStr);
    marcacoes.sort();
    renderChips();
    atualizarPill();

    var idx  = marcacoes.indexOf(horaStr);
    var tipo = idx % 2 === 0 ? 'entrada' : 'saída';

    var confirmEl = document.getElementById('rh-ponto-confirm');
    var horaEl    = document.getElementById('rh-confirm-hora');
    var subEl     = document.getElementById('rh-confirm-sub');
    if (horaEl) horaEl.textContent = horaStr;
    if (subEl)  subEl.textContent  = 'Registrada como ' + tipo + ' (marcação nº ' + marcacoes.length + ')';

    document.querySelector('.ponto-acao').style.display = 'none';
    confirmEl.classList.add('show');

    setTimeout(function () {
      fecharPonto();
      setTimeout(function () {
        confirmEl.classList.remove('show');
        document.querySelector('.ponto-acao').style.display = '';
      }, 300);
    }, 2500);
  }

  function renderChips() {
    var container = document.getElementById('rh-chips');
    if (!container) return;
    if (marcacoes.length === 0) {
      container.innerHTML = '<span class="ponto-vazio">Nenhum registro hoje.</span>';
    } else {
      container.innerHTML = marcacoes.map(function (h, i) {
        var tipo = i % 2 === 0 ? 'entrada' : 'saida';
        return '<span class="ponto-chip ' + tipo + '"><span class="ponto-chip-num">' + (i + 1) + '</span>' + h + '</span>';
      }).join('');
    }
    calcularResumo();
  }

  function calcularResumo() {
    var totalMin = 0;
    for (var i = 0; i + 1 < marcacoes.length; i += 2) {
      var e = marcacoes[i].split(':').map(Number);
      var s = marcacoes[i + 1].split(':').map(Number);
      totalMin += (s[0] * 60 + s[1]) - (e[0] * 60 + e[1]);
    }
    var trabEl  = document.getElementById('rh-trabalhado');
    var saldoEl = document.getElementById('rh-saldo');
    if (totalMin === 0 && marcacoes.length < 2) {
      if (trabEl)  { trabEl.textContent  = '—'; trabEl.className  = 'ponto-resumo-val'; }
      if (saldoEl) { saldoEl.textContent = '—'; saldoEl.className = 'ponto-resumo-val'; }
      return;
    }
    var fmtMin = function (m) {
      var h = Math.floor(Math.abs(m) / 60);
      var min = Math.abs(m) % 60;
      return String(h).padStart(2, '0') + ':' + String(min).padStart(2, '0');
    };
    if (trabEl)  { trabEl.textContent  = fmtMin(totalMin); trabEl.className = 'ponto-resumo-val ok'; }
    var saldo = totalMin - 480;
    var sinal = saldo >= 0 ? '+' : '−';
    if (saldoEl) {
      saldoEl.textContent = sinal + fmtMin(saldo);
      saldoEl.className   = 'ponto-resumo-val ' + (saldo >= 0 ? 'ok' : 'warn');
    }
  }

  function atualizarPill() {
    var pill = document.getElementById('rh-ponto-pill');
    if (pill) pill.textContent = marcacoes.length + ' hoje';
  }

})();
});
