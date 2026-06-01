// ── Countdown ───────────────────────────────────────────────
function updateCountdown() {
  const exam = new Date('2025-08-23');
  const now = new Date();
  const diff = Math.max(0, Math.ceil((exam - now) / 86400000));
  const el = document.getElementById('days-left');
  if (el) el.textContent = diff;
}
updateCountdown();

// ── Syllabus overview cards ──────────────────────────────────
function buildSyllabusCards() {
  const grid = document.getElementById('syllabus-grid');
  ['FA','ECON','LAW','QA'].forEach(key => {
    const meta = SUBJECTS_META[key];
    const card = document.createElement('div');
    card.className = 'syllabus-card';
    card.dataset.subject = key;
    card.innerHTML = `
      <div class="sc-header">
        <div class="sc-title">${meta.label}</div>
        <span class="sc-paper">${meta.paper}</span>
      </div>
      <p class="sc-topics">${meta.desc}</p>
      <div class="sc-progress">
        <div class="sc-bar-track"><div class="sc-bar-fill" data-days="${meta.days}" data-max="18"></div></div>
        <span class="sc-days">${meta.days} days</span>
      </div>
    `;
    grid.appendChild(card);
  });

  // Animate bars after paint
  requestAnimationFrame(() => {
    document.querySelectorAll('.sc-bar-fill').forEach(bar => {
      const pct = Math.round((parseInt(bar.dataset.days) / 18) * 100);
      setTimeout(() => { bar.style.width = pct + '%'; }, 100);
    });
  });
}

// ── Timetable builder ────────────────────────────────────────
function getTopicData(day) {
  if (day.t === -1) return null;
  if (day.t === -2) {
    return {
      heading: 'Full mock exam',
      topics: ['Timed under exam conditions — full KASNEB past paper', 'No notes, no phone, 3 hours', 'Mark immediately after using official scheme', 'Log every topic where marks were dropped']
    };
  }
  if (day.t === -3) {
    return {
      heading: 'CPA Examination',
      topics: ['KASNEB Foundation Level examination', 'Arrive 30 minutes early with student ID & national ID', 'Non-programmable calculator allowed', 'Blue or black ink pen only']
    };
  }
  const subject = day.sub || day.s;
  const arr = SYLLABUS[subject];
  if (!arr) return null;
  return arr[Math.min(day.t, arr.length - 1)];
}

function buildTimetable() {
  const container = document.getElementById('timetable');

  SCHEDULE.forEach((phase, pi) => {
    const section = document.createElement('div');
    section.className = 'phase-section';
    section.dataset.phase = pi;

    const heading = document.createElement('div');
    heading.className = 'phase-heading';
    heading.innerHTML = `
      <span class="phase-num">${phase.phase}</span>
      <span class="phase-title">${phase.title}</span>
      <span class="phase-dates">${phase.dates}</span>
    `;
    section.appendChild(heading);

    phase.weeks.forEach((week, wi) => {
      const block = document.createElement('div');
      block.className = 'week-block' + (pi === 0 && wi === 0 ? ' open' : '');

      // Gather unique subjects for this week
      const subjects = [...new Set(week.days.filter(d => d.s !== 'REST').map(d => d.sub || d.s))];
      const dotsHTML = subjects.map(s => {
        const colors = { FA: '#c8a96e', ECON: '#7cb87a', LAW: '#7facd6', QA: '#c97a6e', REV: '#a07ec8', MOCK: '#d67aaa', EXAM: '#e05555' };
        return `<span class="ws-dot" style="background:${colors[s] || '#666'}" title="${LABELS[s] || s}"></span>`;
      }).join('');

      const toggle = document.createElement('button');
      toggle.className = 'week-toggle';
      toggle.innerHTML = `
        <div class="week-toggle-left">
          <div class="week-subjects">${dotsHTML}</div>
          <span class="week-label">${week.title}</span>
          <span class="week-dates-small">${week.dates}</span>
        </div>
        <span class="chevron-icon">&#x2304;</span>
      `;
      toggle.addEventListener('click', () => block.classList.toggle('open'));
      block.appendChild(toggle);

      const body = document.createElement('div');
      body.className = 'week-body';

      const grid = document.createElement('div');
      grid.className = 'day-grid';

      week.days.forEach((day, di) => {
        const cell = document.createElement('div');
        const cls = CELL_CLS[day.s] || 'day-rest';
        cell.className = `day-cell ${cls}`;
        cell.dataset.subject = day.sub || day.s;

        const topicData = getTopicData(day);
        const shortTopic = topicData ? topicData.heading : '';

        cell.innerHTML = `
          <span class="day-name">${DAYS[di]}</span>
          <span class="day-badge">${LABELS[day.s] || day.s}</span>
          ${shortTopic ? `<span class="day-topic-short">${shortTopic}</span>` : ''}
          ${day.h ? `<span class="day-hrs">${day.h}</span>` : ''}
        `;

        if (topicData) {
          cell.addEventListener('click', () => openModal(day, topicData, week.dates + ', ' + DAYS[di]));
        }

        grid.appendChild(cell);
      });

      body.appendChild(grid);
      block.appendChild(body);
      section.appendChild(block);
    });

    container.appendChild(section);
  });
}

// ── Modal ────────────────────────────────────────────────────
function openModal(day, topicData, dateStr) {
  const subject = day.sub || day.s;
  const overlay = document.getElementById('modal-overlay');
  const tagEl = document.getElementById('modal-tag');
  const titleEl = document.getElementById('modal-title');
  const dateEl = document.getElementById('modal-date');
  const topicBlock = document.getElementById('modal-topic-block');
  const prevBlock = document.getElementById('modal-prev-block');

  const tagCls = TAG_CLS[day.s] || 'rest';
  const subjectLabel = LABELS[subject] || subject;

  tagEl.className = `modal-tag ${tagCls}`;
  tagEl.textContent = subjectLabel + (day.h ? ' · ' + day.h : '');
  titleEl.textContent = topicData.heading;
  dateEl.textContent = dateStr;

  const subtopicsHTML = topicData.topics.map(t => `<div class="modal-subtopic">${t}</div>`).join('');
  topicBlock.innerHTML = `
    <h3>Topics to cover</h3>
    <div class="modal-subtopics">${subtopicsHTML}</div>
  `;

  // Show previously covered topics for this subject
  const arr = SYLLABUS[subject];
  prevBlock.innerHTML = '';
  if (arr && day.t > 0) {
    const prev = arr.slice(0, Math.min(day.t, arr.length));
    if (prev.length > 0) {
      prevBlock.innerHTML = `<h3>Already covered in ${subjectLabel}</h3><div class="prev-tags">${prev.map(p => `<span class="prev-tag">${p.heading}</span>`).join('')}</div>`;
    }
  }

  overlay.classList.add('open');
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

// ── Filter nav ───────────────────────────────────────────────
let activeFilter = 'all';

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilter();
  });
});

function applyFilter() {
  const cells = document.querySelectorAll('.day-cell');
  cells.forEach(cell => {
    if (activeFilter === 'all') {
      cell.classList.remove('filtered-out');
    } else {
      const cellSubject = cell.dataset.subject;
      const shouldShow = cellSubject === activeFilter ||
        (activeFilter === 'FA' && cellSubject === 'FA') ||
        (activeFilter === 'ECON' && cellSubject === 'ECON') ||
        (activeFilter === 'LAW' && cellSubject === 'LAW') ||
        (activeFilter === 'QA' && cellSubject === 'QA');

      if (shouldShow || cell.classList.contains('day-rest') || cell.classList.contains('day-exam')) {
        cell.classList.remove('filtered-out');
      } else {
        cell.classList.add('filtered-out');
      }
    }
  });

  // Highlight syllabus card
  document.querySelectorAll('.syllabus-card').forEach(card => {
    if (activeFilter === 'all' || card.dataset.subject === activeFilter) {
      card.style.opacity = '1';
    } else {
      card.style.opacity = '0.35';
    }
  });
}

// ── Init ─────────────────────────────────────────────────────
buildSyllabusCards();
buildTimetable();
