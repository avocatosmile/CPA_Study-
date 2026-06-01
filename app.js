// ═══════════════════════════════════════════════════════════
// STORAGE — localStorage helpers
// ═══════════════════════════════════════════════════════════
const STORAGE_KEY_SESSIONS = 'cpa_done_sessions';
const STORAGE_KEY_SUBTOPICS = 'cpa_done_subtopics';

function loadDoneSessions() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_SESSIONS) || '[]')); }
  catch { return new Set(); }
}
function saveDoneSessions(set) {
  localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify([...set]));
}
function loadDoneSubtopics() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_SUBTOPICS) || '[]')); }
  catch { return new Set(); }
}
function saveDoneSubtopics(set) {
  localStorage.setItem(STORAGE_KEY_SUBTOPICS, JSON.stringify([...set]));
}

const doneSessions = loadDoneSessions();
const doneSubtopics = loadDoneSubtopics();

// ── Session key: "phaseIndex-weekIndex-dayIndex"
function sessionKey(pi, wi, di) { return `${pi}-${wi}-${di}`; }

// ── Subtopic key: "SUBJECT-sessionHeading-subtopicIndex"
function subtopicKey(subject, heading, idx) { return `${subject}||${heading}||${idx}`; }

// ═══════════════════════════════════════════════════════════
// COUNTDOWN
// ═══════════════════════════════════════════════════════════
function updateCountdown() {
  const exam = new Date('2025-08-23');
  const diff = Math.max(0, Math.ceil((exam - new Date()) / 86400000));
  const el = document.getElementById('days-left');
  if (el) el.textContent = diff;
}
updateCountdown();

// ═══════════════════════════════════════════════════════════
// OVERALL PROGRESS
// ═══════════════════════════════════════════════════════════
function totalStudyDays() {
  let count = 0;
  SCHEDULE.forEach((phase, pi) => phase.weeks.forEach((week, wi) => week.days.forEach((day, di) => {
    if (day.s !== 'REST' && day.t !== -1) count++;
  })));
  return count;
}

function updateOverallProgress() {
  const total = totalStudyDays();
  const done = doneSessions.size;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const el = document.getElementById('overall-pct');
  if (el) el.textContent = pct + '%';
}

// ═══════════════════════════════════════════════════════════
// SUBJECT PROGRESS
// ═══════════════════════════════════════════════════════════
function subjectProgress(subject) {
  const arr = SYLLABUS[subject];
  if (!arr) return { sessions: 0, sessionsDone: 0, topics: 0, topicsDone: 0 };
  const totalTopics = arr.reduce((sum, s) => sum + s.topics.length, 0);
  let topicsDone = 0;
  arr.forEach((session, si) => {
    session.topics.forEach((_, ti) => {
      if (doneSubtopics.has(subtopicKey(subject, session.heading, ti))) topicsDone++;
    });
  });
  // Count sessions
  let sessions = 0, sessionsDone = 0;
  SCHEDULE.forEach((phase, pi) => phase.weeks.forEach((week, wi) => week.days.forEach((day, di) => {
    const sub = day.sub || day.s;
    if (sub === subject && day.t >= 0) {
      sessions++;
      if (doneSessions.has(sessionKey(pi, wi, di))) sessionsDone++;
    }
  })));
  return { sessions, sessionsDone, topics: totalTopics, topicsDone };
}

function updateSubjectCards() {
  document.querySelectorAll('.syllabus-card').forEach(card => {
    const subject = card.dataset.subject;
    const prog = subjectProgress(subject);
    const topicPct = prog.topics > 0 ? Math.round((prog.topicsDone / prog.topics) * 100) : 0;
    const bar = card.querySelector('.sc-bar-fill');
    if (bar) bar.style.width = topicPct + '%';
    const label = card.querySelector('.sc-topic-pct');
    if (label) label.textContent = topicPct + '%';
    const sessionLabel = card.querySelector('.sc-session-stat');
    if (sessionLabel) sessionLabel.textContent = `${prog.sessionsDone}/${prog.sessions} sessions`;
  });
}

// ═══════════════════════════════════════════════════════════
// SYLLABUS CARDS
// ═══════════════════════════════════════════════════════════
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
      <div class="sc-progress-label">
        <span class="sc-session-stat" style="color:var(--text3);font-family:'DM Mono',monospace;font-size:10px">—</span>
        <span class="sc-topic-pct">0%</span>
      </div>
      <div class="sc-progress">
        <div class="sc-bar-track"><div class="sc-bar-fill"></div></div>
        <span class="sc-days">${meta.days} days</span>
      </div>
    `;
    grid.appendChild(card);
  });
  requestAnimationFrame(() => setTimeout(updateSubjectCards, 100));
}

// ═══════════════════════════════════════════════════════════
// TIMETABLE
// ═══════════════════════════════════════════════════════════
function getTopicData(day) {
  if (day.t === -1) return null;
  if (day.t === -2) return { heading: 'Full mock exam', topics: ['Timed under exam conditions — full KASNEB past paper','No notes, no phone, 3 hours','Mark immediately after using official scheme','Log every topic where marks were dropped'] };
  if (day.t === -3) return { heading: 'CPA Examination', topics: ['KASNEB Foundation Level examination','Arrive 30 minutes early with student ID & national ID','Non-programmable calculator allowed','Blue or black ink pen only'] };
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

    const heading = document.createElement('div');
    heading.className = 'phase-heading';
    heading.innerHTML = `<span class="phase-num">${phase.phase}</span><span class="phase-title">${phase.title}</span><span class="phase-dates">${phase.dates}</span>`;
    section.appendChild(heading);

    phase.weeks.forEach((week, wi) => {
      const block = document.createElement('div');
      block.className = 'week-block' + (pi === 0 && wi === 0 ? ' open' : '');

      const subjects = [...new Set(week.days.filter(d => d.s !== 'REST').map(d => d.sub || d.s))];
      const COLORS = { FA:'#c8a96e', ECON:'#7cb87a', LAW:'#7facd6', QA:'#c97a6e', REV:'#a07ec8', MOCK:'#d67aaa', EXAM:'#e05555' };
      const dotsHTML = subjects.map(s => `<span class="ws-dot" style="background:${COLORS[s]||'#666'}" title="${LABELS[s]||s}"></span>`).join('');

      const toggle = document.createElement('button');
      toggle.className = 'week-toggle';
      toggle.innerHTML = `<div class="week-toggle-left"><div class="week-subjects">${dotsHTML}</div><span class="week-label">${week.title}</span><span class="week-dates-small">${week.dates}</span></div><span class="chevron-icon">&#x2304;</span>`;
      toggle.addEventListener('click', () => block.classList.toggle('open'));
      block.appendChild(toggle);

      const body = document.createElement('div');
      body.className = 'week-body';
      const grid = document.createElement('div');
      grid.className = 'day-grid';

      week.days.forEach((day, di) => {
        const skey = sessionKey(pi, wi, di);
        const isDone = doneSessions.has(skey);
        const cls = CELL_CLS[day.s] || 'day-rest';
        const cell = document.createElement('div');
        cell.className = `day-cell ${cls}${isDone ? ' day-done' : ''}`;
        cell.dataset.subject = day.sub || day.s;
        cell.dataset.skey = skey;

        const topicData = getTopicData(day);
        const shortTopic = topicData ? topicData.heading : '';
        const isStudyDay = topicData && day.s !== 'REST' && day.s !== 'EXAM';

        cell.innerHTML = `
          <span class="day-name">${DAYS[di]}</span>
          <span class="day-badge">${LABELS[day.s]||day.s}</span>
          ${shortTopic ? `<span class="day-topic-short">${shortTopic}</span>` : ''}
          ${day.h ? `<span class="day-hrs">${day.h}</span>` : ''}
          ${isStudyDay ? `<button class="cell-done-btn" title="${isDone ? 'Mark undone' : 'Mark done'}">${isDone ? '✓ Done' : '+ Done'}</button>` : ''}
        `;

        if (topicData) {
          // Click on cell body opens modal (not on done btn)
          cell.addEventListener('click', e => {
            if (e.target.closest('.cell-done-btn')) return;
            openModal(day, topicData, week.dates + ', ' + DAYS[di], skey);
          });
        }

        // Done button on cell
        const doneBtn = cell.querySelector('.cell-done-btn');
        if (doneBtn) {
          doneBtn.addEventListener('click', e => {
            e.stopPropagation();
            toggleSessionDone(skey, cell, doneBtn);
          });
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

function toggleSessionDone(skey, cell, btn) {
  if (doneSessions.has(skey)) {
    doneSessions.delete(skey);
    cell.classList.remove('day-done');
    if (btn) btn.textContent = '+ Done';
    showToast('Session unmarked');
  } else {
    doneSessions.add(skey);
    cell.classList.add('day-done');
    if (btn) btn.textContent = '✓ Done';
    showToast('Session marked done ✓');
  }
  saveDoneSessions(doneSessions);
  updateOverallProgress();
  updateSubjectCards();
  refreshChecklistIfOpen();
}

// ═══════════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════════
let currentModalSkey = null;

function openModal(day, topicData, dateStr, skey) {
  const subject = day.sub || day.s;
  currentModalSkey = skey;

  const tagCls = TAG_CLS[day.s] || 'rest';
  const subjectLabel = LABELS[subject] || subject;
  const isDone = skey && doneSessions.has(skey);

  document.getElementById('modal-tag').className = `modal-tag ${isDone ? 'done' : tagCls}`;
  document.getElementById('modal-tag').textContent = subjectLabel + (day.h ? ' · ' + day.h : '');
  document.getElementById('modal-title').textContent = topicData.heading;
  document.getElementById('modal-date').textContent = dateStr;

  const subtopicsHTML = topicData.topics.map(t => `<div class="modal-subtopic">${t}</div>`).join('');
  document.getElementById('modal-topic-block').innerHTML = `<h3>Topics to cover</h3><div class="modal-subtopics">${subtopicsHTML}</div>`;

  const arr = SYLLABUS[subject];
  const prevBlock = document.getElementById('modal-prev-block');
  prevBlock.innerHTML = '';
  if (arr && day.t > 0) {
    const prev = arr.slice(0, Math.min(day.t, arr.length));
    if (prev.length > 0) {
      prevBlock.innerHTML = `<h3>Already covered in ${subjectLabel}</h3><div class="prev-tags">${prev.map(p => `<span class="prev-tag">${p.heading}</span>`).join('')}</div>`;
    }
  }

  const doneBtn = document.getElementById('modal-done-btn');
  doneBtn.textContent = isDone ? '✓ Session marked as done' : 'Mark session as done';
  doneBtn.className = 'modal-done-btn' + (isDone ? ' is-done' : '');

  // Only show done btn for real study days
  doneBtn.style.display = (skey && day.s !== 'REST' && day.s !== 'EXAM') ? 'flex' : 'none';

  document.getElementById('modal-overlay').classList.add('open');
}

document.getElementById('modal-done-btn').addEventListener('click', () => {
  if (!currentModalSkey) return;
  const allCells = document.querySelectorAll(`[data-skey="${currentModalSkey}"]`);
  const cell = allCells[0];
  const btn = cell ? cell.querySelector('.cell-done-btn') : null;
  toggleSessionDone(currentModalSkey, cell || document.createElement('div'), btn);

  // Update modal button state
  const isDone = doneSessions.has(currentModalSkey);
  const doneBtn = document.getElementById('modal-done-btn');
  doneBtn.textContent = isDone ? '✓ Session marked as done' : 'Mark session as done';
  doneBtn.className = 'modal-done-btn' + (isDone ? ' is-done' : '');

  const tagEl = document.getElementById('modal-tag');
  if (isDone) tagEl.classList.add('done'); else tagEl.classList.remove('done');
});

document.getElementById('modal-close').addEventListener('click', () => document.getElementById('modal-overlay').classList.remove('open'));
document.getElementById('modal-overlay').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.getElementById('modal-overlay').classList.remove('open'); });

// ═══════════════════════════════════════════════════════════
// FILTER
// ═══════════════════════════════════════════════════════════
let activeFilter = 'all';
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilter();
  });
});

function applyFilter() {
  document.querySelectorAll('.day-cell').forEach(cell => {
    if (activeFilter === 'all') { cell.classList.remove('filtered-out'); return; }
    const s = cell.dataset.subject;
    const show = s === activeFilter || cell.classList.contains('day-rest') || cell.classList.contains('day-exam');
    cell.classList.toggle('filtered-out', !show);
  });
  document.querySelectorAll('.syllabus-card').forEach(card => {
    card.style.opacity = (activeFilter === 'all' || card.dataset.subject === activeFilter) ? '1' : '0.35';
  });
}

// ═══════════════════════════════════════════════════════════
// TAB SWITCHING
// ═══════════════════════════════════════════════════════════
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + target).classList.add('active');
    // Show/hide subject filters
    const filters = document.getElementById('subject-filters');
    filters.classList.toggle('hidden', target !== 'timetable');
    if (target === 'checklist') buildChecklist(activeChecklistSubject);
  });
});

// ═══════════════════════════════════════════════════════════
// CHECKLIST TAB
// ═══════════════════════════════════════════════════════════
let activeChecklistSubject = 'FA';

document.querySelectorAll('.cl-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cl-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeChecklistSubject = btn.dataset.subject;
    buildChecklist(activeChecklistSubject);
  });
});

function buildChecklist(subject) {
  const container = document.getElementById('checklist-content');
  const arr = SYLLABUS[subject];
  const meta = SUBJECTS_META[subject];
  const prog = subjectProgress(subject);
  const totalTopics = arr.reduce((sum, s) => sum + s.topics.length, 0);
  const topicsDone = prog.topicsDone;
  const topicPct = totalTopics > 0 ? Math.round((topicsDone / totalTopics) * 100) : 0;

  const SUBJ_COLOR = { FA: 'var(--fa)', ECON: 'var(--econ)', LAW: 'var(--law)', QA: 'var(--qa)' };
  const color = SUBJ_COLOR[subject] || 'var(--text)';

  container.innerHTML = '';

  // Header
  const hdr = document.createElement('div');
  hdr.className = 'checklist-header';
  hdr.innerHTML = `
    <div>
      <div class="checklist-title" style="color:${color}">${meta.label}</div>
      <div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text3);margin-top:2px">${meta.paper} · ${totalTopics} subtopics across ${arr.length} sessions</div>
    </div>
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <div class="checklist-progress">
        <div class="cl-prog-bar-track"><div class="cl-prog-bar-fill" style="width:${topicPct}%;background:${color}"></div></div>
        <span class="cl-prog-text">${topicsDone} / ${totalTopics}</span>
        <span class="cl-prog-count" style="color:${color}">${topicPct}%</span>
      </div>
      <div class="cl-actions">
        <button class="cl-action-btn" id="cl-expand-all">Expand all</button>
        <button class="cl-action-btn" id="cl-clear-all" style="color:var(--qa)">Clear all</button>
      </div>
    </div>
  `;
  container.appendChild(hdr);

  // Session groups
  arr.forEach((session, si) => {
    const allChecked = session.topics.every((_, ti) => doneSubtopics.has(subtopicKey(subject, session.heading, ti)));
    const someChecked = session.topics.some((_, ti) => doneSubtopics.has(subtopicKey(subject, session.heading, ti)));
    const checkedCount = session.topics.filter((_, ti) => doneSubtopics.has(subtopicKey(subject, session.heading, ti))).length;

    const group = document.createElement('div');
    group.className = 'cl-session-group' + (allChecked ? ' group-done' : '');
    group.dataset.si = si;

    group.innerHTML = `
      <div class="cl-session-header">
        <div class="cl-session-check ${allChecked ? 'checked' : ''}" data-si="${si}" title="Mark all subtopics">${allChecked ? '✓' : ''}</div>
        <span class="cl-session-title">Session ${si + 1} · ${session.heading}</span>
        <div class="cl-session-meta">
          <span class="cl-session-subtopic-count">${checkedCount}/${session.topics.length}</span>
          <span class="cl-session-expand">&#x2304;</span>
        </div>
      </div>
      <div class="cl-subtopics">
        ${session.topics.map((topic, ti) => {
          const key = subtopicKey(subject, session.heading, ti);
          const checked = doneSubtopics.has(key);
          return `<div class="cl-subtopic-item${checked ? ' sub-done' : ''}" data-ti="${ti}" data-si="${si}">
            <div class="cl-sub-check ${checked ? 'checked' : ''}">${checked ? '✓' : ''}</div>
            <span class="cl-subtopic-text">${topic}</span>
          </div>`;
        }).join('')}
      </div>
    `;

    // Toggle expand
    group.querySelector('.cl-session-header').addEventListener('click', e => {
      if (e.target.closest('.cl-session-check')) return;
      group.classList.toggle('expanded');
    });

    // Session-level check (check all subtopics)
    group.querySelector('.cl-session-check').addEventListener('click', e => {
      e.stopPropagation();
      const nowAllChecked = session.topics.every((_, ti) => doneSubtopics.has(subtopicKey(subject, session.heading, ti)));
      session.topics.forEach((_, ti) => {
        const key = subtopicKey(subject, session.heading, ti);
        if (nowAllChecked) doneSubtopics.delete(key);
        else doneSubtopics.add(key);
      });
      saveDoneSubtopics(doneSubtopics);
      buildChecklist(subject);
      updateSubjectCards();
      updateOverallProgress();
    });

    // Subtopic checkboxes
    group.querySelectorAll('.cl-subtopic-item').forEach(item => {
      item.addEventListener('click', () => {
        const ti = parseInt(item.dataset.ti);
        const key = subtopicKey(subject, session.heading, ti);
        if (doneSubtopics.has(key)) doneSubtopics.delete(key);
        else doneSubtopics.add(key);
        saveDoneSubtopics(doneSubtopics);
        buildChecklist(subject);
        updateSubjectCards();
        updateOverallProgress();
      });
    });

    container.appendChild(group);
  });

  // Expand all / Clear all buttons
  document.getElementById('cl-expand-all').addEventListener('click', () => {
    container.querySelectorAll('.cl-session-group').forEach(g => g.classList.add('expanded'));
  });
  document.getElementById('cl-clear-all').addEventListener('click', () => {
    if (!confirm(`Clear all ${meta.label} progress?`)) return;
    arr.forEach(session => {
      session.topics.forEach((_, ti) => doneSubtopics.delete(subtopicKey(subject, session.heading, ti)));
    });
    saveDoneSubtopics(doneSubtopics);
    buildChecklist(subject);
    updateSubjectCards();
    updateOverallProgress();
    showToast('Progress cleared');
  });
}

function refreshChecklistIfOpen() {
  const checklistTab = document.getElementById('tab-checklist');
  if (checklistTab && checklistTab.classList.contains('active')) {
    buildChecklist(activeChecklistSubject);
  }
}

// ═══════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
buildSyllabusCards();
buildTimetable();
updateOverallProgress();
