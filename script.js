

// ── 1. ANIMATED STARS BACKGROUND ─────────────────

var canvas = document.getElementById('starsCanvas');
var ctx = canvas.getContext('2d');
var stars = [];
var numStars = 160; // number of stars — change this if you want more or less

// Resize canvas to fill the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create star objects
function createStars() {
  stars = [];
  for (var i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,   // random x position
      y: Math.random() * canvas.height,  // random y position
      r: Math.random() * 1.5 + 0.3,      // random radius (0.3 to 1.8)
      alpha: Math.random(),                   // random opacity
      speed: Math.random() * 0.008 + 0.003,  // twinkle speed
      dir: Math.random() > 0.5 ? 1 : -1    // twinkle direction
    });
  }
}
createStars();

// Draw and animate stars each frame
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < stars.length; i++) {
    var s = stars[i];

    // Twinkle: increase/decrease opacity
    s.alpha += s.speed * s.dir;
    if (s.alpha >= 1) { s.alpha = 1; s.dir = -1; }
    if (s.alpha <= 0) { s.alpha = 0; s.dir = 1; }

    // Draw the star as a small circle
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(200, 180, 255, ' + s.alpha + ')'; // soft purple-white
    ctx.fill();
  }

  requestAnimationFrame(drawStars); // keep looping
}
drawStars();


// ── 2. DARK / LIGHT MODE TOGGLE ──────────────────

var themeToggle = document.getElementById('themeToggle');
var themeIcon = document.getElementById('themeIcon');
var htmlEl = document.documentElement;

// Load saved theme (default = dark)
var savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
applyIcon(savedTheme);

themeToggle.addEventListener('click', function () {
  var current = htmlEl.getAttribute('data-theme');
  var next = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  applyIcon(next);
});

function applyIcon(theme) {
  if (theme === 'light') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}


// ── 3. BACK TO TOP BUTTON ────────────────────────

var backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ── 4. MOBILE MENU — auto-close on link click ────

var navMenu = document.getElementById('navMenu');
var navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    if (navMenu && navMenu.classList.contains('show')) {
      var bsCollapse = bootstrap.Collapse.getInstance(navMenu);
      if (bsCollapse) { bsCollapse.hide(); }
    }
  });
});


// ── 5. FORM VALIDATION ───────────────────────────

var contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get field values
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var message = document.getElementById('message').value.trim();

    // Clear all errors first
    clearErr('name');
    clearErr('email');
    clearErr('subject');
    clearErr('message');

    var isValid = true;

    // Validate name
    if (name === '') {
      showErr('name', 'nameErr', 'Please enter your name.');
      isValid = false;
    }

    // Validate email
    if (email === '') {
      showErr('email', 'emailErr', 'Please enter your email.');
      isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      showErr('email', 'emailErr', 'Please enter a valid email (must include @ and .)');
      isValid = false;
    }

    // Validate subject
    if (subject === '') {
      showErr('subject', 'subjectErr', 'Please enter a subject.');
      isValid = false;
    }

    // Validate message
    if (message === '') {
      showErr('message', 'messageErr', 'Please write your message.');
      isValid = false;
    } else if (message.length < 10) {
      showErr('message', 'messageErr', 'Message too short (min 10 characters).');
      isValid = false;
    }

    // Show success if everything is valid
    if (isValid) {
      var successMsg = document.getElementById('successMsg');
      successMsg.classList.remove('d-none');
      contactForm.reset();

      // Hide success after 5 seconds
      setTimeout(function () {
        successMsg.classList.add('d-none');
      }, 5000);
    }
  });
}

// Helper: show error on a field
function showErr(fieldId, errId, msg) {
  var field = document.getElementById(fieldId);
  var errEl = document.getElementById(errId);
  if (field) field.classList.add('err');
  if (errEl) errEl.textContent = msg;
}

// Helper: clear error from a field
function clearErr(fieldId) {
  var field = document.getElementById(fieldId);
  var errEl = document.getElementById(fieldId + 'Err');
  if (field) field.classList.remove('err');
  if (errEl) errEl.textContent = '';
}