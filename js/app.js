/**
 * ============================================================
 * ITI STUDY PLATFORM — MAIN APPLICATION
 * ============================================================
 * Modular, clean architecture. All state in LocalStorage.
 * ============================================================
 */

'use strict';

/* ============================================================
   STATE MANAGER
   ============================================================ */
const State = (() => {
  const KEY = 'iti_platform_v2';
  let _state = null;

  function _default() {
    return {
      theme: 'auto',
      currentView: 'dashboard',
      currentDay: null,
      progress: {}, // { taskId: { done, pdf, video, quiz, practice, revision } }
      streak: { count: 0, lastDate: null },
      quizScores: {}, // { quizKey: { score, total, date } }
      searchHistory: [],
      filters: []
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      _state = raw ? { ..._default(), ...JSON.parse(raw) } : _default();
    } catch {
      _state = _default();
    }
    return _state;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(_state)); } catch {}
  }

  function get(path) {
    if (!path) return _state;
    return path.split('.').reduce((o, k) => (o || {})[k], _state);
  }

  function set(path, value) {
    const keys = path.split('.');
    let obj = _state;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    save();
  }

  function getTaskProgress(taskId) {
    return _state.progress[taskId] || { done: false, pdf: false, video: false, quiz: false, practice: false, revision: false };
  }

  function setTaskCheck(taskId, key, value) {
    if (!_state.progress[taskId]) _state.progress[taskId] = { done: false, pdf: false, video: false, quiz: false, practice: false, revision: false };
    _state.progress[taskId][key] = value;
    // Auto-complete task if all checks done
    const p = _state.progress[taskId];
    const allDone = p.pdf || p.video || p.quiz || p.practice;
    // Only auto-complete if at least 2 checklist items are done OR task is manually marked
    // We'll let user manually complete
    save();
  }

  function setTaskDone(taskId, done) {
    if (!_state.progress[taskId]) _state.progress[taskId] = { done: false, pdf: false, video: false, quiz: false, practice: false, revision: false };
    _state.progress[taskId].done = done;
    save();
  }

  function getOverallProgress() {
    let total = 0, done = 0;
    STUDY_DATA.days.forEach(day => {
      day.sessions.forEach(s => {
        s.tasks.forEach(t => {
          total++;
          if (getTaskProgress(t.id).done) done++;
        });
      });
    });
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }

  function getDayProgress(dayId) {
    const day = STUDY_DATA.days.find(d => d.id === dayId);
    if (!day) return 0;
    let total = 0, done = 0;
    day.sessions.forEach(s => s.tasks.forEach(t => {
      total++;
      if (getTaskProgress(t.id).done) done++;
    }));
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }

  function isDayComplete(dayId) {
    return getDayProgress(dayId) === 100;
  }

  function getCompletedDays() {
    return STUDY_DATA.days.filter(d => isDayComplete(d.id)).length;
  }

  function getCompletedTasks() {
    let count = 0;
    Object.values(_state.progress).forEach(p => { if (p.done) count++; });
    return count;
  }

  function updateStreak() {
    const today = new Date().toDateString();
    if (_state.streak.lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (_state.streak.lastDate === yesterday) {
        _state.streak.count++;
      } else {
        _state.streak.count = 1;
      }
      _state.streak.lastDate = today;
      save();
    }
  }

  load();
  return { get, set, save, getTaskProgress, setTaskCheck, setTaskDone, getOverallProgress, getDayProgress, isDayComplete, getCompletedDays, getCompletedTasks, updateStreak };
})();

/* ============================================================
   THEME MANAGER
   ============================================================ */
const Theme = (() => {
  function apply(theme) {
    State.set('theme', theme);
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeBtn === theme);
    });
  }

  function init() {
    apply(State.get('theme') || 'auto');
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (State.get('theme') === 'auto') apply('auto');
    });
  }

  return { apply, init };
})();

/* ============================================================
   TRANSLATION / LOCALIZATION MANAGER (BILINGUAL)
   ============================================================ */
const LANG_DICT = {
  ar: {
    dir: 'rtl',
    font: "'Cairo', sans-serif",
    nav_dashboard: "لوحة التحكم",
    nav_plan: "خطة الدراسة",
    nav_progress: "التقدم",
    nav_qbank: "بنك الأسئلة",
    nav_cheat: "Cheat Sheets",
    nav_hr: "المقابلة الشخصية",
    nav_days: "الأيام",
    nav_main: "القائمة الرئيسية",
    nav_content: "المحتوى",
    logo_sub: "11 يوم للنجاح",
    search_placeholder: "ابحث في الخطة... (Ctrl+K)",
    welcome: "مرحباً — ابدأ يومك بنشاط 💪",
    title: "Fel7o ITI Prep — خطة 11 يوم للنجاح",
    quote: "خطة منظمة + تنفيذ يومي = نجاح مضمون",
    overall_progress: "الإنجاز الكلي",
    completed_days: "أيام مكتملة",
    day_streak: "سلسلة الأيام",
    completed_tasks: "مهام مكتملة",
    days_remaining: "أيام متبقية",
    recent_days: "📅 الأيام الأخيرة",
    view_all: "عرض الكل ←",
    quick_access: "⚡ وصول سريع",
    official_links: "🔗 الروابط والمصادر الرسمية للتحضير",
    official_desc: "كل روابط وبوستات قناة التحضير الرسمية مجمعة ومتاحة بلمسة واحدة:",
    link_channel: "قناة الواتساب للتحضير",
    link_channel_sub: "المصدر الأساسي للمعلومات",
    link_playlist: "فيديوهات شرح الـ IQ",
    link_playlist_sub: "بلاي ليست اليوتيوب الرسمية",
    link_linkedin: "بوست التقديم والتراكات",
    link_linkedin_sub: "منشور المهندس محمد وهدان",
    link_aijobs: "قناة AI Jobs لعروض العمل",
    link_aijobs_sub: "للفرص والوظائف اليومية",
    link_iti_portal: "بوابة تقديم ITI الرسمية",
    link_iti_portal_sub: "رابط التقديم المباشر للمنحة",
    link_assessment: "منصة AssessmentDay للـ IQ",
    link_assessment_sub: "مصدر جديد للتدريب على الأنماط",
    gold_files: "📂 ملخصات وملفات القبول الذهبية",
    gold_desc: "افتح أهم ملفات وتلخيصات الامتحانات السابقة مباشرة بلمسة واحدة:",
    gold_sd: "أسئلة انترفيو SD",
    gold_sd_sub: "ملخص أسئلة التخصص المكررة",
    gold_hr: "أسئلة وإجابات الـ HR",
    gold_hr_sub: "الملف الكامل للمقابلة النهائية",
    gold_iq: "خلاصة الـ IQ الشاملة",
    gold_iq_sub: "ملخص أهم القوانين والمسائل",
    gold_en: "أهم ملف إنجليزي",
    gold_en_sub: "مفردات وقواعد الامتحان المكررة",
    mentor_protocol: "🎯 بروتوكول الـ Mentor اليومي",
    mentor_desc: "في آخر كل يوم، ابعتلي التقرير ده وأنا هكويزك بـ 20 سؤال، هصحح معاك، وهولّدلك مهام اليوم التاني:",
  },
  en: {
    dir: 'ltr',
    font: "'Outfit', 'Cairo', sans-serif",
    nav_dashboard: "Dashboard",
    nav_plan: "Study Plan",
    nav_progress: "Progress Tracker",
    nav_qbank: "Question Bank",
    nav_cheat: "Cheat Sheets",
    nav_hr: "Interview Prep",
    nav_days: "Study Days",
    nav_main: "Main Menu",
    nav_content: "Resource Content",
    logo_sub: "11 Days to Success",
    search_placeholder: "Search the plan... (Ctrl+K)",
    welcome: "Welcome — Start your day strong 💪",
    title: "Fel7o ITI Prep — 11 Days to Success",
    quote: "Structured plan + daily execution = guaranteed success",
    overall_progress: "Overall Progress",
    completed_days: "Completed Days",
    day_streak: "Day Streak",
    completed_tasks: "Completed Tasks",
    days_remaining: "Days Remaining",
    recent_days: "📅 Recent Days",
    view_all: "View All ←",
    quick_access: "⚡ Quick Access",
    official_links: "🔗 Official Links & Preparation Channels",
    official_desc: "All links and posts from the official ITI prep channel at your fingertips:",
    link_channel: "Preparation WhatsApp Channel",
    link_channel_sub: "The primary source of info",
    link_playlist: "IQ Videos Playlist",
    link_playlist_sub: "Official YouTube Playlist",
    link_linkedin: "Tracks & Application Post",
    link_linkedin_sub: "By Eng. Mohamed Whdan",
    link_aijobs: "AI Jobs Channel",
    link_aijobs_sub: "For daily jobs and resources",
    link_iti_portal: "Official ITI Admission Portal",
    link_iti_portal_sub: "Direct application link for Intake 47",
    link_assessment: "AssessmentDay IQ Platform",
    link_assessment_sub: "New source for pattern practice",
    gold_files: "📂 Golden Admission PDF Summaries",
    gold_desc: "Open key previous exam documents and summaries directly inside the platform:",
    gold_sd: "SD Technical Interview Qs",
    gold_sd_sub: "Specialty interview summary",
    gold_hr: "HR & Soft Skills Q&A",
    gold_hr_sub: "Complete final interview file",
    gold_iq: "Complete IQ Cheat Sheet",
    gold_iq_sub: "Laws and solved problems summary",
    gold_en: "Core English Exam PDF",
    gold_en_sub: "Vocabulary & grammar summary",
    mentor_protocol: "🎯 Daily Mentor Protocol",
    mentor_desc: "At the end of each day, send me this report and I will quiz you on 20 questions, check your answers, and generate next day's tasks:",
  }
};

const Lang = (() => {
  function apply(lang) {
    State.set('lang', lang);
    const trans = LANG_DICT[lang];
    if (!trans) return;

    // Set direction and font styling
    document.documentElement.dir = trans.dir;
    document.documentElement.style.fontFamily = trans.font;


    
    const headerBtn = document.getElementById('lang-toggle-btn');
    if (headerBtn) {
      headerBtn.textContent = lang === 'ar' ? 'EN' : 'AR';
    }

    // Direct selectors translation mapper
    const maps = {
      '#quick-search-input': { attr: 'placeholder', key: 'search_placeholder' },
      '.sidebar-logo .logo-sub': 'logo_sub',
      '.nav-section:nth-of-type(1) .nav-section-label': 'nav_main',
      '.nav-item[data-view="dashboard"]': { selector: true, text: 'nav_dashboard' },
      '.nav-item[data-view="study-plan"]': { selector: true, text: 'nav_plan' },
      '.nav-item[data-view="progress"]': { selector: true, text: 'nav_progress' },
      '.nav-section:nth-of-type(2) .nav-section-label': 'nav_content',
      '.nav-item[data-view="question-banks"]': { selector: true, text: 'nav_qbank' },
      '.nav-item[data-view="cheat-sheets"]': { selector: true, text: 'nav_cheat' },
      '.nav-item[data-view="hr-prep"]': { selector: true, text: 'nav_hr' },
      '.nav-section:nth-of-type(3) .nav-section-label': 'nav_days',
      '.hero-greeting': 'welcome',
      '.hero-title': { innerHTML: true, text: lang === 'ar' ? 'Fel7o ITI Prep — <span>خطة 11 يوم</span>' : 'Fel7o ITI Prep — <span>11 Days Plan</span>' },
      '#dash-quote-text': 'quote',
      '.hero-stat:nth-child(1) .hs-label': 'overall_progress',
      '.hero-stat:nth-child(2) .hs-label': 'completed_days',
      '.hero-stat:nth-child(3) .hs-label': 'day_streak',
      '.hero-stat:nth-child(4) .hs-label': 'completed_tasks',
      '#kpi-progress + .kpi-label': 'overall_progress',
      '#kpi-completed + .kpi-label': 'completed_days',
      '#kpi-remaining + .kpi-label': 'days_remaining',
      '#kpi-tasks + .kpi-label': 'completed_tasks',
      '#kpi-streak + .kpi-label': 'day_streak',
      '#view-dashboard h2': 'recent_days',
      '#view-dashboard button.btn-ghost': 'view_all',
      '#view-dashboard h3:nth-of-type(1)': 'quick_access',
      '#view-dashboard h3:nth-of-type(2)': 'official_links',
      '#view-dashboard h3:nth-of-type(2) + p': 'official_desc',
      '#view-dashboard a[href*="whatsapp.com/channel/0029Vbd2X"] div div:first-child': 'link_channel',
      '#view-dashboard a[href*="whatsapp.com/channel/0029Vbd2X"] div div:last-child': 'link_channel_sub',
      '#view-dashboard a[href*="youtube.com"] div div:first-child': 'link_playlist',
      '#view-dashboard a[href*="youtube.com"] div div:last-child': 'link_playlist_sub',
      '#view-dashboard a[href*="linkedin.com"] div div:first-child': 'link_linkedin',
      '#view-dashboard a[href*="linkedin.com"] div div:last-child': 'link_linkedin_sub',
      '#view-dashboard a[href*="whatsapp.com/channel/0029Vb8LK"] div div:first-child': 'link_aijobs',
      '#view-dashboard a[href*="whatsapp.com/channel/0029Vb8LK"] div div:last-child': 'link_aijobs_sub',
      '#view-dashboard a[href*="iti.gov.eg/programs"] div div:first-child': 'link_iti_portal',
      '#view-dashboard a[href*="iti.gov.eg/programs"] div div:last-child': 'link_iti_portal_sub',
      '#view-dashboard a[href*="assessmentday.com"] div div:first-child': 'link_assessment',
      '#view-dashboard a[href*="assessmentday.com"] div div:last-child': 'link_assessment_sub',
      '#view-dashboard h3:nth-of-type(3)': 'gold_files',
      '#view-dashboard h3:nth-of-type(3) + p': 'gold_desc',
      '#view-dashboard button[onclick*="SD.pdf"] div div:first-child': 'gold_sd',
      '#view-dashboard button[onclick*="SD.pdf"] div div:last-child': 'gold_sd_sub',
      '#view-dashboard button[onclick*="HR_.pdf"] div div:first-child': 'gold_hr',
      '#view-dashboard button[onclick*="HR_.pdf"] div div:last-child': 'gold_hr_sub',
      '#view-dashboard button[onclick*="خلاصة IQ"] div div:first-child': 'gold_iq',
      '#view-dashboard button[onclick*="خلاصة IQ"] div div:last-child': 'gold_iq_sub',
      '#view-dashboard button[onclick*="اهم ملف"] div div:first-child': 'gold_en',
      '#view-dashboard button[onclick*="اهم ملف"] div div:last-child': 'gold_en_sub',
      '#view-dashboard h3[style*="brand-orange"]': 'mentor_protocol',
      '#view-dashboard h3[style*="brand-orange"] + p': 'mentor_desc',
      '#bnav-dashboard': { selector: true, html: `<span class="bnav-icon">🏠</span> ${lang==='ar'?'الرئيسية':'Home'}` },
      '#bnav-study-plan': { selector: true, html: `<span class="bnav-icon">📅</span> ${lang==='ar'?'الخطة':'Plan'}` },
      '#bnav-question-banks': { selector: true, html: `<span class="bnav-icon">❓</span> ${lang==='ar'?'كويز':'Quiz'}` },
      '#bnav-progress': { selector: true, html: `<span class="bnav-icon">📈</span> ${lang==='ar'?'تقدمي':'Progress'}` },
    };

    for (const [sel, val] of Object.entries(maps)) {
      const el = document.querySelector(sel);
      if (!el) continue;
      if (typeof val === 'string') {
        el.textContent = trans[val] || val;
      } else if (val.attr) {
        el.setAttribute(val.attr, trans[val.key] || val.key);
      } else if (val.selector) {
        if (val.text) {
          const icon = el.querySelector('.nav-icon')?.outerHTML || '';
          const text = trans[val.text];
          el.innerHTML = icon ? `${icon} ${text}` : text;
        } else if (val.html) {
          el.innerHTML = val.html;
        }
      } else if (val.innerHTML) {
        el.innerHTML = val.text;
      }
    }
    Render.updateSidebarDays();
  }

  function toggle() {
    const cur = State.get('lang') || 'ar';
    apply(cur === 'ar' ? 'en' : 'ar');
    
    // Force re-routing of active view to rebuild strings
    const view = State.get('currentView') || 'dashboard';
    Router.navigate(view, { dayId: State.get('currentDay') });
    Toast.show(State.get('lang') === 'ar' ? 'تم تحويل اللغة إلى العربية' : 'Language switched to English', 'success', 2000);
  }

  return { apply, toggle };
})();

/* ============================================================
   PROGRESS BACKUP MANAGER (NO ACCOUNT PERSISTENCE)
   ============================================================ */
const ProgressBackup = (() => {
  function exportProgress() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('iti_platform_v2')) {
        data[key] = localStorage.getItem(key);
      }
    }
    if (Object.keys(data).length === 0) {
      Toast.show((State.get('lang') || 'ar') === 'ar' ? 'لا يوجد تقدم مسجل لتصديره!' : 'No progress recorded to export!', 'warning');
      return;
    }
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iti_preparation_progress_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    Toast.show((State.get('lang') || 'ar') === 'ar' ? 'تم تصدير ملف التقدم بنجاح! 📤' : 'Progress file exported successfully! 📤', 'success');
  }

  function triggerImport() {
    document.getElementById('progress-import-input')?.click();
  }

  function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        const keys = Object.keys(data);
        if (keys.length === 0 || !keys.some(k => k.includes('iti_platform_v2'))) {
          throw new Error('Invalid file');
        }

        // Clear existing app data
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith('iti_platform_v2')) {
            localStorage.removeItem(key);
          }
        }

        // Save imported data
        for (const [key, val] of Object.entries(data)) {
          if (key.startsWith('iti_platform_v2')) {
            localStorage.setItem(key, val);
          }
        }

        Toast.show(
          (State.get('lang') || 'ar') === 'ar' ? 'تم استيراد تقدمك بنجاح! جاري التحديث...' : 'Progress imported successfully! Reloading...', 
          'success', 
          2000
        );
        setTimeout(() => location.reload(), 1500);

      } catch (err) {
        Toast.show((State.get('lang') || 'ar') === 'ar' ? 'الملف غير صالح أو تالف!' : 'Invalid or corrupted file!', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  return { exportProgress, triggerImport, importProgress };
})();

function _t(ar, en) {
  return (State.get('lang') || 'ar') === 'ar' ? ar : en;
}

function getDayDate(dayId) {
  const start = new Date(APP_CONFIG.startDate || "2026-07-17");
  const firstId = STUDY_DATA.days.length ? STUDY_DATA.days[0].id : 1;
  const target = new Date(start);
  target.setDate(start.getDate() + (dayId - firstId));
  
  const isAr = (State.get('lang') || 'ar') === 'ar';
  if (isAr) {
    const monthsAr = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    return `${target.getDate()} ${monthsAr[target.getMonth()]}`;
  } else {
    const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthsEn[target.getMonth()]} ${target.getDate()}`;
  }
}

/* ============================================================
   TOAST
   ============================================================ */
const Toast = (() => {
  let container;

  function init() {
    container = document.getElementById('toast-container');
  }

  function show(msg, type = 'info', duration = 3000) {
    if (!container) return;
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
    container.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(20px)'; el.style.transition = '0.3s'; setTimeout(() => el.remove(), 300); }, duration);
  }

  return { init, show };
})();

/* ============================================================
   ROUTER / VIEW MANAGER
   ============================================================ */
const Router = (() => {
  const VIEWS = ['dashboard', 'study-plan', 'day-detail', 'question-banks', 'cheat-sheets', 'hr-prep', 'progress', 'resources'];

  function navigate(view, params = {}) {
    State.set('currentView', view);
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    const target = document.getElementById(`view-${view}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('view-active');
    }
    // Update sidebar nav
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === view);
    });
    // Render
    switch (view) {
      case 'dashboard':         Render.dashboard(); break;
      case 'study-plan':        Render.studyPlan(); break;
      case 'day-detail':        Render.dayDetail(params.dayId); break;
      case 'question-banks':    Render.questionBanks(); break;
      case 'cheat-sheets':      Render.cheatSheets(); break;
      case 'hr-prep':           Render.hrPrep(); break;
      case 'progress':          Render.progress(); break;
    }
    document.getElementById('main-scroll')?.scrollTo(0, 0);
  }

  return { navigate };
})();



/* ============================================================
   SEARCH
   ============================================================ */
const Search = (() => {
  let _index = [];

  function buildIndex() {
    _index = [];
    STUDY_DATA.days.forEach(day => {
      day.sessions.forEach(session => {
        session.tasks.forEach(task => {
          _index.push({
            type: 'task',
            title: task.title,
            description: task.description,
            dayId: day.id,
            dayTitle: day.title,
            taskType: task.type,
            id: task.id
          });
        });
      });
    });

    // Add technical questions
    Object.entries(STUDY_DATA.technicalQuestions).forEach(([cat, qs]) => {
      qs.forEach(q => {
        _index.push({ type: 'question', title: q, category: cat, description: `سؤال ${cat}` });
      });
    });

    // Add cheat sheet keywords
    _index.push({ type: 'cheatsheet', title: 'Linux Commands', description: 'أوامر لينكس الأساسية' });
    _index.push({ type: 'cheatsheet', title: 'SQL Queries', description: 'قواعد البيانات SQL' });
    _index.push({ type: 'cheatsheet', title: 'OSI Model', description: 'طبقات OSI السبعة' });
    _index.push({ type: 'cheatsheet', title: 'Big-O Complexity', description: 'تعقيد الخوارزميات' });
    _index.push({ type: 'cheatsheet', title: 'Port Numbers', description: 'أرقام البورتات' });
  }

  function query(term) {
    if (!term || term.length < 2) return [];
    const t = term.toLowerCase();
    return _index.filter(item =>
      item.title.toLowerCase().includes(t) ||
      (item.description || '').toLowerCase().includes(t) ||
      (item.category || '').toLowerCase().includes(t)
    ).slice(0, 20);
  }

  const ICONS = {
    task: '📋', question: '❓', cheatsheet: '📌', hr: '🤝'
  };

  function renderResults(results, container) {
    if (!container) return;
    if (results.length === 0) {
      container.innerHTML = '<div class="search-empty">🔍 لا توجد نتائج — جرب كلمة مختلفة</div>';
      return;
    }
    container.innerHTML = results.map(r => `
      <div class="search-result-item" onclick="Search.handleResult(${JSON.stringify(r).replace(/"/g, '&quot;')})">
        <div class="sri-icon">${ICONS[r.type] || '📄'}</div>
        <div>
          <div class="sri-title">${r.title}</div>
          <div class="sri-meta">${r.description || r.dayTitle || r.category || ''}</div>
        </div>
      </div>
    `).join('');
  }

  function handleResult(item) {
    UI.closeSearch();
    if (item.type === 'task') {
      Router.navigate('day-detail', { dayId: item.dayId });
      setTimeout(() => {
        const el = document.getElementById(`task-${item.id}`);
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.style.outline = '2px solid var(--brand-red)'; setTimeout(() => el.style.outline = '', 2000); }
      }, 300);
    } else if (item.type === 'question') {
      Router.navigate('question-banks');
    } else if (item.type === 'cheatsheet') {
      Router.navigate('cheat-sheets');
    }
  }

  return { buildIndex, query, renderResults, handleResult };
})();

/* ============================================================
   VIDEO MODAL
   ============================================================
   NOTE: YouTube embeds are blocked when the page is served via
   file:// protocol (YouTube Error 153). We open YouTube in a
   new tab instead, which always works.
   ============================================================ */
const VideoModal = (() => {

  function _isYouTube(url) {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  }

  // Convert embed URL → watch URL for opening in new tab
  function _toWatchUrl(embedUrl) {
    // https://www.youtube.com/embed/VIDEO_ID → https://www.youtube.com/watch?v=VIDEO_ID
    const match = embedUrl.match(/(?:embed\/|youtu\.be\/)([\w-]{11})/);
    if (match) return `https://www.youtube.com/watch?v=${match[1]}`;
    return embedUrl;
  }

  function _setContent(html) {
    const wrap = document.getElementById('video-embed-wrap');
    if (wrap) wrap.innerHTML = html;
  }

  function open(url, title, searchQuery) {
    if (!url) {
      if (searchQuery) {
        const q = encodeURIComponent(searchQuery + ' شرح عربي');
        const searchUrl = 'https://www.youtube.com/results?search_query=' + q;
        window.open(searchUrl, '_blank');
        return;
      }
      Toast.show((State.get('lang') || 'ar') === 'ar' ? 'الفيديو غير متوفر بعد — قريباً! 📽️' : 'Video unavailable — coming soon! 📽️', 'info');
      return;
    }

    const modal   = document.getElementById('video-modal');
    const titleEl = document.getElementById('video-modal-title');
    if (!modal) return;
    titleEl.textContent = title || 'فيديو';

    if (_isYouTube(url)) {
      const watchUrl = _toWatchUrl(url);

      if (IS_FILE) {
        // ─── file:// → can't embed YouTube, show a styled launch button ───
        _setContent(`
          <div style="
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            gap:24px;padding:56px 24px;text-align:center;
            background:linear-gradient(135deg,#0a0a0a,#1a1a2e);
            border-radius:12px;min-height:280px;
          ">
            <div style="font-size:64px;line-height:1">▶</div>
            <div>
              <div style="color:white;font-size:16px;font-weight:800;margin-bottom:8px">${title || _t('فيديو تعليمي', 'Educational Video')}</div>
              <div style="color:rgba(255,255,255,0.55);font-size:13px;line-height:1.7;max-width:300px">
                ${_t('المتصفح بيبلوك تشغيل YouTube من ملفات محلية.<br/>اضغط الزرار عشان يفتح في تاب جديد.', 'The browser blocks playing YouTube from local files.<br/>Click the button below to open in a new tab.')}
              </div>
            </div>
            <a href="${watchUrl}" target="_blank" rel="noopener" style="
              display:inline-flex;align-items:center;gap:10px;
              background:#ff0000;color:white;padding:14px 32px;
              border-radius:99px;font-size:15px;font-weight:800;
              text-decoration:none;box-shadow:0 4px 20px rgba(255,0,0,0.4);
              transition:all 0.2s;
            "
            onmouseover="this.style.background='#cc0000';this.style.transform='translateY(-2px)'"
            onmouseout="this.style.background='#ff0000';this.style.transform=''">
              <svg width="22" height="16" viewBox="0 0 22 16" fill="white">
                <path d="M21.5 2.5s-.2-1.5-.9-2.1C19.8-.3 18.9-.3 18.5-.3 15.5-.5 11-.5 11-.5s-4.5 0-7.5.2C3.1-.3 2.2-.3 1.4.4.7 1 .5 2.5.5 2.5S.3 4.2.3 6v1.7c0 1.7.2 3.4.2 3.4s.2 1.5.9 2.1c.8.8 1.9.8 2.4.8C5.2 14.2 11 14.2 11 14.2s4.5 0 7.5-.2c.4 0 1.3-.1 2.1-.8.7-.6.9-2.1.9-2.1s.2-1.7.2-3.4V6c0-1.8-.2-3.5-.2-3.5zM8.8 9.7V4.5l5.8 2.6-5.8 2.6z"/>
              </svg>
              ${_t('افتح على YouTube', 'Open on YouTube')}
            </a>
            <div style="font-size:11px;color:rgba(255,255,255,0.3)">
              💡 ${_t('لما ترفع الموقع على surge.sh الفيديو هيشتغل مباشرة هنا', 'Once uploaded to surge.sh, the video will embed directly here')}
            </div>
          </div>
        `);
      } else {
        // ─── https:// → embed directly, works perfectly on surge.sh ───
        _setContent(`
          <div class="video-container">
            <iframe src="${url}?autoplay=1&rel=0"
              allow="autoplay;fullscreen;encrypted-media"
              allowfullscreen></iframe>
          </div>
        `);
      }
    } else {
      // Non-YouTube: embed directly regardless of protocol
      _setContent(`
        <div class="video-container">
          <iframe src="${url}" allow="autoplay;fullscreen;encrypted-media" allowfullscreen></iframe>
        </div>
      `);
    }

    modal.classList.add('open');
  }

  function close() {
    document.getElementById('video-modal')?.classList.remove('open');
    document.getElementById('video-embed-wrap').innerHTML = '';
  }

  return { open, close };
})();

/* ============================================================
   PDF MODAL
   ============================================================
   Smart protocol detection:

   • file:// protocol
     Chrome/Edge block <iframe> loading local files from local files.
     PDF.js XHR is also blocked (CORS on file://).
     Solution: window.open() DOES work → show a styled "Open PDF"
     button that launches the browser's native PDF viewer in a new tab.

   • https:// protocol (surge.sh, any web server)
     PDF.js works perfectly. Embed inside modal with full controls.
     Local PDFs must be uploaded with the site to be accessible.
   ============================================================ */
const PDFModal = (() => {

  const IS_FILE = window.location.protocol === 'file:';
  let _currentUrl = '';
  let _pdfDoc = null, _page = 1, _scale = 1.5;

  /* ── helpers ── */
  function _wrap()    { return document.getElementById('pdf-canvas-wrap'); }
  function _toolbar() { return document.getElementById('pdf-toolbar-controls'); }

  /* ── main open ── */
  function open(url, title) {
    if (!url) { Toast.show('الـ PDF غير متوفر بعد — قريباً! 📄', 'info'); return; }
    _currentUrl = url;
    _pdfDoc     = null;

    const modal = document.getElementById('pdf-modal');
    if (!modal) return;

    document.getElementById('pdf-modal-title').textContent = title || 'PDF';

    // Use native iframe — works on file:// without CORS issues
    const wrap = document.getElementById('pdf-canvas-wrap');
    wrap.innerHTML = `
      <iframe
        id="pdf-iframe"
        src="${url}"
        style="width:100%;height:100%;border:none;border-radius:8px;background:#525659;"
        title="${title || 'PDF'}"
      ></iframe>
    `;

    // Handle iframe load error (browser may block certain paths)
    const iframe = document.getElementById('pdf-iframe');
    if (iframe) {
      iframe.onerror = () => _showFallback(url, title);
      // Timeout fallback — if blank after 3s, show open-in-browser option
      setTimeout(() => {
        try {
          if (!iframe.contentDocument && !iframe.contentWindow) _showFallback(url, title);
        } catch(e) {
          // cross-origin — likely loaded fine, ignore
        }
      }, 3000);
    }

    // Hide toolbar controls (not needed for iframe)
    const toolbar = document.getElementById('pdf-toolbar-controls');
    if (toolbar) toolbar.style.display = 'none';

    modal.classList.add('open');
  }

  function _showFallback(url, title) {
    const wrap = document.getElementById('pdf-canvas-wrap');
    if (!wrap) return;
    const absUrl = new URL(url, window.location.href).href;
    wrap.innerHTML = `
      <div style="
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        gap:20px; padding:60px 24px; text-align:center; height:100%;
      ">
        <div style="font-size:56px">📄</div>
        <div style="font-size:16px; font-weight:800; color:var(--text-primary)">${title || 'PDF'}</div>
        <div style="font-size:13px; color:var(--text-muted); max-width:340px; line-height:1.7">
          ${_t('لا يمكن عرض الـ PDF مباشرة هنا بسبب قيود المتصفح.<br/>اضغط الزرار تحت لفتحه في تاب جديد.', 'The PDF cannot be displayed directly here due to browser restrictions.<br/>Click the button below to open it in a new tab.')}
        </div>
        <a href="${absUrl}" target="_blank" style="
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#e94560,#f5a623); color:white;
          padding:12px 24px; border-radius:99px; font-size:14px; font-weight:800;
          text-decoration:none;
        ">📂 ${_t('افتح الـ PDF في المتصفح', 'Open PDF in Browser')}</a>
        <div style="font-size:12px; color:var(--text-muted)">
          ${_t('أو اسحب الملف وافتحه مباشرة في المتصفح', 'Or drag and drop the file directly into your browser')}
        </div>
      </div>
    `;
  }

  function download() {
    if (_currentUrl) {
      const a = document.createElement('a');
      a.href = _currentUrl;
      a.download = _currentUrl.split('/').pop();
      a.click();
    }
  }

  function openExternal() {
    if (_currentUrl) window.open(_currentUrl, '_blank');
  }

  // Stub controls (browser handles natively inside iframe)
  function prevPage() {}
  function nextPage() {}
  function zoomIn()   {}
  function zoomOut()  {}

  function close() {
    document.getElementById('pdf-modal')?.classList.remove('open');
    const wrap = document.getElementById('pdf-canvas-wrap');
    if (wrap) wrap.innerHTML = '';
    const toolbar = document.getElementById('pdf-toolbar-controls');
    if (toolbar) toolbar.style.display = '';
    _currentUrl = '';
  }

  return { open, close, prevPage, nextPage, zoomIn, zoomOut, download, openExternal };
})();

/* ============================================================
   QUIZ ENGINE
   ============================================================ */
const Quiz = (() => {
  let _questions = [], _current = 0, _score = 0, _answered = false;

  const QUIZZES = {
    linux_basics: [
      { q: "ما معنى chmod 755؟", options: ["rwxr-xr-x", "rwxrwxr-x", "rwxr--r--", "r-xr-xr-x"], correct: 0 },
      { q: "ما الأمر الذي يعرض الـ processes الجارية؟", options: ["ps aux", "ls -la", "top -a", "kill -l"], correct: 0 },
      { q: "ما الأمر الصحيح لإيجاد ملف بالاسم؟", options: ["find / -name file", "grep file /", "locate -n file", "ls -r file"], correct: 0 },
      { q: "ما الفرق بين > و >> ؟", options: ["الأول يستبدل والثاني يضيف", "الأول يضيف والثاني يستبدل", "كلاهما يستبدل", "كلاهما يضيف"], correct: 0 },
      { q: "ما الـ file descriptor لـ stdout؟", options: ["1", "0", "2", "3"], correct: 0 },
      { q: "أي أمر يوقف process بالاسم؟", options: ["pkill name", "kill name", "stop name", "end name"], correct: 0 },
      { q: "ما الـ daemon process؟", options: ["Process يعمل في الخلفية", "Process مُجمّد", "Process في انتظار إدخال", "Process منتهي"], correct: 0 },
      { q: "ما الأمر لإضافة مستخدم جديد؟", options: ["adduser", "newuser", "createuser", "useradd -n"], correct: 0 },
      { q: "أين تجد الـ system logs في لينكس؟", options: ["/var/log/", "/etc/log/", "/home/log/", "/tmp/log/"], correct: 0 },
      { q: "ما chmod 644 يعني؟", options: ["rw-r--r--", "rwxr--r--", "rw-rw-r--", "rwxrwxr-x"], correct: 0 }
    ],
    networking_basics: [
      { q: "كم خطوة في TCP 3-way handshake؟", options: ["3", "2", "4", "5"], correct: 0 },
      { q: "ما البورت الخاص بـ HTTPS؟", options: ["443", "80", "8080", "8443"], correct: 0 },
      { q: "ما الفرق الأساسي بين TCP و UDP؟", options: ["TCP موثوق، UDP أسرع", "UDP موثوق، TCP أسرع", "كلاهما موثوقان", "لا فرق"], correct: 0 },
      { q: "ما الـ OSI layer الخاص بـ TCP؟", options: ["Transport (4)", "Network (3)", "Session (5)", "Application (7)"], correct: 0 },
      { q: "ما بورت SSH؟", options: ["22", "21", "23", "25"], correct: 0 },
      { q: "ما وظيفة DNS؟", options: ["تحويل اسم النطاق لـ IP", "توزيع IP", "فلترة الشبكة", "تشفير البيانات"], correct: 0 },
      { q: "ما معنى CIDR /24؟", options: ["256 عنوان IP", "512 عنوان IP", "128 عنوان IP", "1024 عنوان IP"], correct: 0 },
      { q: "ما الفرق بين Switch و Router؟", options: ["Switch داخل شبكة، Router بين شبكات", "Router داخل شبكة، Switch بين شبكات", "كلاهما نفس الوظيفة", "لا يوجد فرق"], correct: 0 },
      { q: "ما بورت MySQL؟", options: ["3306", "5432", "1433", "27017"], correct: 0 },
      { q: "ما الـ ARP؟", options: ["يربط IP بـ MAC address", "يربط MAC بـ IP", "يوزع IP تلقائياً", "يترجم أسماء النطاقات"], correct: 0 }
    ],
    oop_basics: [
      { q: "ما الفرق بين Overloading و Overriding؟", options: ["Overloading في نفس الكلاس، Overriding في كلاس ابن", "Overriding في نفس الكلاس، Overloading في كلاس ابن", "كلاهما في نفس الكلاس", "لا فرق"], correct: 0 },
      { q: "ما الـ Pure Virtual Function؟", options: ["دالة مُعرّفة كـ = 0", "دالة بدون return", "دالة static", "دالة private"], correct: 0 },
      { q: "ما أحد أعمدة OOP الأربعة؟", options: ["Encapsulation", "Compilation", "Iteration", "Recursion"], correct: 0 },
      { q: "ما الفرق بين struct و class في C++؟", options: ["struct public بالافتراضي، class private", "class public بالافتراضي، struct private", "لا فرق", "struct لا تدعم الوراثة"], correct: 0 },
      { q: "متى نحتاج Copy Constructor؟", options: ["عند وجود pointers في الكلاس", "دايماً", "أبداً", "عند الـ inheritance فقط"], correct: 0 },
      { q: "ما الـ Friend Function؟", options: ["دالة لها وصول لـ private members بدون كونها member", "دالة تنادي دالة أخرى", "دالة static", "دالة افتراضية"], correct: 0 },
      { q: "ما Late Binding؟", options: ["تحديد الدالة المُستدعاة وقت التشغيل", "تحديد الدالة وقت الترجمة", "استدعاء دالة متأخرة", "لا تحديد للدالة"], correct: 0 },
      { q: "ما الـ Abstract Class؟", options: ["كلاس يحتوي pure virtual function", "كلاس بدون بيانات", "كلاس فارغ", "كلاس template"], correct: 0 },
      { q: "ما الفرق بين Shallow Copy و Deep Copy؟", options: ["Shallow ينسخ المؤشر، Deep ينسخ البيانات نفسها", "Deep ينسخ المؤشر، Shallow ينسخ البيانات", "كلاهما نفس الشيء", "Shallow أبطأ دايماً"], correct: 0 },
      { q: "ما الـ Static member في كلاس C++؟", options: ["متغير مشترك بين كل instances الكلاس", "متغير لكل instance", "متغير const", "متغير virtual"], correct: 0 }
    ],
    os_basics: [
      { q: "ما الفرق بين Process و Thread؟", options: ["Process له memory مستقلة، Thread يشاركها", "Thread له memory مستقلة، Process يشاركها", "لا فرق", "Thread أبطأ دايماً"], correct: 0 },
      { q: "ما شروط الـ Deadlock؟", options: ["Hold, Mutual Exclusion, Circular Wait, No Preemption", "Hold, Sharing, Linear Wait, Preemption", "Block, Mutual Exclusion, Circular Wait, Preemption", "Hold, Sharing, Random Wait, No Preemption"], correct: 0 },
      { q: "ما الـ Round Robin scheduling؟", options: ["كل process تأخذ وقت محدد (quantum) بالدور", "أقصر process تُنفَّذ أولاً", "أطول process تُنفَّذ أولاً", "بالترتيب بدون حد زمني"], correct: 0 },
      { q: "ما الـ Virtual Memory؟", options: ["تقنية تجعل الـ disk يعمل كـ RAM", "RAM إضافية", "Cache أكبر", "GPU Memory"], correct: 0 },
      { q: "ما الفرق بين Paging و Segmentation؟", options: ["Paging أحجام ثابتة، Segmentation أحجام متغيرة", "Segmentation أحجام ثابتة، Paging متغيرة", "كلاهما نفس الشيء", "Paging للـ disk فقط"], correct: 0 },
      { q: "ما الـ Thrashing؟", options: ["الـ OS يقضي وقته في swapping بدل تنفيذ processes", "الـ CPU يحترق", "الـ RAM تمتلئ", "الـ disk يتوقف"], correct: 0 },
      { q: "ما الـ Semaphore؟", options: ["متغير لـ synchronization بين processes", "نوع memory", "جدولة processes", "بروتوكول شبكة"], correct: 0 },
      { q: "ما الفرق بين Kernel Mode و User Mode؟", options: ["Kernel Mode وصول كامل للـ hardware، User Mode محدود", "User Mode وصول كامل، Kernel محدود", "كلاهما نفس الصلاحيات", "Kernel للمستخدم فقط"], correct: 0 },
      { q: "ما الـ System Call؟", options: ["طلب برنامج لخدمة من الـ OS kernel", "استدعاء دالة في البرنامج", "نداء شبكي", "استدعاء database"], correct: 0 },
      { q: "ما الـ Context Switching؟", options: ["الـ CPU يتحول من process لأخرى مع حفظ الحالة", "تغيير الـ OS", "إغلاق برنامج وفتح آخر", "تغيير الـ thread داخل نفس الـ process"], correct: 0 }
    ],
    english_vocab: [
      { q: "ما مرادف كلمة Concise؟", options: ["Brief", "Verbose", "Long", "Complex"], correct: 0 },
      { q: "ما مضاد كلمة Enhance؟", options: ["Diminish", "Improve", "Boost", "Increase"], correct: 0 },
      { q: "ما معنى Ambiguous؟", options: ["غير واضح / محتمل أكثر من معنى", "واضح جداً", "مؤكد", "بسيط"], correct: 0 },
      { q: "ما مرادف Diligent؟", options: ["Hardworking", "Lazy", "Smart", "Fast"], correct: 0 },
      { q: "ما معنى Obsolete؟", options: ["قديم وغير مستخدم", "جديد ومتطور", "شائع", "ضروري"], correct: 0 },
      { q: "في الجملة: 'He _____ working here for 5 years', أيهما صحيح؟", options: ["has been", "is", "was", "will be"], correct: 0 },
      { q: "ما الـ Passive Voice لـ 'They build the system'؟", options: ["The system is built by them", "The system was built by them", "The system has been built", "They are building the system"], correct: 0 },
      { q: "ما مرادف Innovative؟", options: ["Creative", "Traditional", "Ordinary", "Simple"], correct: 0 },
      { q: "ما معنى Implement؟", options: ["تنفيذ / تطبيق", "تصميم", "اختبار", "توثيق"], correct: 0 },
      { q: "ما معنى بادئة 'Pre-' في كلمة Prerequisite؟", options: ["قبل", "بعد", "مع", "ضد"], correct: 0 }
    ]
  };

  function open(quizKey) {
    const questions = QUIZZES[quizKey];
    if (!questions) { Toast.show('الكويز غير متوفر بعد! 📝', 'info'); return; }
    _questions = [...questions].sort(() => Math.random() - 0.5);
    _current = 0;
    _score = 0;
    _answered = false;

    const modal = document.getElementById('quiz-modal');
    document.getElementById('quiz-modal-title').textContent = _getTitle(quizKey);
    modal.classList.add('open');
    _renderQuestion();
  }

  function _getTitle(key) {
    const titles = { linux_basics: 'كويز Linux', networking_basics: 'كويز Networking', oop_basics: 'كويز OOP & C++', os_basics: 'كويز OS', english_vocab: 'كويز English' };
    return titles[key] || 'كويز';
  }

  function _renderQuestion() {
    if (_current >= _questions.length) { _showResult(); return; }
    const q = _questions[_current];
    _answered = false;

    document.getElementById('quiz-progress-fill').style.width = `${(_current / _questions.length) * 100}%`;
    document.getElementById('quiz-q-counter').textContent = _t(`سؤال ${_current + 1} من ${_questions.length}`, `Question ${_current + 1} of ${_questions.length}`);
    document.getElementById('quiz-question').textContent = q.q;
    document.getElementById('quiz-options').innerHTML = q.options.map((opt, i) => `
      <div class="quiz-option" onclick="Quiz.answer(${i})">${opt}</div>
    `).join('');

    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.style.display = 'none';
    document.getElementById('quiz-skip-btn').style.display = 'flex';
  }

  function answer(index) {
    if (_answered) return;
    _answered = true;
    const q = _questions[_current];
    const opts = document.querySelectorAll('.quiz-option');
    opts.forEach((opt, i) => {
      if (i === q.correct) opt.classList.add('correct');
      else if (i === index && i !== q.correct) opt.classList.add('wrong');
    });
    if (index === q.correct) _score++;
    document.getElementById('quiz-next-btn').style.display = 'flex';
    document.getElementById('quiz-skip-btn').style.display = 'none';
  }

  function next() {
    _current++;
    _renderQuestion();
  }

  function skip() {
    _current++;
    _renderQuestion();
  }

  function _showResult() {
    const pct = Math.round((_score / _questions.length) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : pct >= 40 ? '💪' : '📚';
    const msg = pct >= 80 
      ? _t('ممتاز! أنت جاهز!', 'Excellent! You are ready!') 
      : pct >= 60 
        ? _t('كويس — استمر!', 'Good job — keep it up!') 
        : pct >= 40 
          ? _t('تحتاج مراجعة أكثر', 'Needs more review') 
          : _t('راجع الموضوع ده تاني', 'Please study this topic again');

    document.getElementById('quiz-body').innerHTML = `
      <div class="quiz-score-card">
        <div class="qsc-emoji">${emoji}</div>
        <div class="qsc-score">${pct}%</div>
        <div class="qsc-label">${msg}</div>
        <div class="qsc-breakdown">
          <div class="qsc-stat"><div class="num" style="color:var(--brand-green)">${_score}</div><div class="lbl">${_t('صح', 'Correct')}</div></div>
          <div class="qsc-stat"><div class="num" style="color:var(--brand-red)">${_questions.length - _score}</div><div class="lbl">${_t('غلط', 'Incorrect')}</div></div>
          <div class="qsc-stat"><div class="num">${_questions.length}</div><div class="lbl">${_t('إجمالي', 'Total')}</div></div>
        </div>
        <div style="margin-top:24px;display:flex;gap:12px;justify-content:center">
          <button class="btn btn-primary" onclick="Quiz.restart()">🔄 ${_t('إعادة', 'Retry')}</button>
          <button class="btn btn-secondary" onclick="Quiz.close()">✓ ${_t('إنهاء', 'Finish')}</button>
        </div>
      </div>
    `;
  }

  function restart() {
    _current = 0; _score = 0; _answered = false;
    document.getElementById('quiz-body').innerHTML = _buildQuizHTML();
    _renderQuestion();
  }

  function _buildQuizHTML() {
    return `
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quiz-progress-fill"></div></div>
      <div class="quiz-q-counter" id="quiz-q-counter"></div>
      <div class="quiz-question" id="quiz-question"></div>
      <div class="quiz-options" id="quiz-options"></div>
      <div class="quiz-nav" id="quiz-nav">
        <button class="btn btn-secondary btn-sm" id="quiz-skip-btn" onclick="Quiz.skip()">${_t('تخطي ←', 'Skip →')}</button>
        <button class="btn btn-primary btn-sm" id="quiz-next-btn" onclick="Quiz.next()" style="display:none">${_t('التالي ←', 'Next →')}</button>
      </div>
    `;
  }

  function close() {
    document.getElementById('quiz-modal')?.classList.remove('open');
  }

  return { open, answer, next, skip, close, restart };
})();

/* ============================================================
   UI HELPERS
   ============================================================ */
const UI = (() => {
  function getTypeIcon(type) {
    const icons = { english:'🇬🇧', grammar:'📖', reading:'📚', iq:'🧠', iq_math:'🔢', iq_logic:'🔍', iq_spatial:'🔷', linux:'🐧', linux_adv:'⚙️', networking:'🌐', networking_adv:'🔗', os:'💾', os_adv:'⚙️', oop:'🔷', oop_adv:'🏗️', cpp:'⚡', database:'🗄️', ds:'📊', algorithms:'🔄', sysadmin:'🖥️', devops:'🚀', hr:'🤝', tech_interview:'💻', mock:'📝', revision:'🔄', default:'📋' };
    return icons[type] || icons.default;
  }

  function getGradientCSS(gradArr) {
    return `linear-gradient(135deg, ${gradArr[0]}, ${gradArr[1]})`;
  }

  function starsHTML(n) {
    return '★'.repeat(n) + '☆'.repeat(5-n);
  }

  function openSearch() {
    document.getElementById('search-overlay')?.classList.add('open');
    setTimeout(() => document.getElementById('search-modal-input')?.focus(), 100);
  }

  function closeSearch() {
    document.getElementById('search-overlay')?.classList.remove('open');
  }

  function openSidebar() {
    document.getElementById('sidebar')?.classList.add('open');
    document.getElementById('sidebar-overlay')?.classList.add('show');
  }

  function closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('show');
  }

  function celebrate(dayId) {
    const msgs = APP_CONFIG.celebrationMessages;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    const overlay = document.getElementById('celebration-overlay');
    if (!overlay) return;
    document.getElementById('celebrate-msg').textContent = msg;
    const nextDay = dayId < STUDY_DATA.days[STUDY_DATA.days.length-1].id;
    document.getElementById('celebrate-next-btn').style.display = nextDay ? 'flex' : 'none';
    document.getElementById('celebrate-next-btn').onclick = () => {
      overlay.classList.remove('show');
      Router.navigate('day-detail', { dayId: dayId + 1 });
    };
    overlay.classList.add('show');
    launchConfetti();
  }

  function launchConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#e94560','#f5a623','#00d4aa','#4fc3f7','#b39ddb','#ffdd57'];
    for (let i = 0; i < 80; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position:absolute; width:8px; height:8px;
        background:${colors[i % colors.length]};
        border-radius:${Math.random() > 0.5 ? '50%' : '0'};
        left:${Math.random() * 100}%;
        animation: confettiFall ${1.5 + Math.random() * 2}s ${Math.random() * 0.5}s ease-in forwards;
      `;
      container.appendChild(p);
    }
  }

  function updateProgressPill() {
    const pct = State.getOverallProgress();
    document.querySelectorAll('.pill-fill').forEach(el => el.style.width = pct + '%');
    document.querySelectorAll('.pill-pct').forEach(el => el.textContent = pct + '%');
  }

  return { getTypeIcon, getGradientCSS, starsHTML, openSearch, closeSearch, openSidebar, closeSidebar, celebrate, updateProgressPill };
})();

/* ============================================================
   RENDER ENGINE
   ============================================================ */
const Render = (() => {

  /* ── Dashboard ── */
  function dashboard() {
    const pct = State.getOverallProgress();
    const completedDays = State.getCompletedDays();
    const completedTasks = State.getCompletedTasks();
    const streak = State.get('streak.count') || 0;
    const quote = APP_CONFIG.motivationalQuotes[Math.floor(Date.now() / 86400000) % APP_CONFIG.motivationalQuotes.length];

    // Update hero stats by their specific IDs
    const overallEl = document.getElementById('dash-overall-pct');
    const daysEl    = document.getElementById('dash-completed-days');
    const streakEl  = document.getElementById('dash-streak');
    const tasksEl   = document.getElementById('dash-tasks-done');

    if (overallEl)  overallEl.textContent  = pct + '%';
    if (daysEl)     daysEl.textContent     = completedDays;
    if (streakEl)   streakEl.textContent   = streak + ' 🔥';
    if (tasksEl)    tasksEl.textContent    = completedTasks;

    // Quote
    const quoteEl = document.getElementById('dash-quote');
    if (quoteEl) {
      quoteEl.querySelector('.quote-text').textContent = `"${quote.text}"`;
      quoteEl.querySelector('.quote-author').textContent = `— ${quote.author}`;
    }

    // KPIs
    const remaining = STUDY_DATA.days.length - completedDays;
    if (document.getElementById('kpi-progress'))   document.getElementById('kpi-progress').textContent   = pct + '%';
    if (document.getElementById('kpi-completed'))  document.getElementById('kpi-completed').textContent  = completedDays;
    if (document.getElementById('kpi-remaining'))  document.getElementById('kpi-remaining').textContent  = remaining;
    if (document.getElementById('kpi-streak'))     document.getElementById('kpi-streak').textContent     = streak;
    if (document.getElementById('kpi-tasks'))      document.getElementById('kpi-tasks').textContent      = completedTasks;

    // Day cards
    renderDayCards('dash-days-grid', true);

    UI.updateProgressPill();
  }

  /* ── Study Plan ── */
  function studyPlan() {
    renderDayCards('plan-days-grid', false);
    UI.updateProgressPill();
  }

  function renderDayCards(containerId, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const days = limit ? STUDY_DATA.days.slice(0, 6) : STUDY_DATA.days;
    container.innerHTML = days.map(day => {
      const pct = State.getDayProgress(day.id);
      const gradCSS = UI.getGradientCSS(day.gradient);
      const isSpecial = day.isSpecial;
      const allTypes = [...new Set(day.sessions.flatMap(s => s.tasks.map(t => t.type)))].slice(0, 4);

      const title = _t(day.title, day.title_en || day.title)
        .replace(/اليوم [^ ]+ — /, '')
        .replace(/Day \d+ — /, '');
      const theme = _t(day.theme, day.theme_en || day.theme);
      const quote = _t(day.quote, day.quote_en || day.quote);
      const specialLabel = isSpecial ? _t(
        day.specialType === 'mock' ? '🔴 تجريبي' : day.specialType === 'final_mock' ? '🔴 نهائي' : '🟢 آخر يوم',
        day.specialType === 'mock' ? '🔴 Mock' : day.specialType === 'final_mock' ? '🔴 Final' : '🟢 Final Day'
      ) : '';

      return `
        <div class="day-overview-card" onclick="Router.navigate('day-detail',{dayId:${day.id}})">
          <div class="doc-header">
            <div class="doc-num" style="background:${gradCSS}">${day.id}</div>
            <div>
              <div class="doc-title">${title}</div>
              <div class="doc-theme">${theme} <span style="opacity:0.6;margin:0 4px">•</span> <span style="font-weight:700;color:var(--brand-orange)">${getDayDate(day.id)}</span></div>
            </div>
            ${isSpecial ? `<div class="doc-special-badge">${specialLabel}</div>` : ''}
          </div>
          <div class="doc-body">
            <div class="doc-quote">"${quote}"</div>
            <div class="doc-tags">
              ${allTypes.map(t => `<span class="doc-tag tag-${t}">${UI.getTypeIcon(t)}</span>`).join('')}
            </div>
            <div class="doc-progress">
              <div class="doc-prog-bar"><div class="doc-prog-fill" style="width:${pct}%;background:${gradCSS}"></div></div>
              <div class="doc-prog-pct">${pct}%</div>
              ${pct === 100 ? '<span>✅</span>' : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (limit && STUDY_DATA.days.length > 6) {
      container.insertAdjacentHTML('beforeend', `
        <div class="day-overview-card" onclick="Router.navigate('study-plan')" style="display:flex;align-items:center;justify-content:center;min-height:140px;cursor:pointer;border:2px dashed var(--border-default);">
          <div style="text-align:center;color:var(--text-muted);">
            <div style="font-size:24px;margin-bottom:8px">📅</div>
            <div style="font-size:13px;font-weight:700">${_t('عرض كل الأيام', 'View All Days')}</div>
          </div>
        </div>
      `);
    }
  }

  /* ── Day Detail ── */
  function dayDetail(dayId) {
    const day = STUDY_DATA.days.find(d => d.id === dayId);
    if (!day) return;
    State.set('currentDay', dayId);

    const container = document.getElementById('view-day-detail');
    if (!container) return;

    const pct = State.getDayProgress(dayId);
    const gradCSS = UI.getGradientCSS(day.gradient);
    const totalTasks = day.sessions.reduce((acc, s) => acc + s.tasks.length, 0);
    const doneTasks = day.sessions.reduce((acc, s) => acc + s.tasks.filter(t => State.getTaskProgress(t.id).done).length, 0);

    const dayTitle = _t(day.title, day.title_en || day.title) + ` (${getDayDate(dayId)})`;

    const quote = _t(day.quote, day.quote_en || day.quote);
    const checkpoint = _t(day.checkpoint, day.checkpoint_en || day.checkpoint);

    container.innerHTML = `
      <div class="day-detail">
        <!-- Back Button -->
        <div style="margin-bottom:16px">
          <button class="btn btn-ghost btn-sm" onclick="Router.navigate('study-plan')">${_t('← العودة للخطة', '← Back to Plan')}</button>
        </div>

        <!-- Day Header -->
        <div class="day-detail-header">
          <div class="ddh-top">
            <div class="ddh-num" style="background:${gradCSS}">${day.id}</div>
            <div class="ddh-info">
              <h1>${dayTitle}</h1>
              <p>"${quote}"</p>
            </div>
            <div class="ddh-actions">
              <button class="btn btn-secondary btn-sm" onclick="UI.openSearch()">${_t('🔍 بحث', '🔍 Search')}</button>
            </div>
          </div>
          <div class="ddh-progress">
            <div class="ddh-prog-info">
              <div class="ddh-prog-label">${_t(`تقدم اليوم — ${doneTasks} من ${totalTasks} مهمة`, `Today's Progress — ${doneTasks} of ${totalTasks} tasks`)}</div>
              <div class="ddh-prog-bar"><div class="ddh-prog-fill" id="day-prog-fill" style="width:${pct}%"></div></div>
            </div>
            <div class="ddh-prog-pct" id="day-prog-pct">${pct}%</div>
          </div>
        </div>

        <!-- Sessions -->
        ${day.sessions.map(session => renderSession(session, day)).join('')}

        <!-- Checkpoint -->
        <div class="checkpoint-banner">
          <div class="cpb-icon">✅</div>
          <div>
            <div class="cpb-label">${_t(`Checkpoint اليوم ${day.id}`, `Day ${day.id} Checkpoint`)}</div>
            <div class="cpb-text">${checkpoint}</div>
          </div>
        </div>

        <!-- Navigation -->
        <div style="display:flex;justify-content:space-between;margin-top:24px;gap:12px;flex-wrap:wrap">
          ${day.id > STUDY_DATA.days[0].id ? `<button class="btn btn-secondary" onclick="Router.navigate('day-detail',{dayId:${day.id-1}})">${_t('← اليوم السابق', '← Previous Day')}</button>` : '<div></div>'}
          ${pct === 100 ? `<button class="btn btn-primary" onclick="UI.celebrate(${day.id})">${_t('🎉 يوم مكتمل!', '🎉 Day Completed!')}</button>` : `<button class="btn btn-secondary" onclick="markDayComplete(${day.id})">${_t('✓ إتمام اليوم', '✓ Complete Day')}</button>`}
          ${day.id < STUDY_DATA.days[STUDY_DATA.days.length-1].id ? `<button class="btn btn-secondary" onclick="Router.navigate('day-detail',{dayId:${day.id+1}})">${_t('اليوم التالي →', 'Next Day →')}</button>` : ''}
        </div>
      </div>
    `;

    // Update sidebar
    updateSidebarDays();
  }

  function renderSession(session, day) {
    const dotColors = { morning: '#f5a623', afternoon: '#4fc3f7', evening: '#b39ddb' };
    const color = dotColors[session.period] || '#888';

    const label = (State.get('lang') || 'ar') === 'ar' 
      ? session.label 
      : session.label.replace('الصبح', 'Morning').replace('الضهر', 'Afternoon').replace('المسا', 'Evening');

    return `
      <div class="session-block">
        <div class="session-label">
          <div class="session-dot" style="background:${color}"></div>
          ${label}
        </div>
        ${session.tasks.map(task => renderTaskCard(task, day)).join('')}
      </div>
    `;
  }

  function renderTaskCard(task, day) {
    const prog = State.getTaskProgress(task.id);
    const res = RESOURCES[task.resourceKey] || {};
    const gradCSS = UI.getGradientCSS(day.gradient);

    const diffClass = { easy: 'diff-easy', medium: 'diff-medium', hard: 'diff-hard' }[task.difficulty] || 'diff-medium';
    const diffLabel = _t(
      { easy: 'سهل', medium: 'متوسط', hard: 'صعب' }[task.difficulty] || 'متوسط',
      { easy: 'Easy', medium: 'Medium', hard: 'Hard' }[task.difficulty] || 'Medium'
    );

    const durationLabel = task.duration > 0 ? `⏱ ${task.duration}${_t('د', 'm')}` : '';

    const taskTitle = _t(task.title, task.title_en || task.title);
    const taskDesc = _t(task.description, task.description_en || task.description);
    const taskPractice = _t(task.practice, task.practice_en || task.practice);
    const taskOutcome = _t(task.outcome, task.outcome_en || task.outcome);

    return `
      <div class="task-card ${prog.done ? 'completed' : ''}" id="task-${task.id}">
        <div class="tc-header" onclick="toggleTask('${task.id}')">
          <div class="tc-check ${prog.done ? 'checked' : ''}" onclick="event.stopPropagation();toggleTaskDone('${task.id}','${day.id}')"></div>
          <div class="tc-meta">
            <div class="tc-time">${task.time}</div>
            <div class="tc-title ${prog.done ? 'done' : ''}">${taskTitle}</div>
          </div>
          <div class="tc-right">
            ${durationLabel ? `<div class="tc-duration">${durationLabel}</div>` : ''}
            <span class="tc-type-tag tag-${task.type}">${UI.getTypeIcon(task.type)}</span>
            <span class="tc-type-tag ${diffClass}">${diffLabel}</span>
            <span class="tc-toggle" id="toggle-${task.id}">▼</span>
          </div>
        </div>
        <div class="tc-body" id="body-${task.id}">
          <p class="tc-description">${taskDesc}</p>
          <div class="tc-info-row">
            <span class="tc-info-item">🎯 ${taskPractice}</span>
          </div>
          <div class="tc-outcome">
            <div class="tc-outcome-label">${_t('النتيجة المتوقعة', 'Expected Outcome')}</div>
            <div class="tc-outcome-text">${taskOutcome}</div>
          </div>
          <!-- Resource Buttons -->
          <div class="resource-buttons">
            <!-- PDF: open local/remote file if available -->
            ${Array.isArray(res.pdf) ? `
              <div class="res-pdf-select-wrap" style="position:relative;display:inline-flex;flex:1">
                <select class="res-btn pdf" onchange="if(this.value){PDFModal.open(this.value,'${task.title.replace(/'/g,"\\'")}')};this.value=''" style="width:100%;text-align:center;padding:0 8px;cursor:pointer;border:none;outline:none;font-family:'Cairo',sans-serif">
                  <option value="" disabled selected>${_t('📄 اختر نسخة الـ PDF', '📄 Choose PDF Version')}</option>
                  ${res.pdf.map(item => `<option value="${item.path.replace(/'/g,"\\'")}" style="background:var(--bg-card);color:var(--text-primary)">📄 ${item.name}</option>`).join('')}
                </select>
              </div>
            ` : `
              <button class="res-btn pdf ${res.pdf ? '' : 'disabled'}"
                onclick="${res.pdf ? `PDFModal.open('${res.pdf.replace(/'/g,"\\'")}','${task.title.replace(/'/g,"\\'")}')` : `Toast.show('${_t('PDF غير متاح حالياً — قريباً 📄','PDF unavailable — coming soon 📄')}','info')`}">
                📄 PDF
              </button>
            `}

            <!-- VIDEO: always active — opens YouTube search if no direct URL -->
            <button class="res-btn video"
              onclick="VideoModal.open('${res.video || ''}','${task.title.replace(/'/g,"\\'")}','${(res.searchQ||task.title).replace(/'/g,"\\'")}')">
              ▶ ${_t('فيديو', 'Video')}
            </button>

            <!-- QUIZ: open built-in quiz if available -->
            <button class="res-btn quiz ${res.quiz || _getDefaultQuiz(task.type) ? '' : 'disabled'}"
              onclick="Quiz.open('${_getDefaultQuiz(task.type) || ''}')">
              📝 ${_t('كويز', 'Quiz')}
            </button>

            <!-- PRACTICE: open external link if available -->
            ${res.practice ? `
              <a class="res-btn practice" href="${res.practice}" target="_blank" rel="noopener" style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font-family:'Cairo',sans-serif">
                💻 ${_t('تمرين', 'Practice')}
              </a>
            ` : `
              <button class="res-btn practice disabled" onclick="Toast.show('${_t('تمرين غير متاح حالياً','Practice unavailable')}', 'info')">
                💻 ${_t('تمرين', 'Practice')}
              </button>
            `}
          </div>

          <!-- Checklist -->
          <div class="tc-checklist">
            ${['pdf','video','quiz','practice','revision'].map(item => `
              <div class="cl-item ${prog[item] ? 'checked' : ''}" onclick="toggleCheck('${task.id}','${item}')">
                <div class="cl-box"></div>
                <span>${{pdf:_t('📄 PDF', '📄 PDF'),video:_t('▶ فيديو', '▶ Video'),quiz:_t('📝 كويز', '📝 Quiz'),practice:_t('💻 تمرين', '💻 Practice'),revision:_t('🔄 مراجعة', '🔄 Revision')}[item]}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function _getDefaultQuiz(type) {
    const map = { linux: 'linux_basics', linux_adv: 'linux_basics', networking: 'networking_basics', networking_adv: 'networking_basics', oop: 'oop_basics', oop_adv: 'oop_basics', cpp: 'oop_basics', os: 'os_basics', os_adv: 'os_basics', english: 'english_vocab', grammar: 'english_vocab', reading: 'english_vocab' };
    return map[type] || '';
  }

  /* ── Question Banks ── */
  function questionBanks() {
    const container = document.getElementById('view-question-banks');
    if (!container) return;

    const cats = [
      { key: 'iq', label: '🧠 IQ', icon: '🧠' },
      { key: 'english', label: '🇬🇧 إنجليزي', icon: '🇬🇧' },
      { key: 'solved_codes', label: '💻 أكواد C++', icon: '💻' },
      { key: 'linux', label: '🐧 لينكس', icon: '🐧' },
      { key: 'networking', label: '🌐 شبكات', icon: '🌐' },
      { key: 'os', label: '💾 OS', icon: '💾' },
      { key: 'oop', label: '🔷 OOP', icon: '🔷' },
      { key: 'ds', label: '📊 DS', icon: '📊' },
      { key: 'database', label: '🗄️ DB', icon: '🗄️' },
      { key: 'devops', label: '🚀 DevOps', icon: '🚀' }
    ];

    container.innerHTML = `
      <div class="section-title">
        <div class="st-icon" style="background:linear-gradient(135deg,#e94560,#f5a623)">❓</div>
        <div><h2>بنك الأسئلة الأكثر تكراراً</h2><p>الـ 20% من الأسئلة اللي بتيجي في 80% من الامتحانات</p></div>
      </div>

      <!-- Freq Tables -->
      <div style="margin-bottom:32px">
        <h3 style="font-size:16px;font-weight:800;margin-bottom:16px;color:var(--text-primary)">🧠 IQ — تكرار أنواع الأسئلة</h3>
        <div class="freq-table-wrap">
          <table class="freq-table">
            <thead><tr><th>النوع</th><th>التكرار</th><th class="technique-col">الطريقة السريعة</th></tr></thead>
            <tbody>
              ${STUDY_DATA.questionBanks.iq.map(row => `
                <tr>
                  <td style="font-weight:700">${row.type}</td>
                  <td><span class="stars">${UI.starsHTML(row.frequency)}</span></td>
                  <td class="technique-col" style="color:var(--text-secondary)">${row.technique}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <h3 style="font-size:16px;font-weight:800;margin-bottom:16px;margin-top:24px;color:var(--text-primary)">🇬🇧 إنجليزي — تكرار أنواع الأسئلة</h3>
        <div class="freq-table-wrap">
          <table class="freq-table">
            <thead><tr><th>النوع</th><th>التكرار</th><th class="technique-col">الاستراتيجية</th></tr></thead>
            <tbody>
              ${STUDY_DATA.questionBanks.english.map(row => `
                <tr>
                  <td style="font-weight:700">${row.type}</td>
                  <td><span class="stars">${UI.starsHTML(row.frequency)}</span></td>
                  <td class="technique-col" style="color:var(--text-secondary)">${row.technique}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Technical Questions by Category -->
      <div class="section-title">
        <div class="st-icon" style="background:linear-gradient(135deg,#00d4aa,#4fc3f7)">💻</div>
        <div><h2>أسئلة تقنية مكررة</h2><p>احفظ الإجابات دي — هييجوا بشكل أو بآخر</p></div>
      </div>

      <div class="qbank-tabs">
        ${cats.map((c, i) => `<button class="qbank-tab ${i===0?'active':''}" data-cat="${c.key}" onclick="selectQBankCat('${c.key}')">${c.label}</button>`).join('')}
      </div>

      <div class="questions-list" id="qbank-list">
        ${renderQBankList('iq')}
      </div>

      <!-- Practice Quizzes -->
      <div class="section-title" style="margin-top:32px">
        <div class="st-icon" style="background:linear-gradient(135deg,#f5a623,#e94560)">📝</div>
        <div><h2>اختبر نفسك</h2><p>كويزات تفاعلية بنظام التصحيح الفوري</p></div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:12px">
        ${[
          ['linux_basics','🐧 Linux Basics','linux'],
          ['networking_basics','🌐 Networking Basics','networking_adv'],
          ['oop_basics','🔷 OOP & C++','oop_adv'],
          ['os_basics','💾 OS Concepts','os_adv'],
          ['english_vocab','🇬🇧 English Vocab','english']
        ].map(([key,label,res]) => `
          <button class="btn btn-secondary" onclick="Quiz.open('${key}')">
            ${label}
          </button>
        `).join('')}
      </div>
    `;
  }

  function renderQBankList(cat) {
    if (cat === 'solved_codes') {
      const codes = STUDY_DATA.solvedCodes || [];
      return `
        <div style="display:flex;flex-direction:column;gap:16px;width:100%">
          ${codes.map((c, i) => `
            <div class="qbank-code-card" style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:20px;display:flex;flex-direction:column;gap:12px">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
                <div style="display:flex;align-items:center;gap:10px">
                  <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--brand-red),var(--brand-orange));color:white;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px">${i+1}</div>
                  <h4 style="font-size:14px;font-weight:900;color:var(--text-primary);margin:0">${c.title}</h4>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="copyCodeText(this)" style="font-size:11px;min-height:30px;padding:0 12px;height:30px;display:inline-flex;align-items:center;gap:6px">
                  📋 <span>نسخ الكود</span>
                </button>
              </div>
              <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6">${c.desc}</p>
              <div style="position:relative;background:#0d0f1a;border-radius:8px;border:1px solid var(--border-strong);padding:14px;overflow:hidden">
                <pre style="margin:0;font-family:'JetBrains Mono',monospace;font-size:12px;color:#a9b2c3;overflow-x:auto;direction:ltr;text-align:left;white-space:pre"><code style="font-family:inherit;color:inherit;white-space:inherit">${c.code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
    const qs = STUDY_DATA.technicalQuestions[cat] || [];
    return qs.map((q, i) => `
      <div class="q-card">
        <div class="q-num-badge">${i+1}</div>
        <div class="q-text">${q}</div>
      </div>
    `).join('');
  }

  /* ── Cheat Sheets ── */
  function cheatSheets() {
    const container = document.getElementById('view-cheat-sheets');
    if (!container) return;

    const cs = STUDY_DATA.cheatSheets;

    container.innerHTML = `
      <div class="section-title">
        <div class="st-icon" style="background:linear-gradient(135deg,#1a1a2e,#4fc3f7)">📋</div>
        <div>
          <h2>${_t('Cheat Sheets', 'Cheat Sheets')}</h2>
          <p>${_t('اطبع دول وحطّهم قدامك أثناء المذاكرة', 'Print these out or keep them open while studying')}</p>
        </div>
      </div>

      <div class="cheatsheets-grid">
        <!-- Linux -->
        <div class="cheat-card">
          <div class="cheat-header" style="background:linear-gradient(135deg,#2e7d32,#66bb6a)">${_t('🐧 Linux Commands الأهم', '🐧 Crucial Linux Commands')}</div>
          <div class="cheat-body">
            <pre class="code-block">${_t(cs.linux.content, cs.linux.content_en || cs.linux.content).replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
          </div>
        </div>

        <!-- SQL -->
        <div class="cheat-card">
          <div class="cheat-header" style="background:linear-gradient(135deg,#1565c0,#42a5f5)">${_t('🗄️ SQL الأهم', '🗄️ Key SQL Commands')}</div>
          <div class="cheat-body">
            <pre class="code-block">${_t(cs.sql.content, cs.sql.content_en || cs.sql.content).replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
          </div>
        </div>

        <!-- OSI -->
        <div class="cheat-card">
          <div class="cheat-header" style="background:linear-gradient(135deg,#6a1b9a,#ab47bc)">🌐 OSI Model</div>
          <div class="cheat-body">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${_t('الطبقة', 'Layer')}</th>
                  <th>${_t('الاسم', 'Name')}</th>
                  <th>${_t('البروتوكولات', 'Protocols')}</th>
                  <th>${_t('الرمز السهل', 'Mnemonic')}</th>
                </tr>
              </thead>
              <tbody>
                ${cs.osi.data.map(r => `<tr><td><strong>${r.layer}</strong></td><td>${r.name}</td><td style="font-size:11px">${r.protocols}</td><td style="color:var(--brand-orange);font-weight:700">${r.mnemonic}</td></tr>`).join('')}
              </tbody>
            </table>
            <div style="margin-top:12px;font-size:12px;color:var(--text-muted);text-align:center">
              <strong>${_t('جملة التذكر:', 'Mnemonic Phrase:')}</strong> All People Seem To Need Data Processing
            </div>
          </div>
        </div>

        <!-- Ports -->
        <div class="cheat-card">
          <div class="cheat-header" style="background:linear-gradient(135deg,#880e4f,#e91e63)">🔌 Port Numbers</div>
          <div class="cheat-body">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${_t('البورت', 'Port')}</th>
                  <th>${_t('الخدمة', 'Service')}</th>
                  <th>${_t('البروتوكول', 'Protocol')}</th>
                </tr>
              </thead>
              <tbody>
                ${cs.ports.data.map(r => `<tr><td><strong style="color:var(--brand-red)">${r.port}</strong></td><td>${r.service}</td><td style="font-size:11px;color:var(--text-muted)">${r.proto}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Big-O DS -->
        <div class="cheat-card">
          <div class="cheat-header" style="background:linear-gradient(135deg,#004d40,#26a69a)">📊 Big-O: Data Structures</div>
          <div class="cheat-body">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${_t('الهيكل', 'Structure')}</th>
                  <th>${_t('الوصول', 'Access')}</th>
                  <th>${_t('البحث', 'Search')}</th>
                  <th>${_t('الإدخال', 'Insert')}</th>
                </tr>
              </thead>
              <tbody>
                ${cs.bigO.data.map(r => `<tr><td><strong>${r.structure}</strong></td><td>${r.access}</td><td>${r.search}</td><td>${r.insert}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Sorting -->
        <div class="cheat-card">
          <div class="cheat-header" style="background:linear-gradient(135deg,#e65100,#ff9800)">⚡ Sorting Algorithms</div>
          <div class="cheat-body">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${_t('الخوارزمية', 'Algorithm')}</th>
                  <th>${_t('الأفضل', 'Best')}</th>
                  <th>${_t('المتوسط', 'Average')}</th>
                  <th>${_t('الأسوأ', 'Worst')}</th>
                  <th>${_t('المساحة', 'Space')}</th>
                </tr>
              </thead>
              <tbody>
                ${cs.bigO.sorting.map(r => `<tr><td><strong>${r.algo}</strong></td><td>${r.best}</td><td>${r.avg}</td><td style="color:var(--brand-red)">${r.worst}</td><td>${r.space}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Print Button -->
      <div style="margin-top:24px;text-align:center">
        <button class="btn btn-primary" onclick="window.print()">🖨️ ${_t('طباعة / حفظ كـ PDF', 'Print / Save as PDF')}</button>
      </div>
    `;
  }

  /* ── HR Prep ── */
  function hrPrep() {
    const container = document.getElementById('view-hr-prep');
    if (!container) return;

    container.innerHTML = `
      <div class="section-title">
        <div class="st-icon" style="background:linear-gradient(135deg,#bf360c,#ff7043)">🤝</div>
        <div>
          <h2>${_t('تحضير المقابلة الشخصية', 'HR & Soft Skills Prep')}</h2>
          <p>${_t('نموذج STAR: Situation → Task → Action → Result', 'STAR Method: Situation → Task → Action → Result')}</p>
        </div>
      </div>

      <!-- STAR Explanation -->
      <div style="background:linear-gradient(135deg,var(--brand-navy),#0f3460);border-radius:var(--radius-lg);padding:24px;margin-bottom:24px;color:white">
        <h3 style="font-size:16px;font-weight:800;margin-bottom:16px;color:var(--brand-orange)">${_t('🌟 طريقة STAR للإجابة', '🌟 The STAR Answer Method')}</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px">
          ${[
            ['S', 'Situation', _t('الموقف — إيه كان السياق؟', 'Situation — What was the context?')],
            ['T', 'Task', _t('المهمة — إيه كان دورك؟', 'Task — What was your role?')],
            ['A', 'Action', _t('الفعل — إيه اللي عملته؟', 'Action — What actions did you take?')],
            ['R', 'Result', _t('النتيجة — إيه اللي حصل؟', 'Result — What was the outcome?')]
          ].map(([l,e,a]) => `
            <div style="background:rgba(255,255,255,0.08);border-radius:var(--radius-sm);padding:14px">
              <div style="font-size:28px;font-weight:900;color:var(--brand-orange);margin-bottom:4px">${l}</div>
              <div style="font-weight:700;margin-bottom:4px">${e}</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.7)">${a}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- HR Questions -->
      <h3 style="font-size:16px;font-weight:800;margin-bottom:16px;color:var(--text-primary)">${_t('أسئلة المقابلة الشخصية الأكثر تكراراً', 'Most Common HR Interview Questions')}</h3>
      <div class="hr-grid">
        ${STUDY_DATA.hrQuestions.map(item => `
          <div class="hr-card">
            <div class="hr-q">❓ ${_t(item.q, item.q_en || item.q)}</div>
            <div class="hr-strategy"><strong>${_t('الاستراتيجية:', 'Strategy:')}</strong> ${_t(item.strategy, item.strategy_en || item.strategy)}</div>
            <div class="hr-tips">${_t(item.tips, item.tips_en || item.tips)}</div>
          </div>
        `).join('')}
      </div>

      <!-- Tips -->
      <h3 style="font-size:16px;font-weight:800;margin:24px 0 16px;color:var(--text-primary)">${_t('💡 نصايح المقابلة الذهبية', '💡 Golden Interview Tips')}</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
        ${[
          ['🗣️', _t('اتكلم بصوت عالي', 'Think Out Loud'), _t('تفكيرك الصوتي أهم من الإجابة الصح. المحاور عايز يشوف عقلك.', 'Thinking out loud is key. Interviewers want to see how your brain works.')],
          ['⏱️', _t('90 ثانية لـ "عرفني بنفسك"', '90s "Tell Me About Yourself"'), _t('مش أكتر مش أقل. تدرّب عليها لحد ما تبقى طبيعية.', 'Aim for 90 seconds. Practice it until it feels completely natural.')],
          ['💪', _t('الثقة هتفرق', 'Confidence is Key'), _t('ادخل بثقة، تكلم بوضوح، مش لازم تعرف كل حاجة.', 'Walk in with confidence, speak clearly. It is okay if you do not know everything.')],
          ['❓', _t('اسأل أنت كمان', 'Ask Questions Too'), _t('المحاور بيبقى إيجابي لما المتقدم يسأل أسئلة ذكية.', 'Interviewers love it when candidates ask smart questions about the program.')],
          ['🎯', _t('صِدق + نمو', 'Honesty + Growth'), _t('الضعف الحقيقي مع خطة تحسين أحسن من إجابة مصطنعة.', 'A real weakness combined with a self-improvement plan is better than a fake answer.')],
          ['📚', _t('ابحث عن ITI', 'Research ITI'), _t('اعرف ITI كويس — تاريخها، برامجها، مساراتها الوظيفية.', 'Know ITI well — its history, programs, and career tracks.')]
        ].map(([icon,title,text]) => `
          <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:16px;transition:var(--transition)">
            <div style="font-size:28px;margin-bottom:10px">${icon}</div>
            <div style="font-size:13px;font-weight:800;color:var(--text-primary);margin-bottom:6px">${title}</div>
            <div style="font-size:12px;color:var(--text-secondary);line-height:1.6">${text}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ── Progress ── */
  function progress() {
    const container = document.getElementById('view-progress');
    if (!container) return;

    const overall = State.getOverallProgress();
    const r = 70, circ = 2 * Math.PI * r;
    const dash = circ * (1 - overall / 100);

    container.innerHTML = `
      <div class="section-title">
        <div class="st-icon" style="background:linear-gradient(135deg,#00d4aa,#4fc3f7)">📈</div>
        <div>
          <h2>${_t('تتبع التقدم', 'Progress Tracker')}</h2>
          <p>${_t('كل يوم تخلصه هو خطوة نحو النجاح', 'Every completed day is a step closer to success')}</p>
        </div>
      </div>

      <!-- Overall Ring -->
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:32px;margin-bottom:24px;text-align:center">
        <h3 style="font-size:16px;font-weight:800;margin-bottom:24px;color:var(--text-primary)">${_t('التقدم الإجمالي', 'Overall Progress')}</h3>
        <div style="position:relative;display:inline-block">
          <svg width="180" height="180" style="transform:rotate(-90deg)">
            <circle cx="90" cy="90" r="${r}" fill="none" stroke="var(--border-default)" stroke-width="10"/>
            <circle cx="90" cy="90" r="${r}" fill="none" stroke="url(#prog-grad)" stroke-width="10" stroke-linecap="round"
              stroke-dasharray="${circ}" stroke-dashoffset="${dash}" style="transition:stroke-dashoffset 1s ease"/>
            <defs>
              <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#e94560"/>
                <stop offset="100%" stop-color="#f5a623"/>
              </linearGradient>
            </defs>
          </svg>
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
            <div style="font-size:40px;font-weight:900;color:var(--text-primary)">${overall}%</div>
            <div style="font-size:12px;color:var(--text-muted);font-weight:600">${_t('مكتمل', 'Completed')}</div>
          </div>
        </div>
        <div style="display:flex;justify-content:center;gap:24px;margin-top:20px;flex-wrap:wrap">
          <div style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--brand-green)">${State.getCompletedDays()}</div><div style="font-size:12px;color:var(--text-muted)">${_t('أيام مكتملة', 'Completed Days')}</div></div>
          <div style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--brand-red)">${STUDY_DATA.days.length - State.getCompletedDays()}</div><div style="font-size:12px;color:var(--text-muted)">${_t('أيام متبقية', 'Days Remaining')}</div></div>
          <div style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--brand-blue)">${State.getCompletedTasks()}</div><div style="font-size:12px;color:var(--text-muted)">${_t('مهام مكتملة', 'Completed Tasks')}</div></div>
          <div style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--brand-orange)">${State.get('streak.count') || 0} 🔥</div><div style="font-size:12px;color:var(--text-muted)">${_t('سلسلة أيام', 'Day Streak')}</div></div>
        </div>
      </div>

      <!-- Days Breakdown -->
      <h3 style="font-size:16px;font-weight:800;margin-bottom:16px;color:var(--text-primary)">${_t('تفصيل الأيام', 'Days Breakdown')}</h3>
      <div class="days-progress-list">
        ${STUDY_DATA.days.map(day => {
          const dayPct = State.getDayProgress(day.id);
          const gradCSS = UI.getGradientCSS(day.gradient);
          const title = _t(day.title, day.title_en || day.title)
            .replace(/اليوم [^ ]+ — /, '')
            .replace(/Day \d+ — /, '');
          return `
            <div class="dpl-item" onclick="Router.navigate('day-detail',{dayId:${day.id}})" style="cursor:pointer">
              <div class="dpl-num">${_t(`يوم ${day.id}`, `Day ${day.id}`)}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${title}</div>
                <div class="dpl-bar-wrap"><div class="dpl-bar" style="width:${dayPct}%;background:${gradCSS}"></div></div>
              </div>
              <div class="dpl-pct">${dayPct}%</div>
              <div class="dpl-check">${dayPct === 100 ? '✅' : dayPct > 0 ? '🔄' : '⬜'}</div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Backup and Restore Widget -->
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:24px;margin-top:24px;text-align:center">
        <h3 style="font-size:15px;font-weight:800;color:var(--text-primary);margin-bottom:8px">💾 ${_t('تصدير واستيراد التقدم (بدون حساب)', 'Export & Import Progress (No Account)')}</h3>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">${_t('يمكنك حفظ تقدمك كملف أو نقله لجهاز آخر بسهولة دون الحاجة لتسجيل حساب:', 'You can save your progress as a file or transfer it to another device easily:')}</p>
        <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
          <button class="btn btn-secondary btn-sm" onclick="ProgressBackup.exportProgress()">📤 ${_t('تصدير التقدم', 'Export Progress')}</button>
          <button class="btn btn-secondary btn-sm" onclick="ProgressBackup.triggerImport()">📥 ${_t('استيراد التقدم', 'Import Progress')}</button>
          <input type="file" id="progress-import-input" accept=".json" onchange="ProgressBackup.importProgress(event)" style="display:none" />
        </div>
      </div>

      <!-- Reset Button -->
      <div style="margin-top:32px;text-align:center">
        <button class="btn btn-secondary" onclick="confirmReset()">🗑️ ${_t('إعادة تعيين التقدم', 'Reset Progress')}</button>
      </div>
    `;
  }



  /* ── Sidebar Days ── */
  function updateSidebarDays() {
    const container = document.getElementById('sidebar-days-nav');
    if (!container) return;
    const currentDay = State.get('currentDay');

    container.innerHTML = STUDY_DATA.days.map(day => {
      const pct = State.getDayProgress(day.id);
      const isDone = pct === 100;
      const isMock = day.isSpecial;
      const isCurrent = day.id === currentDay;

      let dotClass = '';
      if (isDone) dotClass = 'done';
      else if (isMock) dotClass = 'mock';
      else if (isCurrent) dotClass = 'current';

      return `
        <div class="nav-day-item ${isCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}"
          onclick="Router.navigate('day-detail',{dayId:${day.id}})">
          <div class="nav-day-dot ${dotClass}">${isDone ? '✓' : day.id}</div>
          <span>${_t(`يوم ${day.id}`, `Day ${day.id}`)} (${getDayDate(day.id)}) — ${_t(day.theme, day.theme_en || day.theme).split(' ')[0]}</span>
        </div>
      `;
    }).join('');
  }

  return {
    dashboard, studyPlan, dayDetail,
    questionBanks, cheatSheets,
    hrPrep, progress, updateSidebarDays,
    renderQBankList
  };
})();

/* ============================================================
   GLOBAL EVENT HANDLERS
   ============================================================ */

function toggleTask(taskId) {
  const body = document.getElementById(`body-${taskId}`);
  const toggle = document.getElementById(`toggle-${taskId}`);
  if (!body) return;
  body.classList.toggle('open');
  toggle?.classList.toggle('open');
}

function toggleTaskDone(taskId, dayId) {
  const prog = State.getTaskProgress(taskId);
  const newDone = !prog.done;
  State.setTaskDone(taskId, newDone);

  // Update UI
  const card = document.getElementById(`task-${taskId}`);
  if (card) {
    card.classList.toggle('completed', newDone);
    const check = card.querySelector('.tc-check');
    const title = card.querySelector('.tc-title');
    if (check) check.classList.toggle('checked', newDone);
    if (title) title.classList.toggle('done', newDone);
  }

  // Update day progress
  const pct = State.getDayProgress(parseInt(dayId));
  const fill = document.getElementById('day-prog-fill');
  const pctEl = document.getElementById('day-prog-pct');
  if (fill) fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';

  UI.updateProgressPill();

  if (newDone) {
    Toast.show('مهمة اكتملت! ✅', 'success');
    State.updateStreak();
  }

  // Check if all day tasks done
  if (pct === 100) {
    setTimeout(() => UI.celebrate(parseInt(dayId)), 500);
  }
}

function toggleCheck(taskId, key) {
  const prog = State.getTaskProgress(taskId);
  const newVal = !prog[key];
  State.setTaskCheck(taskId, key, newVal);

  const item = document.querySelector(`[onclick="toggleCheck('${taskId}','${key}')"]`);
  if (item) item.classList.toggle('checked', newVal);

  if (newVal) Toast.show(`تم تحديد: ${key} ✓`, 'success', 1500);
}

function selectQBankCat(cat) {
  document.querySelectorAll('.qbank-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.cat === cat);
  });
  const list = document.getElementById('qbank-list');
  if (list) list.innerHTML = Render.renderQBankList(cat);
}

function copyCodeText(btn) {
  const card = btn.closest('.qbank-code-card');
  const codeEl = card ? card.querySelector('pre') : null;
  if (!codeEl) return;
  const text = codeEl.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const span = btn.querySelector('span');
    if (span) {
      span.textContent = 'تم النسخ! ✓';
      btn.style.background = 'var(--brand-green)';
      btn.style.color = '#fff';
      setTimeout(() => {
        span.textContent = 'نسخ الكود';
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
    }
    Toast.show('تم نسخ الكود بنجاح! 📋', 'success', 2000);
  }).catch(() => {
    Toast.show('فشل نسخ الكود', 'error');
  });
}

function markDayComplete(dayId) {
  const day = STUDY_DATA.days.find(d => d.id === dayId);
  if (!day) return;
  day.sessions.forEach(s => s.tasks.forEach(t => State.setTaskDone(t.id, true)));
  Toast.show('تم تحديد كل مهام اليوم كمكتملة! 🎉', 'success');
  setTimeout(() => Router.navigate('day-detail', { dayId }), 200);
}

function confirmReset() {
  if (confirm('هل أنت متأكد؟ ده هيمسح كل تقدمك. مش هنقدر نرجعه!')) {
    localStorage.clear();
    location.reload();
  }
}

/* ============================================================
   APP INITIALIZATION
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize subsystems
  Theme.init();
  Lang.apply(State.get('lang') || 'ar');
  Toast.init();
  Search.buildIndex();
  State.updateStreak();

  // Search
  const searchInput = document.getElementById('search-modal-input');
  const searchResults = document.getElementById('search-results');
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const results = Search.query(e.target.value);
      Search.renderResults(results, searchResults);
    });
  }

  // Header search input (quick)
  const quickSearch = document.getElementById('quick-search-input');
  if (quickSearch) {
    quickSearch.addEventListener('focus', UI.openSearch);
  }

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        VideoModal.close();
        PDFModal.close();
        Quiz.close();
      }
    });
  });

  // Close search overlay
  document.getElementById('search-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'search-overlay') UI.closeSearch();
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      UI.closeSearch();
      VideoModal.close();
      PDFModal.close();
      Quiz.close();
      UI.closeSidebar();
      document.getElementById('celebration-overlay')?.classList.remove('show');
    }
    // Keyboard shortcuts
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      UI.openSearch();
    }
  });

  // Sidebar overlay click
  document.getElementById('sidebar-overlay')?.addEventListener('click', UI.closeSidebar);

  // Add confetti CSS keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    #confetti-container { position: fixed; inset: 0; pointer-events: none; z-index: 501; overflow: hidden; }
  `;
  document.head.appendChild(style);

  // Start on dashboard
  Router.navigate('dashboard');
  Render.updateSidebarDays();
});

// Expose globals needed by HTML onclick handlers
window.Router = Router;
window.UI = UI;
window.VideoModal = VideoModal;
window.PDFModal = PDFModal;
window.Quiz = Quiz;
window.Search = Search;
window.Render = Render;
window.Toast = Toast;
window.Theme = Theme;
window.Lang = Lang;
window.ProgressBackup = ProgressBackup;
window.copyCodeText = copyCodeText;
