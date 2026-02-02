
function acceptMagic() {
    const result = document.getElementById("magicResult");

    result.innerHTML = `
    ✨ La invitación ha sido aceptada.<br>
    El 14 de febrero la magia hará su efecto 🦉
  `;

    result.style.opacity = "0";
    result.style.transition = "opacity 1s ease";

    setTimeout(() => {
        result.style.opacity = "1";
    }, 100);
}

function escapeMagic(btn) {
    const maxX = 160;
    const maxY = 120;

    const x = Math.random() * maxX - maxX / 2;
    const y = Math.random() * maxY - maxY / 2;

    btn.style.transform = `translate(${x}px, ${y}px)`;
}



// ===============================
// ANIMACIÓN AL HACER SCROLL
// ===============================
const magicCard = document.querySelector(".magic-card");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        magicCard.classList.add("show");
      }
    });
  },
  { threshold: 0.3 }
);

observer.observe(magicCard);

// ===============================
// SONIDO MÁGICO
// ===============================
const magicSound = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-magical-coin-win-1936.mp3"
);

// ===============================
// CONFETI DORADO
// ===============================
function createConfetti() {
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("span");
    confetti.classList.add("confetti");
    document.body.appendChild(confetti);

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";

    setTimeout(() => confetti.remove(), 5000);
  }
}

// ===============================
// BOTÓN ACEPTAR
// ===============================
function acceptMagic() {
  const result = document.getElementById("magicResult");

  magicSound.play();
  createConfetti();

  result.innerHTML = `
    ✨ La invitación ha sido aceptada.<br>
    El 14 de febrero la magia está sellada 🦉
  `;

  result.style.opacity = "0";
  result.style.transition = "opacity 1.2s ease";

  setTimeout(() => {
    result.style.opacity = "1";
  }, 100);
}

// ===============================
// BOTÓN NO QUE HUYE
// ===============================
function escapeMagic(btn) {
  const maxX = 180;
  const maxY = 120;

  const x = Math.random() * maxX - maxX / 2;
  const y = Math.random() * maxY - maxY / 2;

  btn.style.transform = `translate(${x}px, ${y}px)`;
}
