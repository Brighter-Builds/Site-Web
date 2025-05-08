// Confetti effect for Louloudelta profile image

function randomColor() {
  // Gold, silver, and white
  const colors = ['#FFD700', '#FFFBE6', '#E6D200', '#B3B3B3', '#FFFFFF'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createConfettiPiece(canvas) {
  const size = Math.random() * 12 + 8;
  return {
    x: Math.random() * canvas.width,
    y: -size,
    size,
    color: randomColor(),
    speed: Math.random() * 2 + 2,
    angle: Math.random() * 2 * Math.PI,
    spin: (Math.random() - 0.5) * 0.2
  };
}

function launchConfetti() {
  // Crée un nouveau canvas à chaque clic
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas-instance';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '11';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let confetti = [];
  for (let i = 0; i < 80; i++) {
    confetti.push(createConfettiPiece(canvas));
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti = confetti.filter(piece => piece.y < canvas.height + 30);
    confetti.forEach(piece => {
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.angle);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size/2, -piece.size/2, piece.size, piece.size);
      ctx.restore();
      piece.y += piece.speed;
      piece.angle += piece.spin;
    });
    if (confetti.length > 0) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.remove();
    }
  }
  draw();
}

document.getElementById('loulou-img').addEventListener('click', launchConfetti);

// --- Billets qui tombent du haut de la page ---
function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

function createFallingBill() {
  const bill = document.createElement('img');
  bill.src = 'assets/billet.jpg';
  bill.className = 'falling-bill';
  bill.style.left = randomBetween(0, window.innerWidth - 180) + 'px';
  bill.style.transform = `rotate(${randomBetween(-30, 30)}deg)`;
  document.body.appendChild(bill);
  setTimeout(() => bill.remove(), 5000);
}

function startBillsRain() {
  setInterval(() => {
    createFallingBill();
  }, 700);
}

window.addEventListener('DOMContentLoaded', startBillsRain);

document.querySelector('.profile-wrapper button').addEventListener('click', function(e) {
  window.open('https://discord.gg/8AsrS9Vtjt', '_blank');
});