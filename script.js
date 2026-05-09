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
}