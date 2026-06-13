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

  const translations = {
  en: {
    home: "Home",
    programs: "Programs",
    events: "Events",
    testimonials: "Testimonials",
    hero: "From Curiosity to Cosmos",
    explore: "Explore Programs"
  },

  mr: {
    home: "मुख्यपृष्ठ",
    programs: "कार्यक्रम",
    events: "कार्यक्रम",
    testimonials: "प्रशंसापत्र",
    hero: "जिज्ञासेतून अंतराळापर्यंत",
    explore: "कार्यक्रम पहा"
  },

  hi: {
    home: "होम",
    programs: "कार्यक्रम",
    events: "इवेंट्स",
    testimonials: "प्रशंसापत्र",
    hero: "जिज्ञासा से अंतरिक्ष तक",
    explore: "कार्यक्रम देखें"
  }
};

document.getElementById("languageSwitcher").addEventListener("change", function() {
  const lang = this.value;

  document.querySelector('a[href="index.html"]').textContent =
    translations[lang].home;

  document.querySelector('a[href="#programs"]').textContent =
    translations[lang].programs;

  document.querySelector('a[href="events.html"]').textContent =
    translations[lang].events;

  document.querySelector('a[href="testimonials.html"]').textContent =
    translations[lang].testimonials;

  document.querySelector(".hero h1").textContent =
    translations[lang].hero;

  document.querySelector(".hero button").textContent =
    translations[lang].explore;

  localStorage.setItem("language", lang);
});

window.addEventListener("load", () => {
  const savedLang = localStorage.getItem("language") || "en";
  document.getElementById("languageSwitcher").value = savedLang;
  document.getElementById("languageSwitcher").dispatchEvent(new Event("change"));
});
}
