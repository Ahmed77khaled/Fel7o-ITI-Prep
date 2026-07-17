/**
 * ============================================================
 * ITI STUDY PLATFORM — RESOURCE CONFIGURATION
 * ============================================================
 *
 * ✅ DESIGN PRINCIPLE: Zero local dependencies for the live site.
 *    Users just open the URL and use everything directly.
 *
 * VIDEO: Leave empty ("") → the platform auto-generates a
 *        YouTube search button for the topic. No fake links.
 *
 * PDF:   Local PDFs are mapped to local file structure.
 *        Supports multiple PDFs per topic for flexible reading!
 *
 * PRACTICE: Real external links (LinkedIn/WhatsApp links, sqlzoo, etc.).
 *
 * ============================================================
 */

// Base path only used locally (file://) — ignored on surge.sh
const BASE = 'Acceptance Phase (SD)-20260716T021758Z-1-001/Acceptance Phase (SD)';

const RESOURCES = {
  english: {
    pdf: [
      { name: "خلاصة EN", path: BASE + '/EN Exam/خلاصة EN.pdf' },
      { name: "أهم ملف إنجليزي", path: BASE + '/EN Exam/اهم ملف.pdf' }
    ],
    video:    "", 
    quiz:     "",
    practice: "https://lnkd.in/dQuG9faV", // Official English Exam Sheet Link from Channel (Validated alternative)
    searchQ:  "English vocabulary ITI exam questions"
  },
  grammar: {
    pdf:      BASE + '/EN Exam/قواعد.pdf',
    video:    "",
    quiz:     "",
    practice: "https://lnkd.in/drzzudAp", // UsingEnglish grammar
    searchQ:  "English grammar rules prepositions tenses"
  },
  reading: {
    pdf: [
      { name: "أهم ملف قراءة", path: BASE + '/EN Exam/اهم ملف.pdf' },
      { name: "خلاصة EN قراءة", path: BASE + '/EN Exam/خلاصة EN.pdf' }
    ],
    video:    "",
    quiz:     "",
    practice: "https://lnkd.in/dEKBwfcd", // Paragraph completion
    searchQ:  "English reading comprehension exam tips"
  },
  iq: {
    pdf: [
      { name: "The Ultimate IQ Test Book", path: BASE + '/IQ Exam/The Ultimate IQ Test Book.pdf' },
      { name: "خلاصة IQ مفصلة", path: BASE + '/IQ Exam/خلاصة IQ.pdf' }
    ],
    video:    "https://youtube.com/playlist?list=PLbJF4g421wqnghrrFERie3mGPTkfkBttC", // Official Playlist from Channel
    quiz:     "",
    practice: "https://member.assessmentday.com/member/member-area#/", // AssessmentDay Platform
    searchQ:  "IQ questions explanation solve"
  },
  iq_math: {
    pdf:      BASE + '/IQ Exam/Adress_solution.pdf',
    video:    "https://youtube.com/playlist?list=PLbJF4g421wqnghrrFERie3mGPTkfkBttC",
    quiz:     "",
    practice: "https://lnkd.in/d2ASHQg4", // Math Percentage
    searchQ:  "math average percentage arithmetic problems"
  },
  iq_logic: {
    pdf:      BASE + '/IQ Exam/692-501-challenging-logical-reasoning-questions.pdf',
    video:    "https://youtube.com/playlist?list=PLbJF4g421wqnghrrFERie3mGPTkfkBttC",
    quiz:     "",
    practice: "https://member.assessmentday.com/member/member-area#/", // AssessmentDay Platform (Logical / Encryption)
    searchQ:  "logical reasoning coding decoding directions kinship"
  },
  iq_spatial: {
    pdf:      BASE + '/IQ Exam/خلاصة IQ.pdf',
    video:    "https://youtube.com/playlist?list=PLbJF4g421wqnghrrFERie3mGPTkfkBttC",
    quiz:     "",
    practice: "https://lnkd.in/dVPM-njM", // IQ Cheat Sheet link
    searchQ:  "spatial reasoning 3d cube matrix"
  },
  linux: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "https://linuxjourney.com/",
    searchQ:  "linux commands tutorial beginners"
  },
  linux_adv: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "https://overthewire.org/wargames/bandit/",
    searchQ:  "linux permissions chmod users processes tutorial"
  },
  networking: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "https://www.subnettingpractice.com/",
    searchQ:  "OSI model explained TCP IP networking"
  },
  networking_adv: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "https://www.subnettingpractice.com/",
    searchQ:  "TCP UDP DNS subnetting CIDR networking"
  },
  os: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "",
    searchQ:  "operating system process scheduling deadlock"
  },
  os_adv: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "",
    searchQ:  "deadlock virtual memory paging OS concepts"
  },
  oop: {
    pdf: [
      { name: "خلاصة OOP مفاهيم", path: BASE + '/Tech Exam/OOP-Concepts.pdf' },
      { name: "تلخيص الـ OOP كامل", path: BASE + '/Tech Exam/تلخيص ال OOP.pdf' },
      { name: "Object-Oriented Programming Concepts", path: BASE + '/Tech Exam/Object-Oriented Programming (OOP) Concept.pdf' },
      { name: "شرح oopNotes مفصل", path: BASE + '/Tech Exam/oopNotes.pdf' }
    ],
    video:    "",
    quiz:     "",
    practice: "https://www.learncpp.com/",
    searchQ:  "OOP object oriented programming C++ tutorial"
  },
  oop_adv: {
    pdf: [
      { name: "Object-Oriented Programming Concepts", path: BASE + '/Tech Exam/Object-Oriented Programming (OOP) Concept.pdf' },
      { name: "خلاصة OOP مفاهيم", path: BASE + '/Tech Exam/OOP-Concepts.pdf' },
      { name: "تلخيص الـ OOP كامل", path: BASE + '/Tech Exam/تلخيص ال OOP.pdf' }
    ],
    video:    "",
    quiz:     "",
    practice: "https://www.learncpp.com/",
    searchQ:  "virtual function abstract class polymorphism C++"
  },
  cpp: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "https://leetcode.com/problemset/?difficulty=EASY",
    searchQ:  "C++ pointers STL vectors maps tutorial"
  },
  database: {
    pdf: [
      { name: "SQL Cheat Sheet", path: BASE + '/Tech Exam/SQL_Cheat_Sheet.pdf' },
      { name: "تلخيص الـ SQL كامل", path: BASE + '/Tech Exam/تلخيص ال SQL.pdf' },
      { name: "SQL Notes by Apna College", path: BASE + '/Tech Exam/SQL Notes by Apna College (1).pdf' },
      { name: "كتاب sqlNote الشامل", path: BASE + '/Tech Exam/sqlNote.pdf' }
    ],
    video:    "",
    quiz:     "",
    practice: "https://sqlzoo.net/",
    searchQ:  "SQL JOIN SELECT tutorial beginner"
  },
  ds: {
    pdf:      BASE + '/Tech Exam/dsaNotes 2.pdf',
    video:    "",
    quiz:     "",
    practice: "https://visualgo.net/en",
    searchQ:  "data structures array linked list stack queue"
  },
  algorithms: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "https://visualgo.net/en",
    searchQ:  "sorting algorithms merge sort quick sort complexity"
  },
  sysadmin: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "https://www.digitalocean.com/community/tutorials",
    searchQ:  "linux system administration services cron logs"
  },
  devops: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "https://github.com/",
    searchQ:  "DevOps Git CI/CD Docker tutorial beginners"
  },
  hr_interview: {
    pdf: [
      { name: "أسئلة السوفت سكيلز والإجابات النموذجية", path: BASE + '/Final Interview/__جميع_أسئلة_وإجابات_انترفيو_السوفت_سكيلز_والإتش_آر_.pdf' },
      { name: "Soft Skills Q", path: BASE + '/Final Interview/Soft Skills Q.pdf' },
      { name: "ملخص Soft Skills", path: BASE + '/Final Interview/Soft skills.pdf' }
    ],
    video:    "",
    quiz:     "",
    practice: "",
    searchQ:  "HR interview questions STAR method answers"
  },
  tech_interview: {
    pdf: [
      { name: "أسئلة الـ Technical Interview لـ SD", path: BASE + '/Tech Interview/اسئلة الـTechnical Interview لـTrack SD.pdf' },
      { name: "Technical All Tracks", path: BASE + '/Tech Interview/Technical_All_Tracks .pdf' },
      { name: "Professional Developer Interview", path: BASE + '/Tech Interview/Professional Developer technical interview.pdf' },
      { name: "أسئلة Web ITI الشاملة", path: BASE + '/Tech Interview/WEB ITI.pdf' }
    ],
    video:    "",
    quiz:     "",
    practice: "https://leetcode.com/",
    searchQ:  "technical interview questions OS networking OOP"
  },
  mock_exam: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "https://www.indiabix.com/",
    searchQ:  "ITI admission test practice questions"
  },
  revision: {
    pdf:      "",
    video:    "",
    quiz:     "",
    practice: "",
    searchQ:  ""
  }
};

/**
 * APP CONFIGURATION
 */
const APP_CONFIG = {
  appName:    "Fel7o ITI Prep",
  appNameAr:  "منصة فيلحو للتأهيل للـ ITI",
  totalDays:  11,
  startDate:  "2026-07-17", // The start date of the study plan (today)
  dailyHours: { min: 3, max: 5 },
  motivationalQuotes: [
    { text: "الفرق بين الناجح والفاشل هو الالتزام في الأيام الصعبة.", author: "الـ Mentor" },
    { text: "كل يوم تذاكر فيه هو يوم أقرب للحلم.", author: "الـ Mentor" },
    { text: "وثق في العملية — النتايج بتيجي لمن بيستحقها.", author: "الـ Mentor" },
    { text: "الـ 20% الصح من المذاكرة بيديك 80% من النتيجة.", author: "Pareto" },
    { text: "مش بنحكم على اللي بدأ — بنحكم على اللي كمّل.", author: "الـ Mentor" },
    { text: "كل expert كان في يوم من الأيام مبتدئ.", author: "Robin Sharma" },
    { text: "النجاح مش حظ — هو تخطيط + تنفيذ + ثبات.", author: "الـ Mentor" },
    { text: "اليوم اللي ما بتتقدمش فيه هو يوم ضيعته.", author: "الـ Mentor" }
  ],
  celebrationMessages: [
    "🎉 ممتاز! أنهيت اليوم ده بنجاح!",
    "🏆 أحسنت! خطوة كمان نحو الهدف!",
    "⭐ رائع! استمر على نفس المستوى!",
    "🚀 برافو! دي مش مذاكرة — دي صنعة!",
    "💪 تمام! ثبّت ودخل تاني يوم!"
  ]
};
