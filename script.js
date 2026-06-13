/* NAVIGATION */
function go(page) {
  window.location.href = page;
}

function scrollToPrograms() {
  const section = document.getElementById("programs");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* STAR ANIMATION */
const canvas = document.getElementById("stars");
if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let stars = [];

  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: Math.random()*2
    });
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";

    stars.forEach(s => {
      ctx.fillRect(s.x,s.y,s.size,s.size);
      s.y -= 0.2;
      if (s.y < 0) s.y = canvas.height;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* THEME TOGGLE */
const btn = document.getElementById("themeToggle");

if (btn) {
  // Load saved theme
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    btn.textContent = "☀️";
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      btn.textContent = "☀️";
      localStorage.setItem("theme", "light");
    } else {
      btn.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    }
  });

  /* TRANSLATIONS: English (en), Marathi (mr), Hindi (hi)
     Minimal, extendable translations object. For any text not present
     here we fallback to the English original text. We assign data-translate
     attributes at runtime so we don't need to modify every HTML file. */
  const translations = {
    en: {
      home: "Home",
      programs: "Programs",
      events: "Events",
      testimonials: "Testimonials",
      hero: "From Curiosity to Cosmos",
      explore: "Explore Programs",
      space_program: "🚀 Space Program",
      ai_robotics: "🤖 AI & Robotics",
      drone_technology: "🚁 Drone Technology",
      kids: "🎓 Kids",
      contact_phone: "📞 9158151444",
      contact_location: "📍 Mumbai, Maharashtra"
    },

    mr: {
      home: "मुख्यपृष्ठ",
      programs: "कार्यक्रम",
      events: "कार्यक्रम",
      testimonials: "प्रशंसापत्र",
      hero: "जिज्ञासेतून अंतराळापर्यंत",
      explore: "कार्यक्रम पहा",
      space_program: "🚀 स्पेस प्रोग्राम",
      ai_robotics: "🤖 एआय आणि रोबोटिक्स",
      drone_technology: "🚁 ड्रोन तंत्रज्ञान",
      kids: "🎓 मुले",
      contact_phone: "📞 9158151444",
      contact_location: "📍 मुंबई, महाराष्ट्र"
    },

    hi: {
      home: "होम",
      programs: "कार्यक्रम",
      events: "इवेंट्स",
      testimonials: "प्रशंसापत्र",
      hero: "जिज्ञासा से अंतरिक्ष तक",
      explore: "कार्यक्रम देखें",
      space_program: "🚀 स्पेस प्रोग्राम",
      ai_robotics: "🤖 एआई और रोबोटिक्स",
      drone_technology: "🚁 ड्रोन टेक्नोलॉजी",
      kids: "🎓 बच्चे",
      contact_phone: "📞 9158151444",
      contact_location: "📍 मुंबई, महाराष्ट्र"
    }
  };

  // Helper: create a slug key from English text
  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '_')           // Replace spaces with _
      .replace(/[^a-z0-9_\u0900-\u097F\u0A00-\u0A7F]/g, '') // Remove non-alphanum (keep Devanagari ranges)
      .replace(/_+/g, '_')            // Collapse multiple _
      .replace(/^_|_$/g, '');         // Trim leading/trailing _
  }

  // Assign data-translate attributes to visible text elements at runtime
  function assignDataTranslateAttributes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null);
    const seenKeys = new Set(Object.keys(translations.en));
    const generatedKeys = new Set();

    while (walker.nextNode()) {
      const el = walker.currentNode;

      // Skip elements that should not be translated
      const tag = el.tagName.toLowerCase();
      if (['script','style','noscript','iframe','canvas','video','source','img','svg'].includes(tag)) continue;

      // Keep MAIAMMA FOUNDATION unchanged: do not add data-translate to the main heading
      if (el.tagName.toLowerCase() === 'h2' && el.textContent.trim() === 'MAIAMMA FOUNDATION') continue;

      // If already has attribute, skip
      if (el.hasAttribute('data-translate')) continue;

      // Consider only elements that contain a single text node or have simple text content
      const text = el.textContent.trim();
      if (!text) continue;

      // Avoid translating navigation select options (language names)
      if (el.id === 'languageSwitcher' || el.closest('#languageSwitcher')) continue;

      // Avoid translating elements that contain child elements with their own text
      if (el.children.length > 0) {
        // If element has only text-like children (e.g., span inside a) we still skip here
        // We'll rely on child elements to receive data-translate instead.
        continue;
      }

      // Create key from English text
      let baseKey = slugify(text);
      if (!baseKey) continue;

      let key = baseKey;
      let idx = 1;
      while (seenKeys.has(key) || generatedKeys.has(key)) {
        key = baseKey + '_' + idx;
        idx++;
      }

      // Mark as seen
      generatedKeys.add(key);

      // Set attribute
      el.setAttribute('data-translate', key);

      // Populate translations object for new key with fallbacks
      translations.en[key] = translations.en[key] || text;
      translations.hi[key] = translations.hi[key] || text;
      translations.mr[key] = translations.mr[key] || text;
    }
  }

  // Apply translations for a language
  function applyTranslations(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (!key) return;
      const val = (translations[lang] && translations[lang][key]) || translations.en[key] || '';
      // Preserve simple HTML structure like inside buttons or anchors
      el.textContent = val;
    });
  }

  // Initialize language switcher behavior
  const languageSwitcher = document.getElementById('languageSwitcher');
  if (languageSwitcher) {
    languageSwitcher.addEventListener('change', function() {
      const lang = this.value;
      applyTranslations(lang);
      localStorage.setItem('language', lang);
    });

    window.addEventListener('load', () => {
      // First assign attributes so translations can target elements
      assignDataTranslateAttributes();

      const savedLang = localStorage.getItem('language') || 'en';
      languageSwitcher.value = savedLang;
      // Apply translations after attributes assigned
      applyTranslations(savedLang);
    });
  } else {
    // If no switcher, still assign attributes on load
    window.addEventListener('load', assignDataTranslateAttributes);
  }

}
