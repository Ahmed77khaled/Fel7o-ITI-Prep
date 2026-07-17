/**
 * ============================================================
 * ITI STUDY PLATFORM — COMPLETE STUDY DATA
 * ============================================================
 * All study content preserved from original plan.
 * Structured as JavaScript objects for dynamic rendering.
 * ============================================================
 */

const STUDY_DATA = {
  days: [
    // ==================== DAY 1 ====================
    {
      id: 1,
      title: "اليوم الأول — خطة تعويضية (اليوم 1 + 2)",
      title_en: "Day 1 — Day 1 & 2 Combined Catch-up",
      theme: "التعويض",
      theme_en: "Catch-up",
      quote: "اليوم خطة تعويضية سريعة ومبسطة بدون جزء الـ IQ عشان نبدأ صح وبدون تراكمات من بكرة",
      quote_en: "A simplified catch-up plan today (skipping IQ) to start fresh and on-track from tomorrow",
      gradient: ["#f5a623","#e65100"],
      isSpecial: false,
      specialType: null,
      sessions: [
        {
          period: "morning",
          label: "☀️ الصبح",
          tasks: [
            {
              id: "d1t1", time: "8:00 – 9:30", type: "english",
              title: "إنجليزي — مفردات وقواعد أساسية (1+2)",
              title_en: "English — Core Vocabulary & Grammar (1+2)",
              description: "الأزمنة الـ 12 الأساسية (Present Perfect, Past Simple) + أهم المفردات المتكررة.",
              description_en: "Core 12 tenses (Present Perfect, Past Simple) + high-frequency vocabulary.",
              duration: 90, difficulty: "medium", resourceKey: "grammar",
              outcome: "فهم واستخدام القواعد والمفردات الأساسية",
              outcome_en: "Understand and use core grammar & vocabulary",
              practice: "25 تمرين تصحيح قواعد ومفردات تابعة للقناة",
              practice_en: "25 grammar and vocabulary correction exercises"
            },
            {
              id: "d1t2", time: "9:35 – 11:00", type: "networking",
              title: "أساسيات نظام التشغيل والشبكات (1+2)",
              title_en: "Operating Systems & Network Basics (1+2)",
              description: "أوامر لينكس الـ 10 الأساسية (ls, cd, pwd, cp) + طبقات نموذج OSI الـ 7 ووظائفها.",
              description_en: "10 essential Linux commands (ls, cd, pwd, cp) + the 7 layers of the OSI model.",
              duration: 85, difficulty: "medium", resourceKey: "networking",
              outcome: "التعامل مع نظام الملفات وفهم دور طبقات OSI",
              outcome_en: "Navigate the filesystem and explain the role of OSI layers",
              practice: "رسم نموذج OSI من الذاكرة + تجربة 10 أوامر لينكس في الـ Terminal",
              practice_en: "Draw the OSI layers from memory + run 10 Linux commands in Terminal"
            }
          ]
        },
        {
          period: "afternoon",
          label: "🌤️ الضهر",
          tasks: [
            {
              id: "d1t3", time: "11:30 – 13:00", type: "oop",
              title: "برمجة ومفاهيم المطورين (OS & OOP)",
              title_en: "Core Software Concepts (OS & OOP)",
              description: "فهم جدولة العمليات (FCFS/SJF) + المفاهيم الـ 4 الأساسية للبرمجة الشيئية (OOP).",
              description_en: "Understand Process Scheduling (FCFS/SJF) + the 4 pillars of OOP.",
              duration: 90, difficulty: "medium", resourceKey: "oop",
              outcome: "شرح جدولة العمليات وكتابة مثال OOP متكامل",
              outcome_en: "Explain scheduling policies and write a complete OOP hierarchy",
              practice: "كتابة كلاس C++ يطبق الـ 4 pillars (Inheritance, Polymorphism...)",
              practice_en: "Write a C++ class hierarchy implementing the 4 pillars"
            }
          ]
        },
        {
          period: "evening",
          label: "🌙 المسا",
          tasks: [
            {
              id: "d1t4", time: "14:30 – 15:30", type: "revision",
              title: "مراجعة سريعة + كويز التأسيس",
              title_en: "Quick Revision & Foundations Quiz",
              description: "اختبار سريع للتأكد من استيعاب أساسيات اليومين لتفادي التراكمات.",
              description_en: "Test your baseline knowledge of both days to prevent backlog.",
              duration: 60, difficulty: "easy", resourceKey: "revision",
              outcome: "ترسيخ أساسيات اليومين والانطلاق للمرحلة القادمة",
              outcome_en: "Consolidate both days' basics and prepare for tomorrow",
              practice: "20 سؤال لتأكيد الفهم السريع للمفاهيم",
              practice_en: "20 questions to confirm rapid understanding"
            }
          ]
        }
      ],
      checkpoint: "خلصت مراجعة أساسيات اليومين؟ فاهم OSI و OOP كويس؟ جاهز للمذاكرة الطبيعية بكرة؟",
      checkpoint_en: "Did you complete both days' basics? Do you understand OSI & OOP? Ready for tomorrow?",
    },

    // ==================== DAY 2 ====================
    {
      id: 2,
      title: "اليوم التاني — Reading + رياضيات IQ + لينكس متقدم",
      title_en: "Day 2 — Reading + IQ Math + Advanced Linux",
      theme: "التعمق",
      theme_en: "Deep Dive",
      quote: "الـ Reading مش بقراءة كل كلمة — اتعلم تمسح وتلاقي",
      quote_en: "Reading is not about reading every word — learn to skim and scan.",
      gradient: ["#00d4aa","#00897b"],
      isSpecial: false,
      specialType: null,
      sessions: [
        {
          period: "morning",
          label: "☀️ الصبح",
          tasks: [
            {
              id: "d2t1", time: "8:00 – 9:30", type: "english",
              title: "Reading Comprehension — تقنية Skim & Scan",
              description: "اقرا الأسئلة الأول، وبعدين الباسج. حدد الجملة الرئيسية. أسئلة inference والـ tone.",
              description_en: "Read the questions first, then the passage. Identify topic sentences. Practice inference and tone questions.",
              duration: 90, difficulty: "hard", resourceKey: "reading",
              outcome: "80%+ دقة في أسئلة الفهم",
              outcome_en: "80%+ accuracy in comprehension questions",
              practice: "2 باسج كامل مع Q&A (15 دقيقة لكل باسج)",
              practice_en: "2 full passages with Q&A (15 minutes per passage)",
            },
            {
              id: "d2t2", time: "9:35 – 11:00", type: "iq",
              title: "IQ رياضيات — نسب ومتوسطات ومسائل",
              description: "نسب مئوية، نسب تناسب، متوسطات، سرعة-مسافة-زمن، ربح وخسارة. الهدف: تحل في أقل من 90 ثانية",
              description_en: "Percentages, ratios, averages, speed-distance-time, profit & loss. Goal: Solve each under 90 seconds.",
              duration: 85, difficulty: "hard", resourceKey: "iq_math",
              outcome: "حل مسائل رياضية في أقل من 90 ثانية",
              outcome_en: "Solve mathematical problems in less than 90 seconds",
              practice: "20 مسألة رياضية (دقيقتين لكل مسألة)",
              practice_en: "20 math problems (2 minutes per problem)",
            }
          ]
        },
        {
          period: "afternoon",
          label: "🌤️ الضهر",
          tasks: [
            {
              id: "d2t3", time: "11:30 – 13:00", type: "linux",
              title: "لينكس — صلاحيات + مستخدمين + Processes",
              description: "chmod, chown, chgrp, rwx, octal (755, 644...). adduser, passwd, usermod. ps, top, kill, jobs",
              description_en: "chmod, chown, chgrp, rwx, octal (755, 644...). adduser, passwd, usermod. ps, top, kill, jobs",
              duration: 90, difficulty: "medium", resourceKey: "linux_adv",
              outcome: "إدارة مستخدمين وصلاحيات لينكس بثقة",
              outcome_en: "Manage Linux users and permissions with confidence",
              practice: "تمارين صلاحيات: ضبط permissions معينة",
              practice_en: "Permissions exercises: set specific access controls",
            },
            {
              id: "d2t4", time: "13:05 – 14:00", type: "ds",
              title: "Data Structures — Array, Linked List, Stack, Queue",
              description: "العمليات + Time Complexity لكل واحد. نفّذ Stack و Queue بـ C++ من غير مساعدة",
              description_en: "Operations + Time Complexity for each. Implement Stack and Queue in C++ from scratch without help.",
              duration: 55, difficulty: "medium", resourceKey: "ds",
              outcome: "كتابة DS أساسية من الصفر",
              outcome_en: "Write basic DS from scratch",
              practice: "تنفيذ Stack و Queue بـ C++",
              practice_en: "Implement Stack and Queue in C++",
            }
          ]
        },
        {
          period: "evening",
          label: "🌙 المسا",
          tasks: [
            {
              id: "d2t5", time: "14:30 – 15:30", type: "revision",
              title: "مراجعة + كويز",
              description: "احسب معنى chmod 755 في ذهنك. نفّذ Stack. حل passage جديد في 15 دقيقة.",
              description_en: "Calculate chmod 755 in your head. Implement a Stack. Solve a new reading passage in 15 minutes.",
              duration: 60, difficulty: "easy", resourceKey: "revision",
              outcome: "تحديد نقاط الضعف",
              outcome_en: "Identify areas of weakness",
              practice: "20 سؤال تراكمي 1-3",
              practice_en: "20 cumulative questions (Days 1-3)",
            }
          ]
        }
      ],
      checkpoint: "تحسب chmod 755؟ تنفذ Stack بـ C++؟ تحل 10 مسائل % في 15 دقيقة؟",
      checkpoint_en: "تحسب chmod 755؟ تنفذ Stack بـ C++؟ تحل 10 مسائل % في 15 دقيقة؟",
    },

    // ==================== DAY 3 ====================
    {
      id: 3,
      title: "اليوم التالت — مفردات + منطق IQ + شبكات + SQL",
      title_en: "Day 3 — Vocabulary + IQ Logic + Networking + SQL",
      theme: "التطبيق",
      theme_en: "Practice",
      quote: "الشبكات هي أساس كل حاجة هتشتغل عليها في DevOps",
      quote_en: "الشبكات هي أساس كل حاجة هتشتغل عليها في DevOps",
      gradient: ["#e94560","#c62828"],
      isSpecial: false,
      specialType: null,
      sessions: [
        {
          period: "morning",
          label: "☀️ الصبح",
          tasks: [
            {
              id: "d3t1", time: "8:00 – 9:30", type: "english",
              title: "مفردات إنجليزي (الجزء الثاني) + Sentence Completion",
              description: "40 كلمة جديدة. تقنية الإقصاء (POE). Sentence completion: توقع الإجابة قبل ما تشوف الخيارات",
              description_en: "40 new words. Process of Elimination (POE). Sentence completion: predict the answer before looking at options.",
              duration: 90, difficulty: "medium", resourceKey: "english",
              outcome: "إتقان اختيار المفردة من السياق",
              outcome_en: "Master selecting vocabulary from context",
              practice: "25 سؤال sentence completion",
              practice_en: "25 sentence completion questions",
            },
            {
              id: "d3t2", time: "9:35 – 11:00", type: "iq",
              title: "IQ منطق — Syllogisms + علاقات دم + اتجاهات",
              description: "ارسم Venn Diagram دايماً للسيلوجيزم. علاقات دم: ارسم شجرة. اتجاهات: ابدأ دايماً من الشمال",
              description_en: "Always draw a Venn Diagram for syllogisms. Blood relations: draw a family tree. Directions: always start facing North.",
              duration: 85, difficulty: "hard", resourceKey: "iq_logic",
              outcome: "حل منطق بشكل منهجي",
              outcome_en: "Solve logical puzzles systematically",
              practice: "15 syllogism + 10 blood relation",
              practice_en: "15 syllogism + 10 blood relation",
            }
          ]
        },
        {
          period: "afternoon",
          label: "🌤️ الضهر",
          tasks: [
            {
              id: "d3t3", time: "11:30 – 13:00", type: "networking",
              title: "شبكات — TCP vs UDP + DNS + Ports",
              description: "TCP 3-way handshake. DNS resolution خطوة بخطوة. حفظ الـ ports: 22-SSH, 80-HTTP, 443-HTTPS, 21-FTP, 53-DNS, 3306-MySQL",
              description_en: "TCP 3-way handshake. DNS resolution step-by-step. Memorize ports: 22-SSH, 80-HTTP, 443-HTTPS, 21-FTP, 53-DNS, 3306-MySQL.",
              duration: 90, difficulty: "medium", resourceKey: "networking_adv",
              outcome: "شرح TCP handshake خطوة بخطوة",
              outcome_en: "Explain TCP handshake step-by-step",
              practice: "ارسم DNS resolution من الذاكرة + حفظ 15 port",
              practice_en: "Draw DNS resolution from memory + memorize 15 ports",
            },
            {
              id: "d3t4", time: "13:05 – 14:00", type: "database",
              title: "قواعد بيانات — SQL أساسيات",
              description: "SELECT, INSERT, UPDATE, DELETE, WHERE. JOIN types (INNER, LEFT, RIGHT). Primary/Foreign Key. Normalization 1NF→3NF",
              description_en: "SELECT, INSERT, UPDATE, DELETE, WHERE. JOIN types (INNER, LEFT, RIGHT). Primary/Foreign Key. Normalization 1NF→3NF",
              duration: 55, difficulty: "medium", resourceKey: "database",
              outcome: "كتابة JOINs بدون مرجع",
              outcome_en: "Write SQL JOINs without reference",
              practice: "10 SQL queries بتعقيد متزايد",
              practice_en: "10 SQL queries of increasing complexity",
            }
          ]
        },
        {
          period: "evening",
          label: "🌙 المسا",
          tasks: [
            {
              id: "d3t5", time: "14:30 – 15:30", type: "revision",
              title: "مراجعة + كويز",
              description: "ارسم TCP handshake. اكتب query بـ JOIN من غير مساعدة. حل 5 سيلوجيزم.",
              description_en: "Draw TCP handshake. Write a SQL query with JOIN without assistance. Solve 5 syllogisms.",
              duration: 60, difficulty: "easy", resourceKey: "revision",
              outcome: "الثقة في SQL وShbakaat",
              outcome_en: "Gain confidence in SQL and Networking basics",
              practice: "20 سؤال تراكمي 1-4",
              practice_en: "20 cumulative questions (Days 1-4)",
            }
          ]
        }
      ],
      checkpoint: "تكتب SQL query بـ INNER JOIN؟ تشرح DNS resolution؟ تحل 5 syllogisms؟",
      checkpoint_en: "تكتب SQL query بـ INNER JOIN؟ تشرح DNS resolution؟ تحل 5 syllogisms؟",
    },

    // ==================== DAY 4 ====================
    {
      id: 4,
      title: "اليوم الرابع — قواعد متقدمة + Spatial IQ + OOP عميق + C++",
      title_en: "Day 4 — Advanced Grammar + Spatial IQ + OOP Deep Dive + C++",
      theme: "التعمق",
      theme_en: "Deep Dive",
      quote: "OOP هو لغة كل مقابلة تقنية — خليه طبيعي زي تنفسك",
      quote_en: "OOP هو لغة كل مقابلة تقنية — خليه طبيعي زي تنفسك",
      gradient: ["#b39ddb","#7b1fa2"],
      isSpecial: false,
      specialType: null,
      sessions: [
        {
          period: "morning",
          label: "☀️ الصبح",
          tasks: [
            {
              id: "d4t1", time: "8:00 – 9:30", type: "english",
              title: "قواعد إنجليزي II — Passive/Active + Conditionals",
              description: "تحويل Active↔Passive. Conditionals (0,1,2,3). Reported Speech. أفعال الجر (Prepositions).",
              description_en: "Active/Passive conversion. Conditionals (0, 1, 2, 3). Reported Speech. Prepositions.",
              duration: 90, difficulty: "hard", resourceKey: "grammar",
              outcome: "عدم الخلط في passive/active",
              outcome_en: "No confusion between passive and active voice",
              practice: "30 تمرين تحويل",
              practice_en: "30 conversion exercises",
            },
            {
              id: "d4t2", time: "9:35 – 11:00", type: "iq",
              title: "IQ مكاني — Spatial Reasoning + Matrices",
              description: "تدوير الأشكال 2D/3D. صور مرآة. طي الورق. Matrix patterns (شبكة 3×3). دور خطوة بخطوة",
              description_en: "2D/3D shape rotation. Mirror images. Paper folding. Matrix patterns (3x3 grid). Rotate step-by-step.",
              duration: 85, difficulty: "hard", resourceKey: "iq_spatial",
              outcome: "75%+ في spatial reasoning tests",
              outcome_en: "75%+ score in spatial reasoning tests",
              practice: "20 سؤال spatial + 10 matrix patterns",
              practice_en: "20 spatial questions + 10 matrix patterns",
            }
          ]
        },
        {
          period: "afternoon",
          label: "🌤️ الضهر",
          tasks: [
            {
              id: "d4t3", time: "11:30 – 13:00", type: "oop",
              title: "OOP متعمق — Virtual, Abstract, Static, Friend",
              description: "Virtual functions. Pure virtual = Abstract class. Operator overloading. Copy constructor. Static members. Friend function. نفّذ hierarchy: Shape→Circle/Rectangle",
              description_en: "Virtual functions. Pure virtual = Abstract class. Operator overloading. Copy constructor. Static members. Friend functions. Implement hierarchy: Shape to Circle/Rectangle.",
              duration: 90, difficulty: "hard", resourceKey: "oop_adv",
              outcome: "كتابة برنامج OOP كامل بثقة",
              outcome_en: "Write a complete OOP program with confidence",
              practice: "نفّذ Shape hierarchy كامل بـ C++",
              practice_en: "Implement complete Shape hierarchy in C++",
            },
            {
              id: "d4t4", time: "13:05 – 14:00", type: "cpp",
              title: "C++ — Pointers + STL + Exception Handling",
              description: "Pointers & References. new/delete. vector, map, set, string. try/catch/throw. حل 5 مسائل LeetCode Easy بـ C++",
              description_en: "Pointers & References. new/delete. Vector, map, set, string. Try/catch/throw. Solve 5 LeetCode Easy problems in C++.",
              duration: 55, difficulty: "hard", resourceKey: "cpp",
              outcome: "استخدام STL containers بثقة",
              outcome_en: "Use STL containers with confidence",
              practice: "حل 5 مسائل LeetCode Easy بـ C++",
              practice_en: "Solve 5 LeetCode Easy problems in C++",
            }
          ]
        },
        {
          period: "evening",
          label: "🌙 المسا",
          tasks: [
            {
              id: "d4t5", time: "14:30 – 15:30", type: "revision",
              title: "مراجعة + كويز",
              description: "اكتب virtual function من ذاكرتك. حوّل 10 جمل passive↔active. حل spatial test.",
              description_en: "Write virtual function from memory. Convert 10 sentences passive/active. Solve a spatial test.",
              duration: 60, difficulty: "easy", resourceKey: "revision",
              outcome: "أساس OOP + C++ متين",
              outcome_en: "Strong foundation in OOP and C++",
              practice: "20 سؤال تراكمي 1-5",
              practice_en: "20 cumulative questions (Days 1-5)",
            }
          ]
        }
      ],
      checkpoint: "تنفذ runtime polymorphism؟ تحوّل Active↔Passive؟ تعمل 70% في spatial test؟",
      checkpoint_en: "تنفذ runtime polymorphism؟ تحوّل Active↔Passive؟ تعمل 70% في spatial test؟",
    },

    // ==================== DAY 5 ====================
    {
      id: 5,
      title: "اليوم الخامس — امتحان تجريبي كامل",
      title_en: "Day 5 — Full Mock Exam",
      theme: "Mock Exam 🔴",
      theme_en: "Mock Exam 🔴",
      quote: "الاختبار التجريبي هيكشف الحقيقة — واجهها وصلحها",
      quote_en: "الاختبار التجريبي هيكشف الحقيقة — واجهها وصلحها",
      gradient: ["#1a1a2e","#e94560"],
      isSpecial: true,
      specialType: "mock",
      sessions: [
        {
          period: "morning",
          label: "🔴 الامتحانات التجريبية",
          tasks: [
            {
              id: "d5t1", time: "8:00 – 8:40", type: "mock",
              title: "Mock 1: إنجليزي — 30 سؤال / 40 دقيقة",
              description: "10 مفردات + 10 قواعد + 10 reading. ظروف الاختبار الحقيقي. موبايل بعيد.",
              description_en: "10 vocabulary + 10 grammar + 10 reading questions. Real exam conditions: phone away.",
              duration: 40, difficulty: "hard", resourceKey: "mock_exam",
              outcome: "تحديد نقاط الضعف في الإنجليزي",
              outcome_en: "Identify areas of weakness in English",
              practice: "Full exam simulation",
              practice_en: "Full exam simulation",
            },
            {
              id: "d5t2", time: "8:50 – 9:25", type: "mock",
              title: "Mock 2: IQ — 30 سؤال / 30 دقيقة",
              description: "10 تسلسلات + 10 منطق + 10 مكاني. سجّل الوقت على كل سؤال.",
              description_en: "10 sequences + 10 logic + 10 spatial questions. Track time per question.",
              duration: 35, difficulty: "hard", resourceKey: "mock_exam",
              outcome: "تحديد نقاط الضعف في IQ",
              outcome_en: "Identify areas of weakness in IQ",
              practice: "Full IQ simulation",
              practice_en: "Full IQ simulation",
            },
            {
              id: "d5t3", time: "9:50 – 11:00", type: "mock",
              title: "Mock 3: تقني — 40 سؤال / 50 دقيقة",
              description: "10 لينكس + 10 شبكات + 10 OOP/C++ + 10 OS/DS/DB. 1.25 دقيقة للسؤال.",
              description_en: "10 Linux + 10 Networking + 10 OOP/C++ + 10 OS/DS/DB. 1.25 minutes per question.",
              duration: 50, difficulty: "hard", resourceKey: "mock_exam",
              outcome: "baseline score تقني",
              outcome_en: "Obtain a technical baseline score",
              practice: "Full technical simulation",
              practice_en: "Full technical simulation",
            }
          ]
        },
        {
          period: "afternoon",
          label: "🌤️ التحليل والمعالجة",
          tasks: [
            {
              id: "d5t4", time: "11:30 – 13:00", type: "revision",
              title: "🩺 جراحة نقاط الضعف",
              description: "راجع كل إجابة غلط. فهم ليه غلط مش بس الصح. اقرأ الـ concept تاني. سجّل top 10 نقاط ضعف.",
              description_en: "Review every wrong answer. Understand why it was wrong, not just the correct option. Read the concept again. List top 10 weak areas.",
              duration: 90, difficulty: "hard", resourceKey: "revision",
              outcome: "تحويل الأخطاء لمواضيع محفوظة",
              outcome_en: "Turn errors into mastered topics",
              practice: "إعادة كل سؤال غلط بشكل صحيح",
              practice_en: "Re-solve every incorrect question correctly",
            },
            {
              id: "d5t5", time: "13:30 – 14:00", type: "revision",
              title: "📊 تخطيط الأيام 7-10",
              description: "عدّل الخطة بناءً على نتايج الموك. اكتب قائمة بأضعف 10 مواضيع شخصياً.",
              description_en: "Adjust plan based on mock results. Write a list of your top 10 weak topics.",
              duration: 30, difficulty: "easy", resourceKey: "revision",
              outcome: "خطة شخصية محدثة",
              outcome_en: "Updated personalized study plan",
              practice: "Analysis document",
              practice_en: "Analysis document",
            }
          ]
        }
      ],
      checkpoint: "نتايج الموك اتسجلت. أضعف 10 مواضيع اتحددت. الخطة اتعدلت.",
      checkpoint_en: "نتايج الموك اتسجلت. أضعف 10 مواضيع اتحددت. الخطة اتعدلت.",
    },

    // ==================== DAY 6 (MOCK) ====================
    {
      id: 6,
      title: "اليوم السادس — SysAdmin + DevOps + تحضير المقابلة",
      title_en: "Day 6 — SysAdmin + DevOps + Interview Prep",
      theme: "System + Interview",
      theme_en: "System + Interview",
      quote: "DevOps هو ميزتك التنافسية — استخدمها",
      quote_en: "DevOps هو ميزتك التنافسية — استخدمها",
      gradient: ["#f5a623","#e94560"],
      isSpecial: false,
      specialType: null,
      sessions: [
        {
          period: "morning",
          label: "☀️ الصبح",
          tasks: [
            {
              id: "d6t1", time: "8:00 – 9:30", type: "linux",
              title: "System Administration — Services + Cron + Logs",
              description: "systemctl start/stop/enable/disable. Cron syntax (*/5 * * * *). /var/log/. Package management: apt/yum. df, du, fdisk, mount",
              description_en: "systemctl start/stop/enable/disable. Cron syntax (*/5 * * * *). /var/log/. Package management: apt/yum. df, du, fdisk, mount",
              duration: 90, difficulty: "medium", resourceKey: "sysadmin",
              outcome: "إدارة Linux server أساسية",
              outcome_en: "Basic Linux server administration",
              practice: "ضبط cron job + فحص service status",
              practice_en: "Set up a cron job + check service status",
            },
            {
              id: "d6t2", time: "9:35 – 11:00", type: "devops",
              title: "DevOps أساسيات — Git + CI/CD + Docker",
              description: "Git: clone, add, commit, push, pull, branch, merge, rebase. CI/CD pipeline concept. Container vs VM. Dockerfile basics.",
              description_en: "Git: clone, add, commit, push, pull, branch, merge, rebase. CI/CD pipeline concept. Container vs VM. Dockerfile basics.",
              duration: 85, difficulty: "medium", resourceKey: "devops",
              outcome: "شرح DevOps pipeline لشخص عادي",
              outcome_en: "Explain a DevOps pipeline to a non-technical person",
              practice: "إنشاء Git repo + عمل 5 commits مع branches",
              practice_en: "Create a Git repo + make 5 commits with branching",
            }
          ]
        },
        {
          period: "afternoon",
          label: "🌤️ الضهر",
          tasks: [
            {
              id: "d6t3", time: "11:30 – 13:00", type: "hr",
              title: "تحضير المقابلة الشخصية — STAR Method",
              description: "STAR = Situation, Task, Action, Result. أسئلة شائعة: 'عرفني بنفسك'، 'ليه ITI؟'، 'إيه نقاط قوتك وضعفك؟'. اكتب وادرب إجاباتك",
              description_en: "STAR = Situation, Task, Action, Result. Common Qs: 'Tell me about yourself', 'Why ITI?', 'What are your strengths/weaknesses?'. Write and practice your answers.",
              duration: 90, difficulty: "medium", resourceKey: "hr_interview",
              outcome: "5 إجابات HR محضّرة ومدرّبة",
              outcome_en: "5 fully prepared and practiced HR answers",
              practice: "سجّل نفسك وأنت بتجاوب",
              practice_en: "Record yourself answering",
            },
            {
              id: "d6t4", time: "13:05 – 14:00", type: "tech_interview",
              title: "تحضير المقابلة التقنية I — Problem Solving",
              description: "فكّر بصوت عالي. وضّح أولاً، Brute Force أولاً، بعدين optimize. Two pointers, Hash maps. حل 3 مسائل Easy.",
              description_en: "Think out loud. Clarify first, brute force first, then optimize. Two pointers, Hash maps. Solve 3 Easy problems.",
              duration: 55, difficulty: "medium", resourceKey: "tech_interview",
              outcome: "أسلوب منهجي لحل المشاكل",
              outcome_en: "Methodical approach to problem solving",
              practice: "حل 3 مسائل مع think-aloud technique",
              practice_en: "Solve 3 problems using the think-aloud technique",
            }
          ]
        },
        {
          period: "evening",
          label: "🌙 المسا",
          tasks: [
            {
              id: "d6t5", time: "14:30 – 15:30", type: "revision",
              title: "مراجعة — Git workflow + Crontab + إجابة 'عرفني بنفسك'",
              description: "سجّل نفسك وأنت بتجاوب. لازم تجاوب في أقل من 90 ثانية بشكل طبيعي.",
              description_en: "Record yourself answering. You must answer in less than 90 seconds naturally.",
              duration: 60, difficulty: "easy", resourceKey: "revision",
              outcome: "إجابة طبيعية وواثقة",
              outcome_en: "Natural and confident response",
              practice: "تسجيل صوتي للإجابات",
              practice_en: "Audio recording of your answers",
            }
          ]
        }
      ],
      checkpoint: "تشرح CI/CD ببساطة؟ تكتب crontab لـ backup يومي الساعة 2؟ تجاوب 'عرفني بنفسك' في 90 ثانية؟",
      checkpoint_en: "تشرح CI/CD ببساطة؟ تكتب crontab لـ backup يومي الساعة 2؟ تجاوب 'عرفني بنفسك' في 90 ثانية؟",
    },

    // ==================== DAY 7 ====================
    {
      id: 7,
      title: "اليوم السابع — استراتيجيات الامتحان + Networking متقدم + مقابلة تجريبية",
      title_en: "Day 7 — Exam Strategies + Advanced Networking + Mock Interview",
      theme: "Simulation",
      theme_en: "Simulation",
      quote: "المحاكاة هتخلي الاختبار الحقيقي يحس إنه مألوف",
      quote_en: "المحاكاة هتخلي الاختبار الحقيقي يحس إنه مألوف",
      gradient: ["#4fc3f7","#00d4aa"],
      isSpecial: false,
      specialType: null,
      sessions: [
        {
          period: "morning",
          label: "☀️ الصبح",
          tasks: [
            {
              id: "d7t1", time: "8:00 – 9:30", type: "english",
              title: "إنجليزي — استراتيجيات الاختبار",
              description: "POE: اقصي الغلط قبل ما تختار الصح. مفردات من نصوص تقنية. إدارة الوقت: 1.5 دقيقة للسؤال.",
              description_en: "POE: eliminate wrong answers before choosing the correct one. Vocabulary from technical texts. Time management: 1.5 minutes per question.",
              duration: 90, difficulty: "medium", resourceKey: "english",
              outcome: "إنهاء English section مع 10 دقايق فاضلة",
              outcome_en: "Finish English section with 10 minutes remaining",
              practice: "محاكاة reading comprehension 30 دقيقة",
              practice_en: "Simulate reading comprehension test (30 minutes)",
            },
            {
              id: "d7t2", time: "9:35 – 11:00", type: "iq",
              title: "IQ مكثف — كل الأنواع مختلطة",
              description: "40 سؤال في 40 دقيقة. ركز على نقاط ضعفك من يوم 1. الهدف: 75%+ تحت ضغط الوقت.",
              description_en: "40 questions in 40 minutes. Focus on your weaknesses from Day 1. Goal: 75%+ under time pressure.",
              duration: 85, difficulty: "hard", resourceKey: "iq",
              outcome: "75%+ باستمرار تحت ضغط الوقت",
              outcome_en: "Maintain 75%+ accuracy under time pressure",
              practice: "40 سؤال مختلط في 40 دقيقة",
              practice_en: "40 mixed questions in 40 minutes",
            }
          ]
        },
        {
          period: "afternoon",
          label: "🌤️ الضهر",
          tasks: [
            {
              id: "d7t3", time: "11:30 – 13:00", type: "networking",
              title: "شبكات III — Subnetting + Security + SSH",
              description: "CIDR notation. قسّم 192.168.1.0/24 لـ 4 subnets. SSH key-based auth. iptables concept. Network troubleshooting steps.",
              description_en: "CIDR notation. Divide 192.168.1.0/24 into 4 subnets. SSH key-based auth. iptables concept. Network troubleshooting steps.",
              duration: 90, difficulty: "hard", resourceKey: "networking_adv",
              outcome: "Subnetting أي IP address بثقة",
              outcome_en: "Subnet any IP address with confidence",
              practice: "تقسيم 192.168.1.0/24 + ضبط SSH key",
              practice_en: "Divide 192.168.1.0/24 + set up SSH key",
            },
            {
              id: "d7t4", time: "13:05 – 14:30", type: "mock",
              title: "🎯 مقابلة تقنية تجريبية — 45 دقيقة",
              description: "أسئلة OOP + DS + لينكس + شبكات. جاوب بصوت عالي زي ما بتتكلم مع حد حقيقي. سجّل نفسك.",
              description_en: "OOP + DS + Linux + Networking questions. Answer out loud as if talking to a real person. Record yourself.",
              duration: 45, difficulty: "hard", resourceKey: "tech_interview",
              outcome: "تجربة ضغط مقابلة حقيقية",
              outcome_en: "Experience the pressure of a real interview",
              practice: "Mock technical interview",
              practice_en: "Mock technical interview",
            }
          ]
        },
        {
          period: "evening",
          label: "🌙 المسا",
          tasks: [
            {
              id: "d7t5", time: "14:30 – 15:30", type: "revision",
              title: "تحليل المقابلة التجريبية",
              description: "إيه اللي وقفت فيه؟ إيه اللي اتجاوبت فيه كويس؟ اكتب 3 نقاط تحسين محددة.",
              description_en: "Where did you struggle? What did you answer well? Write 3 specific areas of improvement.",
              duration: 60, difficulty: "easy", resourceKey: "revision",
              outcome: "تحسينات محددة محددة",
              outcome_en: "Specific improvement points documented",
              practice: "Analysis + action items",
              practice_en: "Analysis + action items",
            }
          ]
        }
      ],
      checkpoint: "تقسّم شبكة /26؟ تشرح virtual functions vs pure virtual؟ تعدي مقابلة تقنية تجريبية؟",
      checkpoint_en: "تقسّم شبكة /26؟ تشرح virtual functions vs pure virtual؟ تعدي مقابلة تقنية تجريبية؟",
    },

    // ==================== DAY 8 ====================
    {
      id: 8,
      title: "اليوم الثامن — OS عميق + Problem Solving + معالجة نقاط الضعف",
      title_en: "Day 8 — OS Deep Dive + Problem Solving + Weakness Practice",
      theme: "تعزيز",
      theme_en: "Reinforcement",
      quote: "نقاط ضعفك بعد النهارده هتبقى قصة نجاح",
      quote_en: "نقاط ضعفك بعد النهارده هتبقى قصة نجاح",
      gradient: ["#b39ddb","#4fc3f7"],
      isSpecial: false,
      specialType: null,
      sessions: [
        {
          period: "morning",
          label: "☀️ الصبح",
          tasks: [
            {
              id: "d8t1", time: "8:00 – 9:30", type: "os",
              title: "OS — Deadlock + Virtual Memory + Paging",
              description: "Deadlock conditions: HMCN (Hold, Mutual exclusion, Circular wait, No preemption). Banker's Algorithm concept. Virtual memory. Paging vs Segmentation. Thrashing.",
              description_en: "Deadlock conditions: HMCN (Hold, Mutual exclusion, Circular wait, No preemption). Banker's Algorithm concept. Virtual memory. Paging vs Segmentation. Thrashing.",
              duration: 90, difficulty: "hard", resourceKey: "os_adv",
              outcome: "شرح Deadlock وحلوله بوضوح",
              outcome_en: "Explain deadlocks and their solutions clearly",
              practice: "حل 5 سيناريو Deadlock MCQs + رسم Paging diagram",
              practice_en: "Solve 5 deadlock scenarios MCQs + draw Paging diagram",
            },
            {
              id: "d8t2", time: "9:35 – 11:00", type: "ds",
              title: "Problem Solving — Recursion + Binary Search + Sorting",
              description: "Recursion: base case + recursive case. Binary Search. Sorting: Bubble, Insertion, Merge, Quick — احفظ الـ complexity. نفّذ Merge Sort بـ C++.",
              description_en: "Recursion: base case + recursive case. Binary Search. Sorting: Bubble, Insertion, Merge, Quick - memorize complexity. Implement Merge Sort in C++.",
              duration: 85, difficulty: "hard", resourceKey: "algorithms",
              outcome: "إتقان complexity الـ sorting algorithms",
              outcome_en: "Master complexity of sorting algorithms",
              practice: "نفّذ Merge Sort + حل مسألتين binary search",
              practice_en: "Implement Merge Sort + solve two binary search problems",
            }
          ]
        },
        {
          period: "afternoon",
          label: "🌤️ الضهر",
          tasks: [
            {
              id: "d8t3", time: "11:30 – 13:00", type: "revision",
              title: "🩺 مراجعة عميقة لأضعف 3 مواضيع",
              description: "من قائمة يوم 1. ركز 90 دقيقة عليهم بس. أسئلة تطبيقية مكثفة على نقاط ضعفك.",
              description_en: "From the Day 1 list. Focus 90 minutes solely on them. Intensive practical questions on your weaknesses.",
              duration: 90, difficulty: "hard", resourceKey: "revision",
              outcome: "تقليل الضعف بشكل كبير",
              outcome_en: "Significantly reduce weaknesses in target areas",
              practice: "أسئلة مكثفة على نقاط الضعف",
              practice_en: "Intensive practice questions on weak areas",
            },
            {
              id: "d8t4", time: "13:05 – 14:00", type: "hr",
              title: "تحضير HR II — Behavioral Questions",
              description: "حل نزاع مع زميل؟ فشل وتعلمت منه؟ ليه Computer Engineering؟ ليه System Administration؟ سؤال تسأله أنت للمحاور.",
              description_en: "Resolve conflict with a colleague? A failure and what you learned from it? Why Computer Engineering? Why System Administration? Questions to ask the interviewer.",
              duration: 55, difficulty: "medium", resourceKey: "hr_interview",
              outcome: "مكتبة إجابات HR كاملة جاهزة",
              outcome_en: "A complete HR answers library ready",
              practice: "كتابة + تدريب 5 إجابات behavioral",
              practice_en: "Write and practice 5 behavioral answers",
            }
          ]
        },
        {
          period: "evening",
          label: "🌙 المسا",
          tasks: [
            {
              id: "d8t5", time: "14:30 – 15:30", type: "revision",
              title: "مراجعة + كويز",
              description: "جدول Big-O من الذاكرة. رسم OS diagrams. إجابة STAR لسؤال 'حكيلي عن فشل'.",
              description_en: "Big-O table from memory. Draw OS diagrams. STAR answer for 'Tell me about a failure'.",
              duration: 60, difficulty: "easy", resourceKey: "revision",
              outcome: "احتفاظ قوي بكل المواضيع",
              outcome_en: "Strong retention of all topics",
              practice: "20 سؤال تراكمي",
              practice_en: "20 cumulative questions",
            }
          ]
        }
      ],
      checkpoint: "تشرح Banker's Algorithm؟ تنفذ Binary Search؟ تجاوب STAR لسؤال 'حكيلي عن فشل'؟",
      checkpoint_en: "تشرح Banker's Algorithm؟ تنفذ Binary Search؟ تجاوب STAR لسؤال 'حكيلي عن فشل'؟",
    },

    // ==================== DAY 9 ====================
    {
      id: 9,
      title: "اليوم التاسع — ربط المعرفة + مقابلة تقنية كاملة",
      title_en: "Day 9 — Knowledge Integration + Full Technical Interview",
      theme: "تكامل",
      theme_en: "Integration",
      quote: "الدماغ المتربط بيكسب على الدماغ المجزأ دايماً",
      quote_en: "الدماغ المتربط بيكسب على الدماغ المجزأ دايماً",
      gradient: ["#00d4aa","#4fc3f7"],
      isSpecial: false,
      specialType: null,
      sessions: [
        {
          period: "morning",
          label: "☀️ الصبح",
          tasks: [
            {
              id: "d9t1", time: "8:00 – 9:30", type: "english",
              title: "إنجليزي — Sprint أخير (كل الـ 80+ كلمة)",
              description: "مراجعة سريعة لكل المفردات المتعلمة. Synonyms/Antonyms race. اختبار 40 سؤال في 20 دقيقة.",
              description_en: "Quick review of all learned vocabulary. Synonyms/Antonyms race. 40-question test in 20 minutes.",
              duration: 90, difficulty: "medium", resourceKey: "english",
              outcome: "85%+ في اختبار المفردات",
              outcome_en: "85%+ score in vocabulary test",
              practice: "40 سؤال في 20 دقيقة",
              practice_en: "40 questions in 20 minutes",
            },
            {
              id: "d9t2", time: "9:35 – 11:00", type: "iq",
              title: "IQ — Sprint أخير + مراجعة الأخطاء",
              description: "30 سؤال في 25 دقيقة. أعد كل سؤال غلطته قبل كده. حدد آخر نوع ضعيف وادرب عليه مكثف.",
              description_en: "30 questions in 25 minutes. Redo every question you got wrong before. Identify your last weakness and practice intensively.",
              duration: 85, difficulty: "hard", resourceKey: "iq",
              outcome: "دقة مستمرة تحت ضغط السرعة",
              outcome_en: "Maintain high accuracy under speed pressure",
              practice: "30 سؤال في 25 دقيقة",
              practice_en: "30 questions in 25 minutes",
            }
          ]
        },
        {
          period: "afternoon",
          label: "🌤️ الضهر",
          tasks: [
            {
              id: "d9t3", time: "11:30 – 13:00", type: "revision",
              title: "مراجعة تكاملية — الصورة الكبيرة",
              description: "ازاي لينكس + شبكات + OS + DevOps بيتربطوا. ارسم architecture لـ Linux server خلف شبكة. شوف الـ stack كله كنظام واحد.",
              description_en: "How Linux + Networking + OS + DevOps connect. Draw architecture for a Linux server behind network. View the entire stack as a system.",
              duration: 90, difficulty: "medium", resourceKey: "revision",
              outcome: "رؤية التكنولوجيا كنظام وليس مواضيع منفصلة",
              outcome_en: "View technology as an integrated system, not isolated topics",
              practice: "رسم full-stack architecture من الذاكرة",
              practice_en: "Draw full-stack architecture from memory",
            },
            {
              id: "d9t4", time: "13:05 – 14:30", type: "mock",
              title: "🎯 مقابلة تقنية كاملة — 60 دقيقة",
              description: "كل المواضيع التقنية. جاوب بصوت عالي، Whiteboard style. سجّل نفسك واتفرج على التسجيل.",
              description_en: "All technical topics. Answer out loud, whiteboard style. Record yourself and watch the recording.",
              duration: 60, difficulty: "hard", resourceKey: "tech_interview",
              outcome: "عقلية مقابلة تقنية جاهزة بالكامل",
              outcome_en: "Technical interview mindset fully ready",
              practice: "Complete mock technical interview",
              practice_en: "Complete mock technical interview",
            }
          ]
        }
      ],
      checkpoint: "تعدي مقابلة تقنية 60 دقيقة؟ ترسم system architecture؟ 80%+ في اختبار المفردات؟",
      checkpoint_en: "تعدي مقابلة تقنية 60 دقيقة؟ ترسم system architecture؟ 80%+ في اختبار المفردات؟",
    },

    // ==================== DAY 10 (FINAL MOCK) ====================
    {
      id: 10,
      title: "اليوم العاشر — امتحان تجريبي نهائي (Full Simulation)",
      title_en: "Day 10 — Final Mock Exam (Full Simulation)",
      theme: "Final Mock 🔴",
      theme_en: "Final Mock 🔴",
      quote: "البروفة دي أهم من أي مذاكرة — اتجدد كل حاجة",
      quote_en: "البروفة دي أهم من أي مذاكرة — اتجدد كل حاجة",
      gradient: ["#e94560","#f5a623"],
      isSpecial: true,
      specialType: "final_mock",
      sessions: [
        {
          period: "morning",
          label: "🔴 الفاينال موك",
          tasks: [
            {
              id: "d10t1", time: "8:00 – 8:40", type: "mock",
              title: "إنجليزي نهائي — 40 سؤال / 40 دقيقة",
              description: "ظروف الاختبار الحقيقي. موبايل بعيد. كوباية مية جنبك. جرّب تخلص قبل الوقت بـ 5 دقايق.",
              description_en: "Real exam conditions. Phone away. Glass of water next to you. Try to finish 5 minutes early.",
              duration: 40, difficulty: "hard", resourceKey: "mock_exam",
              outcome: "نتيجة English نهائية",
              outcome_en: "Obtain a final English score",
              practice: "Full English exam simulation",
              practice_en: "Full English exam simulation",
            },
            {
              id: "d10t2", time: "8:50 – 9:25", type: "mock",
              title: "IQ نهائي — 40 سؤال / 35 دقيقة",
              description: "كل الأنواع مختلطة. متقفش كتير على سؤال واحد — شيله واجي عليه.",
              description_en: "All types mixed. Do not get stuck on one question - skip and return to it later.",
              duration: 35, difficulty: "hard", resourceKey: "mock_exam",
              outcome: "نتيجة IQ نهائية",
              outcome_en: "Obtain a final IQ score",
              practice: "Full IQ exam simulation",
              practice_en: "Full IQ exam simulation",
            },
            {
              id: "d10t3", time: "9:50 – 11:00", type: "mock",
              title: "تقني نهائي — 50 سؤال / 60 دقيقة",
              description: "كل المواضيع. 1.2 دقيقة للسؤال. لو مش عارف — اقصي الغلط وخمّن من المتبقي.",
              description_en: "All topics. 1.2 minutes per question. If unsure, eliminate wrong choices and guess.",
              duration: 60, difficulty: "hard", resourceKey: "mock_exam",
              outcome: "نتيجة Technical نهائية",
              outcome_en: "Obtain a final technical score",
              practice: "Full technical exam simulation",
              practice_en: "Full technical exam simulation",
            },
            {
              id: "d10t4", time: "11:30 – 13:00", type: "mock",
              title: "مقابلة HR + تقنية كاملة — 60 دقيقة",
              description: "HR أولاً (15 دقيقة) ثم تقني (45 دقيقة). سجّل التسجيل ده وبعدين اتفرج وحدد نقاط التحسين.",
              description_en: "HR first (15 minutes), then technical (45 minutes). Record this session, then watch it to identify improvement areas.",
              duration: 60, difficulty: "hard", resourceKey: "hr_interview",
              outcome: "نتيجة Interview confidence نهائية",
              outcome_en: "Obtain final interview confidence score",
              practice: "Full interview simulation",
              practice_en: "Full interview simulation",
            }
          ]
        },
        {
          period: "afternoon",
          label: "🌤️ التحليل النهائي",
          tasks: [
            {
              id: "d10t5", time: "13:30 – 14:30", type: "revision",
              title: "📊 تحليل نهائي + قائمة يوم 1",
              description: "سجّل النتايج. اعمل قائمة بأضعف 5 نقاط. دي هتبقى agenda يوم 1 بالظبط.",
              description_en: "Record results. List your top 5 weak areas. This will be your exact agenda for Day 1.",
              duration: 60, difficulty: "easy", resourceKey: "revision",
              outcome: "خطة يوم 1 جاهزة بالتفصيل",
              outcome_en: "Detailed agenda for Day 1 ready",
              practice: "Final analysis document",
              practice_en: "Final analysis document",
            }
          ]
        }
      ],
      checkpoint: "النتايج اتسجلت؟ أضعف 5 نقاط اتحددت؟ قائمة يوم 1 جاهزة؟ نام بدري الليلة.",
      checkpoint_en: "النتايج اتسجلت؟ أضعف 5 نقاط اتحددت؟ قائمة يوم 1 جاهزة؟ نام بدري الليلة.",
    },

    // ==================== DAY 11 ====================
    {
      id: 11,
      title: "اليوم الحادي عشر — مراجعة أخيرة + استعداد نفسي",
      title_en: "Day 11 — Final Review + Mental Prep",
      theme: "Game Day Ready 🟢",
      theme_en: "Game Day Ready 🟢",
      quote: "وثق في نفسك — عملت الشغلانة. دلوقتي ثبّتها بس",
      quote_en: "وثق في نفسك — عملت الشغلانة. دلوقتي ثبّتها بس",
      gradient: ["#1a1a2e","#00d4aa"],
      isSpecial: true,
      specialType: "final_day",
      sessions: [
        {
          period: "morning",
          label: "🟢 اليوم الأخير",
          tasks: [
            {
              id: "d11t1", time: "8:00 – 8:45", type: "revision",
              title: "أضعف 3 نقاط فقط من قائمة يوم 1",
              description: "مش موضوع جديد خالص. بس ثبّت الضعاف. 15 دقيقة لكل موضوع بس.",
              description_en: "No new topics. Just consolidate weak areas. 15 minutes per topic only.",
              duration: 45, difficulty: "medium", resourceKey: "revision",
              outcome: "تقليل أخير لنقاط الضعف",
              outcome_en: "Final minimization of weak areas",
              practice: "Quick drills فقط",
              practice_en: "Quick drills only",
            },
            {
              id: "d11t2", time: "8:50 – 9:20", type: "revision",
              title: "مراجعة Cheat Sheets",
              description: "Linux commands, SQL queries, OSI layers, Ports, OOP pillars, Big-O table. اقرأهم زي بتقرأ قصة مش بتحفظ.",
              description_en: "Linux commands, SQL queries, OSI layers, Ports, OOP pillars, Big-O table. Read them like a story, do not memorize.",
              duration: 30, difficulty: "easy", resourceKey: "revision",
              outcome: "تثبيت كل المراجع",
              outcome_en: "Consolidate all references",
              practice: "Speed read cheat sheets",
              practice_en: "Speed read cheat sheets",
            },
            {
              id: "d11t3", time: "9:25 – 9:45", type: "english",
              title: "إنجليزي — 20 مفردة أخيرة + 5 قواعد",
              description: "Flashcard sprint. الكلمات الأصعب بس مش كل حاجة.",
              description_en: "Flashcard sprint. Hardest words only, not everything.",
              duration: 20, difficulty: "easy", resourceKey: "english",
              outcome: "تثبيت أصعب المفردات",
              outcome_en: "Consolidate hardest vocabulary words",
              practice: "Flashcard sprint",
              practice_en: "Flashcard sprint",
            },
            {
              id: "d11t4", time: "9:50 – 10:10", type: "iq",
              title: "IQ — 20 سؤال دافئ (Easy-Medium)",
              description: "مش للضغط — للتحفيز. الهدف تدفئة الدماغ مش إثباته.",
              description_en: "Not for pressure - for stimulation. Goal is to warm up the brain.",
              duration: 20, difficulty: "easy", resourceKey: "iq",
              outcome: "دماغ دافي ومستعد",
              outcome_en: "Warm and ready brain",
              practice: "Easy-medium warmup",
              practice_en: "Easy-medium warmup",
            },
            {
              id: "d11t5", time: "10:15 – 11:00", type: "hr",
              title: "بروفة المقابلة الأخيرة",
              description: "'عرفني بنفسك' + 3 قصص STAR + 'ليه ITI؟'. بصوت عالي. بثقة. 90 ثانية لـ 'عرفني بنفسك'.",
              description_en: "'عرفني بنفسك' + 3 قصص STAR + 'ليه ITI؟'. بصوت عالي. بثقة. 90 ثانية لـ 'عرفني بنفسك'.",
              duration: 45, difficulty: "easy", resourceKey: "hr_interview",
              outcome: "إجابات طبيعية وواثقة",
              outcome_en: "إجابات طبيعية وواثقة",
              practice: "Final rehearsal",
              practice_en: "Final rehearsal",
            },
            {
              id: "d11t6", time: "11:00 – ∞", type: "revision",
              title: "🛑 وقف المذاكرة — استعداد عملي",
              description: "جهّز أوراقك + ID + قلم + مية. اقرأ 'notes النجاح' بتاعتك (المواضيع اللي بتعرفها كويس). نام الساعة 10 مساء.",
              description_en: "جهّز أوراقك + ID + قلم + مية. اقرأ 'notes النجاح' بتاعتك (المواضيع اللي بتعرفها كويس). نام الساعة 10 مساء.",
              duration: 0, difficulty: "easy", resourceKey: "revision",
              outcome: "استعداد نفسي وعملي كامل",
              outcome_en: "Complete mental and practical readiness",
              practice: "Rest + preparation",
              practice_en: "Rest + preparation",
            }
          ]
        }
      ],
      checkpoint: "مستعد 100%! عملت كل الشغلانة. وثق في نفسك. نام بدري. بكرة هيبقى يوم عظيم.",
      checkpoint_en: "مستعد 100%! عملت كل الشغلانة. وثق في نفسك. نام بدري. بكرة هيبقى يوم عظيم.",
    }
  ],

  // ==================== QUESTION BANKS ====================
  questionBanks: {
    iq: [
      { type: "تسلسلات أرقام", frequency: 5, technique: "ابحث عن الفرق، لو مش واضح جرب الضرب أو القسمة" },
      { type: "Matrices (شبكات أنماط)", frequency: 5, technique: "حلّل صف صف، عمود عمود، قطري" },
      { type: "Analogies (تشابه)", frequency: 4, technique: "حدد نوع العلاقة (جزء:كل، سبب:نتيجة)" },
      { type: "Odd-One-Out (الشاذ)", frequency: 4, technique: "الشاذ مش بيشارك خاصيتين مع الباقي" },
      { type: "رياضيات (نسب ومتوسطات)", frequency: 4, technique: "الوقت: 90 ثانية للسؤال — لو بطّلت، إقصاء واكمل" },
      { type: "تسلسلات حروف", frequency: 4, technique: "حوّل الحروف لأرقام (A=1, Z=26)" },
      { type: "Syllogisms (منطق)", frequency: 3, technique: "ارسم Venn Diagram دايماً" },
      { type: "علاقات دم", frequency: 3, technique: "ارسم شجرة عيلة على ورقة" },
      { type: "اتجاهات", frequency: 3, technique: "ابدأ دايماً من الشمال" },
      { type: "Spatial Rotation", frequency: 3, technique: "دوّر خطوة بخطوة، مش كل حاجة دفعة" }
    ],
    english: [
      { type: "مفردات (مرادف/مضاد)", frequency: 5, technique: "استخدم السياق + اقصي الغلط أولاً" },
      { type: "إكمال الجملة", frequency: 5, technique: "توقع الإجابة قبل ما تشوف الخيارات" },
      { type: "فهم المقروء", frequency: 4, technique: "اقرأ الأسئلة أولاً ← ابحث عن الإجابة في الباسج" },
      { type: "تصحيح الأزمنة", frequency: 4, technique: "حدد Time Marker في الجملة أولاً" },
      { type: "Cloze Test (ملء فراغات)", frequency: 3, technique: "اقرأ الباسج كله الأول، بعدين ملّي" },
      { type: "Active/Passive", frequency: 3, technique: "المفعول → فاعل + غيّر شكل الفعل" },
      { type: "اكتشاف الخطأ", frequency: 3, technique: "تحقق: S-V agreement، articles، prepositions" }
    ]
  },

  // ==================== TECHNICAL QUESTIONS ====================
  technicalQuestions: {
    linux: [
      "الفرق بين Hard Link وSoft Link؟",
      "شرح Linux boot process (BIOS→GRUB→Kernel→Init)",
      "معنى chmod 755 بالظبط؟",
      "الفرق بين > و >> ؟",
      "إزاي تلاقي فايل فيه string معين؟ (grep -r)",
      "إيه هو daemon process؟",
      "شرح stdin, stdout, stderr والـ file descriptors (0,1,2)",
      "إيه محتوى ملف /etc/passwd؟",
      "إزاي تقتل process بالاسم؟",
      "إزاي تشوف الـ services الشغالة؟"
    ],
    networking: [
      "شرح TCP 3-way handshake (SYN→SYN-ACK→ACK)",
      "الفرق بين TCP و UDP؟ امتى تستخدم كل واحد؟",
      "إيه اللي بيحصل لما تكتب URL في المتصفح؟",
      "الفرق بين Hub, Switch, Router؟",
      "إيه هو NAT وليه بنستخدمه؟",
      "شرح CIDR notation وازاي تعمل subnetting؟",
      "Ports: HTTP(80), HTTPS(443), SSH(22), FTP(21), SMTP(25), DNS(53), MySQL(3306)",
      "الفرق بين IPv4 و IPv6؟",
      "إيه هو ARP؟",
      "إيه هو VLAN ولماذا نستخدمه؟"
    ],
    os: [
      "الفرق بين Process و Thread؟",
      "إيه هو Context Switching؟",
      "شروط الـ Deadlock الأربعة (HMCN)؟",
      "شرح Round Robin Scheduling بمثال",
      "إيه هي Virtual Memory وازاي بتشتغل؟",
      "الفرق بين Paging و Segmentation؟",
      "الفرق بين Semaphore و Mutex؟",
      "الفرق بين Kernel Mode و User Mode؟",
      "إيه هو Thrashing؟",
      "إيه هو System Call؟"
    ],
    oop: [
      "الفرق بين Overloading و Overriding؟",
      "شرح Virtual Functions. امتى تستخدمها؟",
      "إيه هي Pure Virtual Function والـ Abstract Class؟",
      "الفرق بين struct و class في C++؟",
      "إيه هو Copy Constructor وامتى بنحتاجه؟",
      "الفرق بين Shallow Copy و Deep Copy؟",
      "إيه هي Static Members؟",
      "إيه هي Friend Function؟",
      "إيه هو Operator Overloading؟ اعمل مثال.",
      "الفرق بين Early Binding و Late Binding؟"
    ],
    ds: [
      "Time complexity للـ Search في: Array, Linked List, BST, Hash Table",
      "الفرق بين Stack و Queue؟ أمثلة من الحياة؟",
      "إيه هو BST وإيه خصايصه؟",
      "الفرق بين BFS و DFS؟ امتى تستخدم كل واحد؟",
      "أحسن Sorting Algorithm للـ nearly sorted data؟",
      "إيه هو O(1), O(log n), O(n), O(n log n), O(n²)؟",
      "إزاي Hash Table بتتعامل مع Collisions؟",
      "إيه هو Dynamic Programming؟",
      "الفرق بين Heap و Stack (Memory)؟",
      "إيه هو Circular Linked List؟"
    ],
    database: [
      "الفرق بين SQL و NoSQL؟ امتى تستخدم كل واحد؟",
      "شرح ACID Properties",
      "شرح Normalization: 1NF, 2NF, 3NF بأمثلة",
      "الفرق بين INNER, LEFT, RIGHT, FULL JOIN؟",
      "الفرق بين DELETE, TRUNCATE, DROP؟",
      "إيه هو Index وليه بيسرع الـ queries؟",
      "إيه هي Stored Procedure؟",
      "إيه هي Transaction؟",
      "إيه هو View في SQL؟",
      "الفرق بين Primary Key و Foreign Key؟"
    ],
    devops: [
      "الفرق بين Container و Virtual Machine؟",
      "إيه هو Docker وإيه بيعمله؟",
      "إيه هو CI/CD؟",
      "الفرق بين git merge و git rebase؟",
      "إيه هو Infrastructure as Code (IaC)؟",
      "إيه هو Kubernetes (high level)؟",
      "إيه هي Microservices Architecture؟",
      "ليه DevOps مهم؟ إيه المشاكل اللي بيحلها؟",
      "إيه هو Dockerfile؟",
      "إيه هي Git branching strategy؟"
    ]
  },

  // ==================== HR QUESTIONS ====================
  hrQuestions: [
    { q: "عرفني بنفسك", q_en: "Introduce yourself", strategy: "Pitch من 90 ثانية", strategy_en: "90-second pitch", tips: "خلفية → مهارات → ليه ITI (بالترتيب)", tips_en: "Background → Skills → Why ITI (in order)" },
    { q: "ليه عايز تنضم لـ ITI؟", q_en: "Why do you want to join ITI?", strategy: "بحث + اهتمام حقيقي", strategy_en: "Research + genuine interest", tips: "التدريب العملي + صلات صناعية + شهادة + نمو مهني", tips_en: "Practical training + industry connections + certificate + career growth" },
    { q: "إيه نقاط قوتك؟", q_en: "What are your strengths?", strategy: "2-3 نقاط + أمثلة", strategy_en: "2-3 points + examples", tips: "مزيج: technical skill + soft skill", tips_en: "Blend of technical and soft skills" },
    { q: "إيه نقاط ضعفك؟", q_en: "What are your weaknesses?", strategy: "صريح + نمو", strategy_en: "Honest + growth-oriented", tips: "اذكر ضعف حقيقي + إيه اللي بتعمله عشان تتحسن", tips_en: "State a real weakness + how you are working to improve" },
    { q: "فين بتشوف نفسك بعد 5 سنين؟", q_en: "Where do you see yourself in 5 years?", strategy: "متسق مع ITI", strategy_en: "Consistent with ITI path", tips: "DevOps Engineer ← Senior ← Lead/Architect", tips_en: "DevOps Engineer → Senior → Lead/Architect" },
    { q: "حكيلي عن تحدي واجهته", q_en: "Tell me about a challenge you faced", strategy: "STAR Method", strategy_en: "STAR Method", tips: "مشكلة تقنية حليتها + الدرس اللي اتعلمته", tips_en: "Technical problem solved + lessons learned" },
    { q: "إزاي بتتعامل مع الضغط؟", q_en: "How do you handle pressure?", strategy: "مثال محدد", strategy_en: "Specific example", tips: "ترتيب أولويات + تركيز + تواصل", tips_en: "Prioritization + focus + communication" },
    { q: "حكيلي عن أكبر إنجاز حقق؟", q_en: "Tell me about your greatest achievement", strategy: "STAR Method", strategy_en: "STAR Method", tips: "مشروع تقني أو إنجاز أكاديمي", tips_en: "Technical project or academic accomplishment" },
    { q: "ليه Computer Engineering؟", q_en: "Why Computer Engineering?", strategy: "شغف حقيقي", strategy_en: "Genuine passion", tips: "حب حل المشاكل + تأثير التكنولوجيا", tips_en: "Love for problem solving + impact of technology" },
    { q: "عندك أسئلة؟", q_en: "Do you have any questions?", strategy: "دايماً YES!", strategy_en: "Always say YES!", tips: "اسأل عن: شكل التدريب، المرشدين، مسار الكاريير", tips_en: "Ask about: training structure, mentors, career paths" }
  ],

  // ==================== CHEAT SHEETS ====================
  cheatSheets: {
    linux: {
      title: "Linux Commands الأهم",
      content: `# تصفح الملفات
ls -la          # كل الملفات بالتفاصيل
find / -name f  # ابحث عن ملف
grep -r "txt" / # ابحث عن نص داخل ملفات

# صلاحيات
chmod 755 file  # rwxr-xr-x
chown user:grp file
chmod +x file   # اضف execute permission

# Processes
ps aux          # كل الـ processes
kill -9 PID     # قتل قسري
top / htop      # مراقبة مباشرة

# Services (systemd)
systemctl start/stop/restart service
systemctl enable/disable service
systemctl status service
journalctl -u service  # View logs

# شبكات
ip a / ifconfig
netstat -tulnp  # الـ ports المفتوحة
ss -tulnp       # بديل أسرع
ping host       # اختبار connectivity

# نظام
df -h           # مساحة الديسك
free -h         # الذاكرة
uname -a        # معلومات النظام`,
      content_en: `# File navigation
ls -la          # All files with details
find / -name f  # Search for a file by name
grep -r "txt" / # Search for text inside files

# Permissions
chmod 755 file  # rwxr-xr-x
chown user:grp file
chmod +x file   # Add execute permission

# Processes
ps aux          # All processes
kill -9 PID     # Force kill process
top / htop      # Live process monitoring

# Services (systemd)
systemctl start/stop/restart service
systemctl enable/disable service
systemctl status service
journalctl -u service  # View logs

# Networking
ip a / ifconfig
netstat -tulnp  # Open ports
ss -tulnp       # Faster alternative
ping host       # Test connectivity

# System Info
df -h           # Disk usage space
free -h         # Memory RAM usage
uname -a        # System information`
    },
    sql: {
      title: "SQL الأهم",
      content: `-- قراءة
SELECT col FROM tbl WHERE cond;
SELECT * FROM t ORDER BY col DESC;
SELECT COUNT(*), AVG(col) FROM t;

-- تعديل
INSERT INTO t (col) VALUES (val);
UPDATE t SET col=val WHERE cond;
DELETE FROM t WHERE cond;

-- JOIN
SELECT * FROM A
INNER JOIN B ON A.id = B.id;
LEFT JOIN B ON A.id = B.id;

-- تجميع
SELECT col, COUNT(*) FROM t
GROUP BY col
HAVING COUNT(*) > 5;

-- Subquery
SELECT * FROM t
WHERE id IN (SELECT id FROM t2);`,
      content_en: `-- Read / Query
SELECT col FROM tbl WHERE cond;
SELECT * FROM t ORDER BY col DESC;
SELECT COUNT(*), AVG(col) FROM t;

-- Modify / Write
INSERT INTO t (col) VALUES (val);
UPDATE t SET col=val WHERE cond;
DELETE FROM t WHERE cond;

-- JOINs
SELECT * FROM A
INNER JOIN B ON A.id = B.id;
LEFT JOIN B ON A.id = B.id;

-- Aggregation & Grouping
SELECT col, COUNT(*) FROM t
GROUP BY col
HAVING COUNT(*) > 5;

-- Subquery
SELECT * FROM t
WHERE id IN (SELECT id FROM t2);`
    },
    osi: {
      title: "OSI Model",
      data: [
        { layer: "7", name: "Application (التطبيق)", protocols: "HTTP, HTTPS, FTP, SMTP, DNS", mnemonic: "All" },
        { layer: "6", name: "Presentation (العرض)", protocols: "SSL, TLS, JPEG, GIF, MP3", mnemonic: "People" },
        { layer: "5", name: "Session (الجلسة)", protocols: "NetBIOS, PPTP, RPC, SOCKS", mnemonic: "Seem" },
        { layer: "4", name: "Transport (النقل)", protocols: "TCP, UDP", mnemonic: "To" },
        { layer: "3", name: "Network (الشبكة)", protocols: "IP (IPv4/IPv6), ICMP, ARP, OSPF", mnemonic: "Need" },
        { layer: "2", name: "Data Link (ربط البيانات)", protocols: "Ethernet, Wi-Fi (802.11), Switch, MAC", mnemonic: "Data" },
        { layer: "1", name: "Physical (الفيزيائية)", protocols: "Cables, Hub, Repeater, Fiber Optics", mnemonic: "Processing" }
      ]
    },
    ports: {
      title: "Port Numbers الأهم",
      data: [
        { port: "22", service: "SSH", proto: "TCP" },
        { port: "21/20", service: "FTP", proto: "TCP" },
        { port: "80", service: "HTTP", proto: "TCP" },
        { port: "443", service: "HTTPS", proto: "TCP" },
        { port: "53", service: "DNS", proto: "UDP/TCP" },
        { port: "25", service: "SMTP", proto: "TCP" },
        { port: "67/68", service: "DHCP", proto: "UDP" },
        { port: "110", service: "POP3", proto: "TCP" },
        { port: "143", service: "IMAP", proto: "TCP" },
        { port: "3306", service: "MySQL", proto: "TCP" },
        { port: "5432", service: "PostgreSQL", proto: "TCP" },
        { port: "6379", service: "Redis", proto: "TCP" },
        { port: "27017", service: "MongoDB", proto: "TCP" }
      ]
    },
    bigO: {
      title: "Big-O Complexity",
      data: [
        { structure: "Array", access: "O(1)", search: "O(n)", insert: "O(n)", del: "O(n)" },
        { structure: "Linked List", access: "O(n)", search: "O(n)", insert: "O(1)", del: "O(1)" },
        { structure: "BST (avg)", access: "O(log n)", search: "O(log n)", insert: "O(log n)", del: "O(log n)" },
        { structure: "Hash Table", access: "O(1)", search: "O(1)", insert: "O(1)", del: "O(1)" }
      ],
      sorting: [
        { algo: "Bubble", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
        { algo: "Selection", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
        { algo: "Insertion", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
        { algo: "Merge", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
        { algo: "Quick", best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)" }
      ]
    },
    solvedCodes: [
      {
        title: "حساب المضروب (Factorial)",
        desc: "حساب مضروب الرقم N باستخدام Loop بسيطة.",
        code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 0, factorial = 1;\n    cout << "Enter the number: ";\n    cin >> n;\n    \n    for (int i = 1; i <= n; i++) {\n        factorial *= i;\n    }\n    \n    cout << "Factorial of " << n << " = " << factorial << endl;\n    return 0;\n}`
      },
      {
        title: "عد الأرقام الزوجية والفردية",
        desc: "تكرار إدخال 5 أرقام وفرزهم لمعرفة عدد الأرقام الزوجية والفردية.",
        code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 0, oddCount = 0, evenCount = 0;\n    for (int i = 1; i <= 5; i++) {\n        cout << "Enter number " << i << ": ";\n        cin >> n;\n        if (n % 2 != 0)\n            oddCount++;\n        else\n            evenCount++;\n    }\n    cout << "Total Odd Numbers = " << oddCount << endl;\n    cout << "Total Even Numbers = " << evenCount << endl;\n    return 0;\n}`
      },
      {
        title: "حساب متوسط عناصر المصفوفة (Average of Array)",
        desc: "حساب مجموع مصفوفة وقسمته على حجمها للحصول على المتوسط الحسابي.",
        code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int sum = 0, count = 0, i = 0;\n    const int size = 5;\n    int arr[size] = { 22, 55, 7, 6, 2 };\n    \n    for (i = 0; i < size; i++) {\n        sum += arr[i];\n        count++;\n    }\n    \n    // Casting sum to double to get accurate decimal values\n    cout << "Average (Method 1) = " << (double)sum / i << endl;\n    cout << "Average (Method 2) = " << sum / count << endl;\n    return 0;\n}`
      },
      {
        title: "إيجاد أكبر قيمة في المصفوفة (Max Value)",
        desc: "البحث عن العنصر الأكبر في المصفوفة بافتراض أول قيمة ثم المقارنة.",
        code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    const int size = 4;\n    int arr[size] = { 2, 3, 5, 8 };\n    int max = arr[0]; // افتراض أول قيمة هي الأكبر\n    \n    for (int i = 1; i < size; i++) {\n        if (arr[i] > max) {\n            max = arr[i];\n        }\n    }\n    \n    cout << "Max value in array = " << max << endl;\n    return 0;\n}`
      },
      {
        title: "البحث عن قيمة في المصفوفة (Linear Search)",
        desc: "معرفة هل الرقم موجود في المصفوفة وفي أي خانة (Index) مع إيقاف البحث بمجرد إيجاده.",
        code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5];\n    cout << "Enter 5 numbers:\\n";\n    for (int i = 0; i < 5; i++) {\n        cin >> arr[i];\n    }\n    \n    cout << "Enter the element to search for: ";\n    int element;\n    cin >> element;\n    \n    bool found = false;\n    int position = -1;\n    \n    for (int i = 0; i < 5; i++) {\n        if (element == arr[i]) {\n            found = true;\n            position = i;\n            break; // إيقاف اللوب فوراً\n        }\n    }\n    \n    if (found) {\n        cout << "Number found at position " << position + 1 << endl;\n    } else {\n        cout << "Number not found in the array" << endl;\n    }\n    return 0;\n}`
      },
      {
        title: "إدخال وطباعة المصفوفة باستخدام الدوال (Functions)",
        desc: "تقسيم الكود إلى دالة لإدخال القيم ودالة أخرى لطباعة المصفوفة.",
        code: `#include <iostream>\nusing namespace std;\n\n// دالة لإدخال قيم المصفوفة\nvoid setArray(int paraArray[], int size) {\n    for (int i = 0; i < size; i++) {\n        cout << "Enter element " << i + 1 << ": ";\n        cin >> paraArray[i];\n    }\n}\n\n// دالة لطباعة عناصر المصفوفة\nvoid printArray(int paraArray[], int size) {\n    cout << "Your array elements: \\n";\n    for (int i = 0; i < size; i++) {\n        cout << paraArray[i] << "\\t";\n    }\n    cout << endl;\n}\n\nint main() {\n    int arr[5];\n    setArray(arr, 5);\n    printArray(arr, 5);\n    return 0;\n}`
      },
      {
        title: "ترتيب عناصر المصفوفة (Bubble Sort)",
        desc: "ترتيب أرقام المصفوفة تصاعدياً باستخدام خوارزمية الفقاعة المقارنة الثنائية.",
        code: `#include <iostream>\nusing namespace std;\n\nvoid sortArray(int arr[], int size) {\n    int temp = 0;\n    for (int i = 0; i < size - 1; i++) {\n        for (int j = 0; j < size - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                // Swap algorithm\n                temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n}\n\nvoid printArray(int arr[], int size) {\n    for (int i = 0; i < size; i++) {\n        cout << arr[i] << "\\t";\n    }\n    cout << endl;\n}\n\nint main() {\n    int scatteredArray[5] = { 5, 2, 4, 3, 1 };\n    sortArray(scatteredArray, 5);\n    printArray(scatteredArray, 5);\n    return 0;\n}`
      },
      {
        title: "عكس عناصر المصفوفة (Reverse Array)",
        desc: "عكس ترتيب العناصر في مكانها (In-place reverse) بتبديل البداية بالنهاية.",
        code: `#include <iostream>\nusing namespace std;\n\nvoid swap(int &a, int &b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nvoid reverseArray(int arr[], int size) {\n    // نقسم على 2 لكي لا نكرر التبديل ونرجع المصفوفة لأصلها\n    for (int i = 0; i < size / 2; i++) {\n        swap(arr[i], arr[size - i - 1]);\n    }\n}\n\nvoid printArray(int arr[], int size) {\n    for (int i = 0; i < size; i++) {\n        cout << arr[i] << "\\t";\n    }\n    cout << endl;\n}\n\nint main() {\n    int arr[5] = { 1, 2, 3, 4, 5 };\n    reverseArray(arr, 5);\n    printArray(arr, 5);\n    return 0;\n}`
      },
      {
        title: "جمع عناصر مصفوفة ثنائية الأبعاد (2D Array Sum)",
        desc: "استخدام nested loop للمرور على جميع الصفوف والأعمدة وجمع القيم.",
        code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int twoDimaArray[2][3] = { {1, 2, 3}, {4, 5, 6} };\n    int sum = 0;\n    \n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++) {\n            sum += twoDimaArray[i][j];\n        }\n    }\n    \n    cout << "Total Sum of 2D Array = " << sum << endl;\n    return 0;\n}`
      },
      {
        title: "متوسط قيم كل صف في مصفوفة 2D",
        desc: "حساب المتوسط الحسابي لكل صف على حدة وتصفير المجموع قبل كل صف جديد.",
        code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int TwoDArray[10][5];\n    int avg[10];\n    int sum = 0;\n    \n    // إدخال القيم من المستخدم\n    cout << "Enter values for 10x5 array:\\n";\n    for(int r = 0; r < 10; r++) {\n        for(int c = 0; c < 5; c++) {\n            cin >> TwoDArray[r][c];\n        }\n    }\n    \n    // حساب المتوسط لكل صف\n    for (int r = 0; r < 10; r++) {\n        sum = 0; // تصفير قبل كل صف\n        for (int c = 0; c < 5; c++) {\n            sum += TwoDArray[r][c];\n        }\n        avg[r] = sum / 5;\n        cout << "Average of row " << r + 1 << " = " << avg[r] << endl;\n    }\n    return 0;\n}`
      },
      {
        title: "طباعة القطر الرئيسي لمصفوفة مربعة (Diagonal)",
        desc: "طباعة العناصر التي يتساوى فيها رقم الصف مع رقم العمود (Row == Col).",
        code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    char arr[5][5] = {\n        {'*', '#', '#', '#', '#'},\n        {'#', '*', '#', '#', '#'},\n        {'#', '#', '*', '#', '#'},\n        {'#', '#', '#', '*', '#'},\n        {'#', '#', '#', '#', '*'}\n    };\n    \n    for (int r = 0; r < 5; r++) {\n        for (int c = 0; c < 5; c++) {\n            if (r == c) {\n                cout << arr[r][c];\n            } else {\n                cout << " ";\n            }\n        }\n        cout << endl;\n    }\n    return 0;\n}`
      },
      {
        title: "دالة لطباعة مصفوفة ثنائية الأبعاد",
        desc: "كيفية تمرير مصفوفة ثنائية الأبعاد كـ parameter مع وجوب تحديد حجم العمود.",
        code: `#include <iostream>\nusing namespace std;\n\n// يجب كتابة حجم العمود ثابت هنا (4)\nvoid print(int arr[][4], int row) {\n    for (int r = 0; r < row; r++) {\n        for (int c = 0; c < 4; c++) {\n            cout << arr[r][c] << " ";\n        }\n        cout << endl;\n    }\n}\n\nint main() {\n    int arr[2][4] = { {1, 2, 3, 4}, {5, 6, 7, 8} };\n    print(arr, 2);\n    return 0;\n}`
      },
      {
        title: "حساب المجموع بالاستدعاء الذاتي (Recursion Sum)",
        desc: "جمع الأرقام من N إلى 1 بالاستدعاء الذاتي للوظيفة.",
        code: `#include <iostream>\nusing namespace std;\n\nint sum(int n) {\n    if (n == 1)\n        return 1;\n    else\n        return n + sum(n - 1);\n}\n\nint main() {\n    cout << "Sum from 5 to 1 = " << sum(5) << endl; // 5+4+3+2+1 = 15\n    return 0;\n}`
      },
      {
        title: "طباعة مثلث نجوم بالـ Recursion",
        desc: "طباعة مثلث تنازلي باستخدام دوال الاستدعاء الذاتي بدون loops.",
        code: `#include <iostream>\nusing namespace std;\n\nvoid trianglePrint(int n) {\n    if (n <= 0)\n        return;\n    else {\n        for (int i = 0; i < n; i++) {\n            cout << "*";\n        }\n        cout << endl;\n        trianglePrint(n - 1); // استدعاء تنازلي\n    }\n}\n\nint main() {\n    trianglePrint(5);\n    return 0;\n}`
      },
      {
        title: "طباعة خانات الرقم منفصلة بالـ Recursion",
        desc: "فصل خانات أي رقم وطباعتها سطراً بسطر (مثلاً 15455 تظهر 1 ثم 5 ثم 4...).",
        code: `#include <iostream>\nusing namespace std;\n\nvoid SeparationOfNumbers(int n) {\n    if (n == 0)\n        return;\n    else {\n        SeparationOfNumbers(n / 10);\n        cout << n % 10 << endl;\n    }\n}\n\nint main() {\n    SeparationOfNumbers(15455);\n    return 0;\n}`
      },
      {
        title: "نسخ مصفوفة وحساب مجموع وضرب عناصرها",
        desc: "نقل قيم مصفوفة إلى أخرى مع حساب المجموع والضرب (الضرب يبدأ بـ 1).",
        code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    const int size = 4;\n    int sum = 0;\n    long long Multiply = 1; // استخدام long long للأعداد الكبيرة\n    \n    int arr1[size] = { 2, 3, 5, 8 };\n    int arr2[size];\n    \n    for (int i = 0; i < size; i++) {\n        arr2[i] = arr1[i];\n        cout << arr2[i] << "\\t";\n        sum += arr2[i];\n        Multiply *= arr2[i];\n    }\n    \n    cout << "\\nTotal Sum = " << sum << endl;\n    cout << "Total Product = " << Multiply << endl;\n    return 0;\n}`
      },
      {
        title: "جمع زوجي وفردي منفصل في مصفوفة",
        desc: "تصفح مصفوفة وجمع العناصر الزوجية في متغير والفردية في متغير آخر.",
        code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    const int size = 4;\n    int sumEven = 0, sumOdd = 0;\n    int arr1[size] = { 2, 3, 5, 8 };\n    \n    for (int i = 0; i < size; i++) {\n        if (arr1[i] % 2 == 0)\n            sumEven += arr1[i];\n        else\n            sumOdd += arr1[i];\n    }\n    \n    cout << "Sum of Even numbers = " << sumEven << endl;\n    cout << "Sum of Odd numbers = " << sumOdd << endl;\n    return 0;\n}`
      }
    ]
  }
};

// Export
if (typeof module !== 'undefined') {
  module.exports = { STUDY_DATA };
}
