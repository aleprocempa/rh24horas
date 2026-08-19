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
    { group: 'Ponto e afastamentos' },
    { label: 'Cartão ponto',              href: 'cartao_ponto_2.html' },
    { label: 'Férias e licenças',         href: 'frequencia.html' },
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
        '<button class="header-hamburger" id="rh-hamburger" aria-label="Menu">' +
          '<svg width="18" height="18" viewBox="0 0 18 18" fill="none">' +
            '<path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
          '</svg>' +
        '</button>' +
        '<div class="app-logo"><span class="logo-rh">RH</span><span class="logo-rest">24Horas</span></div>' +
        '<div class="header-spacer"></div>' +

        // Botão de ponto
        '<div class="header-ponto-wrap" id="rh-ponto-wrap">' +
          '<button class="header-ponto-btn" id="rh-ponto-btn">' +
            '<svg width="14" height="14" viewBox="0 0 16 16" fill="none">' +
              '<circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/>' +
              '<path d="M8 4.5V8l2.5 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
            '<span class="ponto-btn-label"> Registrar ponto </span>' +
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
              '<div class="ponto-panel-footer-nota">Os registros são inseridos com a data e hora atual.</div>' +
              '<div class="ponto-termo" id="rh-ponto-termo">' +
                '<label class="ponto-termo-check" id="rh-ponto-termo-form">' +
                  '<span class="termo-check-wrap">' +
                    '<input type="checkbox" id="rh-termo-checkbox">' +
                    '<span class="termo-check-box" aria-hidden="true"></span>' +
                  '</span>' +
                  '<span class="ponto-termo-content">' +
                    '<span class="ponto-termo-texto">Aceito o termo de responsabilidade para o registro de efetividade web.</span>' +
                    '<a href="#" id="rh-termo-link" class="ponto-termo-link">Ver conteúdo completo</a>' +
                  '</span>' +
                '</label>' +
                '<div class="ponto-panel-footer-nota ponto-termo-aceito" id="rh-ponto-termo-aceito">' +
                  'Termo de responsabilidade aceito. ' +
                  '<a href="#" id="rh-termo-link-aceito" class="ponto-termo-link">Ver conteúdo</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        // Notificações
        '<a class="header-notif" href="mensagens.html">' +
          '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="flex-shrink:0">' +
            '<path d="M8 2a4 4 0 0 1 4 4v3l1 2H3l1-2V6a4 4 0 0 1 4-4zm-1 11a1 1 0 0 0 2 0"' +
            ' stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg>' +
          '<span class="notif-label"> Mensagens </span><span class="notif-count">2</span>' +
        '</a>' +

        // Usuário
        '<div class="header-user" id="rh-user-btn" aria-haspopup="true" aria-expanded="false">' +
          '<div class="user-info">' +
            '<span class="user-name">José Antônio Pereira</span>' +
            '<span class="user-role">' +
              '<span id="rh-user-cargo">Assistente administrativo</span>' +
              '<span class="vinculo-current" id="rh-vinculo-switch-label">• Vínculo 3 (Efetivo)</span>' +
            '</span>' +
          '</div>' +
          '<div class="user-avatar">CR</div>' +
          '<svg class="header-user-caret" width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '<div class="user-dropdown" id="rh-user-dropdown">' +
            '<div class="vinculo-dropdown-head">Navegar com o vínculo</div>' +
            '<div id="rh-vinculo-list"></div>' +
            '<div class="dropdown-item exit" id="rh-exit-item">' +
              '<span>Sair</span>' +
              '<svg width="13" height="13" viewBox="0 0 16 16" fill="none">' +
                '<path d="M6 3H3.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1H6M10 11l3-3-3-3M13 8H6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
              '</svg>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</header>' +

      // Modal do termo de responsabilidade (ponto)
      '<div class="modal-overlay" id="rh-termo-overlay">' +
        '<div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="rh-termo-titulo">' +
          '<div class="modal-header">' +
            '<span class="modal-titulo" id="rh-termo-titulo">Termo de responsabilidade para o registro de efetividade web</span>' +
            '<button class="modal-close" id="rh-termo-close" aria-label="Fechar">&times;</button>' +
          '</div>' +
          '<div class="modal-body">' +
            '<div class="termo-conteudo">' +
              '<p>Declaro estar ciente e de acordo com as condições de uso do sistema de registro de efetividade WEB, através do Portal do RH 24 Horas.</p>' +
              '<p>Declaro-me ciente, também, que o RH 24 Horas é monitorado e permite identificar e rastrear o uso e o mau uso do mesmo, em caráter de segurança e sigilo do sistema.</p>' +
              '<p>Afirmo estar plenamente consciente de que a minha senha é personalíssima e intransferível, o que acarreta minha responsabilidade pessoal por todo e qualquer prejuízo decorrente de sua cessão proposital a terceiros, ainda que em caráter emergencial ou por necessidade de serviço.</p>' +
              '<p>Declaro estar ciente que poderei responder civil, criminal e administrativamente pelo empréstimo e uso indevido da senha, conforme previsto no art. 299 do Código Penal Brasileiro.</p>' +
              '<p>O uso indevido do sistema de ponto eletrônico web, bem como o descumprimento das obrigações aplicáveis neste termo, poderá resultar em medidas disciplinares em conformidade com a legislação vigente.</p>' +
              '<p>Estou CIENTE dos direitos e obrigações decorrentes da utilização do sistema, bem como das possíveis penalidades em casos de inobservância da legislação vigente.</p>' +
            '</div>' +
          '</div>' +
          '<div class="modal-footer">' +
            '<button class="btn-fechar" id="rh-termo-fechar-btn">Fechar</button>' +
          '</div>' +
        '</div>' +
      '</div>';
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

    // Fechar sidebar ao clicar em um link (mobile)
    sidebarEl.addEventListener('click', function (e) {
      if (e.target.classList.contains('nav-item')) {
        sidebarEl.classList.remove('open');
        var ov = document.getElementById('rh-sidebar-overlay');
        if (ov) ov.classList.remove('open');
      }
    });
  }

  // ── Overlay da sidebar (mobile) ───────────────────────────────────────────
  var overlayEl = document.createElement('div');
  overlayEl.id = 'rh-sidebar-overlay';
  overlayEl.className = 'sidebar-overlay';
  document.body.appendChild(overlayEl);
  overlayEl.addEventListener('click', function () {
    var sidebar = document.getElementById('rh-sidebar');
    if (sidebar) sidebar.classList.remove('open');
    overlayEl.classList.remove('open');
  });

  // ── Hamburger ─────────────────────────────────────────────────────────────
  var hamburger = document.getElementById('rh-hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var sidebar = document.getElementById('rh-sidebar');
      var ov = document.getElementById('rh-sidebar-overlay');
      if (sidebar) sidebar.classList.toggle('open');
      if (ov) ov.classList.toggle('open');
    });
  }

  // ── Dropdown usuário (vínculo + sair) ─────────────────────────────────────
  var userBtn = document.getElementById('rh-user-btn');
  var userDropdown = document.getElementById('rh-user-dropdown');

  function fecharUserDropdown() {
    if (userDropdown) userDropdown.classList.remove('open');
    if (userBtn) userBtn.setAttribute('aria-expanded', 'false');
  }

  if (userBtn && userDropdown) {
    userBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = userDropdown.classList.toggle('open');
      userBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', fecharUserDropdown);
  }

  // ── Seletor de vínculo ────────────────────────────────────────────────────
  // Resumo dos vínculos, compartilhado no cabeçalho de todas as páginas.
  // O detalhamento completo fica na própria ficha funcional.
  var VINCULOS = [
    { num: 3, tipo: 'Efetivo', situacao: 'Ativo',      exercicio: '11/02/2015', cargo: 'Assistente administrativo' },
    { num: 4, tipo: 'Estágio', situacao: 'Encerrado',  exercicio: '27/09/2021', cargo: 'Estagiário' },
    { num: 2, tipo: 'Estágio', situacao: 'Encerrado',  exercicio: '30/03/2010', cargo: 'Estagiário' },
    { num: 1, tipo: 'Estágio', situacao: 'Encerrado',  exercicio: '24/03/2008', cargo: 'Estagiário' }
  ];
  var STORAGE_KEY = 'rh-vinculo-ativo';

  function getVinculoAtivo() {
    var saved = null;
    try { saved = window.localStorage.getItem(STORAGE_KEY); } catch (e) {}
    var num = saved ? parseInt(saved, 10) : 3;
    return VINCULOS.some(function (v) { return v.num === num; }) ? num : 3;
  }

  var switchLabel  = document.getElementById('rh-vinculo-switch-label');
  var cargoEl      = document.getElementById('rh-user-cargo');
  var vincList     = document.getElementById('rh-vinculo-list');

  function renderVinculoHeader() {
    var ativo = getVinculoAtivo();
    var atual = VINCULOS.filter(function (v) { return v.num === ativo; })[0];
    if (switchLabel && atual) switchLabel.textContent = '• Vínculo ' + atual.num + ' (' + atual.tipo + ')';
    if (cargoEl && atual) cargoEl.textContent = atual.cargo;

    if (vincList) {
      var html = '';
      VINCULOS.forEach(function (v) {
        var isAtivo = v.num === ativo;
        var encerrado = v.situacao !== 'Ativo';
        html +=
          '<button type="button" class="vinculo-option' +
            (isAtivo ? ' active' : '') + (encerrado ? ' encerrado' : '') +
            '" data-vinculo="' + v.num + '">' +
            '<span class="vinculo-option-num">' + v.num + '</span>' +
            '<span class="vinculo-option-info">' +
              '<span class="vinculo-option-tipo">' + v.tipo + '</span>' +
              '<span class="vinculo-option-meta">' + v.situacao + ' · Exercício ' + v.exercicio + '</span>' +
            '</span>' +
            '<svg class="vinculo-option-check" width="15" height="15" viewBox="0 0 16 16" fill="none">' +
              '<path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
          '</button>';
      });
      vincList.innerHTML = html;

      vincList.querySelectorAll('.vinculo-option').forEach(function (opt) {
        opt.addEventListener('click', function (e) {
          e.stopPropagation();
          selecionarVinculo(parseInt(opt.getAttribute('data-vinculo'), 10));
          fecharUserDropdown();
        });
      });
    }
  }

  function selecionarVinculo(num) {
    try { window.localStorage.setItem(STORAGE_KEY, String(num)); } catch (e) {}
    renderVinculoHeader();
    // Permite que a página (ex.: ficha funcional) reaja à troca de vínculo.
    if (typeof window.rhOnVinculoChange === 'function') window.rhOnVinculoChange(num);
  }

  renderVinculoHeader();
  // Expõe o vínculo ativo e o seletor para a página (ficha funcional) usar.
  window.rhVinculoAtivo = getVinculoAtivo;
  window.rhSelecionarVinculo = selecionarVinculo;

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

  // ── Termo de responsabilidade (aceite único, até o texto mudar) ────────────
  var TERMO_VERSION = 'v1';
  var TERMO_STORAGE_KEY = 'rh_termo_efetividade_aceito';

  function termoAceito() {
    return localStorage.getItem(TERMO_STORAGE_KEY) === TERMO_VERSION;
  }

  function atualizarTermoUI() {
    var formEl   = document.getElementById('rh-ponto-termo-form');
    var aceitoEl = document.getElementById('rh-ponto-termo-aceito');
    var checkbox = document.getElementById('rh-termo-checkbox');
    var btn      = document.getElementById('rh-btn-registrar');
    var aceito   = termoAceito();
    if (formEl)   formEl.style.display   = aceito ? 'none' : '';
    if (aceitoEl) aceitoEl.style.display = aceito ? 'block' : 'none';
    if (btn)      btn.disabled = !aceito;
    if (checkbox) checkbox.checked = aceito;
  }

  atualizarTermoUI();

  var termoCheckbox = document.getElementById('rh-termo-checkbox');
  if (termoCheckbox) {
    termoCheckbox.addEventListener('change', function () {
      if (termoCheckbox.checked) {
        localStorage.setItem(TERMO_STORAGE_KEY, TERMO_VERSION);
      } else {
        localStorage.removeItem(TERMO_STORAGE_KEY);
      }
      atualizarTermoUI();
    });
  }

  var termoOverlay    = document.getElementById('rh-termo-overlay');
  var termoLink        = document.getElementById('rh-termo-link');
  var termoLinkAceito  = document.getElementById('rh-termo-link-aceito');
  var termoClose       = document.getElementById('rh-termo-close');
  var termoFechar      = document.getElementById('rh-termo-fechar-btn');

  function abrirTermoModal(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (termoOverlay) termoOverlay.classList.add('open');
    if (termoClose) termoClose.focus();
  }

  function fecharTermoModal() {
    if (termoOverlay) termoOverlay.classList.remove('open');
    if (termoLink) termoLink.focus();
  }

  if (termoLink)       termoLink.addEventListener('click', abrirTermoModal);
  if (termoLinkAceito) termoLinkAceito.addEventListener('click', abrirTermoModal);
  if (termoClose)  termoClose.addEventListener('click', fecharTermoModal);
  if (termoFechar) termoFechar.addEventListener('click', fecharTermoModal);
  if (termoOverlay) {
    termoOverlay.addEventListener('click', function (e) {
      if (e.target === termoOverlay) fecharTermoModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && termoOverlay && termoOverlay.classList.contains('open')) {
      fecharTermoModal();
    }
  });

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
        atualizarTermoUI();
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
    if (!termoAceito()) return;

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
