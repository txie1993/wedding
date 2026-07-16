// =============================================================================
// site.js — page logic and rendering. This file reads CONFIG (config.js),
// MENU_COURSES (menu.js), and FAQ_ITEMS (faq.js) and wires up the page.
// You shouldn't need to edit this file to customize the site's content —
// see config.js, menu.js, and faq.js instead.
// =============================================================================

// ---- Apply CONFIG to the page ----
function setText(id, text){ const el = document.getElementById(id); if (el) el.textContent = text; }
function setHref(id, href){ const el = document.getElementById(id); if (el) el.href = href; }

function applyConfig(c){
  document.title = `${c.nameOne} & ${c.nameTwo} — ${c.dateDisplay}`;
  const metaDesc = document.getElementById('metaDescription');
  if (metaDesc) metaDesc.setAttribute('content', `Join us as we celebrate the wedding of ${c.nameOne} and ${c.nameTwo} on ${c.dateDisplay}.`);

  setText('navBrand', `${c.nameOne} & ${c.nameTwo}`);
  setText('heroNameOne', c.nameOne);
  setText('heroNameTwo', c.nameTwo);
  setText('heroDateChip', `${c.dateDisplay} · ${c.banquetCity}`);
  setText('storyWeddingDate', c.dateDisplay);

  setText('banquetVenue', c.banquet.venue);
  setText('banquetAddress', c.banquet.address);
  setText('banquetTime', c.banquet.time);
  setHref('banquetMapLink', c.banquet.mapLink);

  setText('rsvpDeadline', `Please respond by ${c.rsvp.deadline}`);
  setHref('rsvpButton', c.rsvp.link);

  const reg1 = document.getElementById('registryLink1');
  if (reg1){ if (c.registry.link1) { reg1.href = c.registry.link1; } else { reg1.style.display = 'none'; } }
  const reg2 = document.getElementById('registryLink2');
  if (reg2){ if (c.registry.link2) { reg2.href = c.registry.link2; } else { reg2.style.display = 'none'; } }

  const emailEl = document.getElementById('footerEmail');
  if (emailEl){ emailEl.textContent = c.email; emailEl.href = 'mailto:' + c.email; }

  setText('footerSummary', `${c.nameOne} & ${c.nameTwo} · ${c.dateDisplay}`);
}
if (typeof CONFIG !== 'undefined') applyConfig(CONFIG);

// ---- Render the banquet menu from MENU_COURSES ----
function renderMenu(courses){
  const list = document.getElementById('menuList');
  if (!list || !courses) return;
  courses.forEach(course => {
    const li = document.createElement('li');
    const wrap = document.createElement('div');
    wrap.className = 'menu-course';
    const en = document.createElement('span');
    en.className = 'en';
    en.textContent = course.en;
    const zh = document.createElement('span');
    zh.className = 'zh';
    zh.textContent = course.zh;
    wrap.appendChild(en);
    wrap.appendChild(zh);
    li.appendChild(wrap);
    list.appendChild(li);
  });
}
if (typeof MENU_COURSES !== 'undefined') renderMenu(MENU_COURSES);

// ---- Render the FAQ accordion from FAQ_ITEMS ----
function renderFaq(items){
  const container = document.getElementById('faqAccordion');
  if (!container || !items) return;
  items.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'accordion-item';

    const btn = document.createElement('button');
    btn.className = 'accordion-trigger';
    btn.setAttribute('aria-expanded', 'false');
    btn.append(document.createTextNode(item.question + ' '));
    const plus = document.createElement('span');
    plus.className = 'plus';
    plus.textContent = '+';
    btn.appendChild(plus);

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    const p = document.createElement('p');
    p.textContent = item.answer;
    panel.appendChild(p);

    itemEl.appendChild(btn);
    itemEl.appendChild(panel);
    container.appendChild(itemEl);
  });
}
if (typeof FAQ_ITEMS !== 'undefined') renderFaq(FAQ_ITEMS);

// ---- Place faint 囍 watermark characters at fixed, evenly-spaced positions ----
function placeXi(el, positions){
  if (!el) return;
  positions.forEach(pos => {
    const s = document.createElement('span');
    s.textContent = '囍';
    s.style.left = pos.left + '%';
    s.style.top = pos.top + '%';
    s.style.transform = `translate(-50%, -50%) rotate(${pos.rotate}deg)`;
    el.appendChild(s);
  });
}
placeXi(document.getElementById('xiField'), [
  { left: 12, top: 16, rotate: -10 },
  { left: 85, top: 14, rotate: 8 },
  { left: 18, top: 52, rotate: 6 },
  { left: 82, top: 56, rotate: -7 },
  { left: 14, top: 88, rotate: 5 },
  { left: 86, top: 86, rotate: -5 }
]);
placeXi(document.getElementById('xiFieldFooter'), [
  { left: 16, top: 30, rotate: -9 },
  { left: 84, top: 30, rotate: 7 },
  { left: 50, top: 82, rotate: -4 }
]);

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
if (navToggle && navList){
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Countdown ----
if (typeof CONFIG !== 'undefined'){
  const WEDDING_DATE = new Date(CONFIG.weddingDate);
  const updateCountdown = () => {
    const now = new Date();
    let diff = WEDDING_DATE - now;
    if (isNaN(diff)) return; // invalid date in CONFIG.weddingDate
    if (diff < 0) diff = 0;
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    const pad = n => String(n).padStart(2, '0');
    setText('cd-days', pad(days));
    setText('cd-hours', pad(hours));
    setText('cd-min', pad(mins));
    setText('cd-sec', pad(secs));
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ---- Scroll reveal for timeline ----
if ('IntersectionObserver' in window){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.timeline, .timeline-item').forEach(el => observer.observe(el));
}

// ---- Accordion (menu + FAQ) — event delegation so it works for both the
// static menu trigger and the FAQ triggers rendered dynamically above ----
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.accordion-trigger');
  if (!btn) return;
  const panel = btn.nextElementSibling;
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  panel.style.maxHeight = expanded ? null : panel.scrollHeight + 'px';
});
