// Particle background setup
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");
let width, height, particles;

function initCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  particles = [];
  const particleCount = Math.floor(width / 10);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.3,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(138, 106, 248, ${p.alpha})`;
    ctx.shadowColor = "rgba(138, 106, 248, 0.8)";
    ctx.shadowBlur = 8;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = width;
    else if (p.x > width) p.x = 0;

    if (p.y < 0) p.y = height;
    else if (p.y > height) p.y = 0;
  });

  requestAnimationFrame(drawParticles);
}

// Init particle background
initCanvas();
drawParticles();
window.addEventListener("resize", () => {
  initCanvas();
});

// Kalkulator fungsi
function clearErrors() {
  document.querySelectorAll(".error").forEach((e) => (e.innerText = ""));
  document.querySelectorAll(".hasil").forEach((h) => {
    h.classList.remove("show");
    h.innerHTML = "";
  });
}

function showHasil(element, html) {
  element.innerHTML = html;
  element.classList.add("show");
}

function hitungLuas() {
  clearErrors();
  const alas = parseFloat(document.getElementById("alas").value);
  const tinggi = parseFloat(document.getElementById("tinggi").value);
  let isValid = true;

  if (isNaN(alas) || alas <= 0) {
    document.getElementById("errorAlas").innerText = "Masukkan alas yang valid";
    isValid = false;
  }

  if (isNaN(tinggi) || tinggi <= 0) {
    document.getElementById("errorTinggi").innerText =
      "Masukkan tinggi yang valid";
    isValid = false;
  }

  if (isValid) {
    const luas = 0.5 * alas * tinggi;
    showHasil(
      document.getElementById("hasilLuas"),
      `
      L = 1/2 × ${alas} × ${tinggi}<br/>
      L = ${luas.toFixed(2)} cm²
    `
    );
  }
}

function hitungKeliling() {
  clearErrors();
  const sisi1 = parseFloat(document.getElementById("sisi1").value);
  const sisi2 = parseFloat(document.getElementById("sisi2").value);
  const sisi3 = parseFloat(document.getElementById("sisi3").value);
  let isValid = true;

  if (isNaN(sisi1) || sisi1 <= 0) {
    document.getElementById("errorSisi1").innerText =
      "Masukkan sisi A yang valid";
    isValid = false;
  }
  if (isNaN(sisi2) || sisi2 <= 0) {
    document.getElementById("errorSisi2").innerText =
      "Masukkan sisi B yang valid";
    isValid = false;
  }
  if (isNaN(sisi3) || sisi3 <= 0) {
    document.getElementById("errorSisi3").innerText =
      "Masukkan sisi C yang valid";
    isValid = false;
  }

  if (isValid) {
    const keliling = sisi1 + sisi2 + sisi3;
    showHasil(
      document.getElementById("hasilKeliling"),
      `
      K = ${sisi1} + ${sisi2} + ${sisi3}<br/>
      K = ${keliling.toFixed(2)} cm
    `
    );
  }
}

function tampilkanForm(mode) {
  const btnLuas = document.getElementById("btn-luas");
  const btnKeliling = document.getElementById("btn-keliling");
  const formLuas = document.getElementById("form-luas");
  const formKeliling = document.getElementById("form-keliling");

  if (mode === "luas") {
    formLuas.classList.remove("hidden");
    formKeliling.classList.add("hidden");
    btnLuas.classList.add("active");
    btnKeliling.classList.remove("active");
  } else {
    formLuas.classList.add("hidden");
    formKeliling.classList.remove("hidden");
    btnKeliling.classList.add("active");
    btnLuas.classList.remove("active");
  }
}
