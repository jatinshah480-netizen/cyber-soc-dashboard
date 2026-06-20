/**
 * Cybersecurity Professional Tasks — Interactive Scripts
 * Particle canvas, scroll animations, counter animations, terminal typing
 */

(function () {
  'use strict';

  // =============================================
  // Particle Canvas Background
  // =============================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouseX = 0;
    let mouseY = 0;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.hue = Math.random() > 0.5 ? 200 : 280; // Blue or purple
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse repulsion
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.02;
          this.speedX += dx / dist * force;
          this.speedY += dy / dist * force;
        }

        // Damping
        this.speedX *= 0.999;
        this.speedY *= 0.999;

        // Wrap around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const opacity = (1 - dist / 140) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  }

  // =============================================
  // Scroll-triggered Section Reveal
  // =============================================
  const sections = document.querySelectorAll('.task-section');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Restart terminal animations when section enters view
        restartTerminalAnimations(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  function restartTerminalAnimations(section) {
    const terminalLines = section.querySelectorAll('.terminal-line');
    terminalLines.forEach(line => {
      line.style.animation = 'none';
      line.offsetHeight; // Force reflow
      line.style.animation = '';
    });

    // Also restart vuln scanner animations
    const vulnRows = section.querySelectorAll('.vuln-row');
    vulnRows.forEach(row => {
      row.style.animation = 'none';
      row.offsetHeight;
      row.style.animation = '';
    });

    const progressFill = section.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.animation = 'none';
      progressFill.offsetHeight;
      progressFill.style.animation = '';
    }
  }

  // =============================================
  // Hero Counter Animation
  // =============================================
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        counter.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(update);
    });
  }

  // Trigger counters when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const hero = document.getElementById('hero');
  if (hero) {
    heroObserver.observe(hero);
  }

  // =============================================
  // Scroll Indicator Hide on Scroll
  // =============================================
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    let scrollHidden = false;
    window.addEventListener('scroll', () => {
      if (!scrollHidden && window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateY(20px)';
        scrollIndicator.style.transition = 'opacity 0.5s, transform 0.5s';
        scrollHidden = true;
      }
    });
  }

  // =============================================
  // Tilt Effect on Task Cards
  // =============================================
  const cards = document.querySelectorAll('.task-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -2;
      const rotateY = ((x - centerX) / centerX) * 2;

      card.style.transform = `translateY(-4px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Move the glow element
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(56, 189, 248, 0.15), transparent 60%)`;
        glow.style.opacity = '1';
        glow.style.height = '100%';
        glow.style.top = '0';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.opacity = '0';
        glow.style.height = '1px';
        glow.style.background = '';
      }
    });
  });

  // =============================================
  // MFA Step Animation
  // =============================================
  const mfaSteps = document.querySelectorAll('.mfa-step');
  let mfaAnimationStarted = false;

  const mfaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !mfaAnimationStarted) {
        mfaAnimationStarted = true;
        animateMFA();
      }
    });
  }, { threshold: 0.5 });

  const mfaVisual = document.querySelector('.mfa-visual');
  if (mfaVisual) {
    mfaObserver.observe(mfaVisual);
  }

  function animateMFA() {
    // After 2 seconds, verify Factor 2
    setTimeout(() => {
      const step2Check = document.querySelector('.mfa-step[data-step="2"] .mfa-check');
      if (step2Check) {
        step2Check.classList.remove('verifying');
        step2Check.classList.add('verified');
        step2Check.innerHTML = '✓';
      }
    }, 2000);

    // After 3.5 seconds, start verifying Factor 3
    setTimeout(() => {
      const step3Check = document.querySelector('.mfa-step[data-step="3"] .mfa-check');
      if (step3Check) {
        step3Check.classList.remove('pending');
        step3Check.classList.add('verifying');
        step3Check.innerHTML = '<div class="spinner"></div>';
      }
    }, 3500);

    // After 5 seconds, verify Factor 3
    setTimeout(() => {
      const step3Check = document.querySelector('.mfa-step[data-step="3"] .mfa-check');
      if (step3Check) {
        step3Check.classList.remove('verifying');
        step3Check.classList.add('verified');
        step3Check.innerHTML = '✓';
      }
    }, 5000);
  }

  // =============================================
  // Incident Timeline Step-Through Animation
  // =============================================
  let timelineAnimated = false;

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !timelineAnimated) {
        timelineAnimated = true;
        animateTimeline();
      }
    });
  }, { threshold: 0.3 });

  const timeline = document.querySelector('.incident-timeline');
  if (timeline) {
    timelineObserver.observe(timeline);
  }

  function animateTimeline() {
    const steps = document.querySelectorAll('.timeline-step');
    const connectors = document.querySelectorAll('.timeline-connector');

    // After 3 seconds, activate step 3 (contain) and its connector
    setTimeout(() => {
      if (steps[2]) {
        steps[2].classList.remove('in-progress');
        steps[2].classList.add('active');
      }
      if (connectors[2]) {
        connectors[2].classList.add('active');
      }
    }, 3000);

    // After 4.5 seconds, activate step 4
    setTimeout(() => {
      if (steps[3]) {
        steps[3].classList.add('in-progress');
      }
    }, 4500);

    setTimeout(() => {
      if (steps[3]) {
        steps[3].classList.remove('in-progress');
        steps[3].classList.add('active');
      }
      if (connectors[3]) {
        connectors[3].classList.add('active');
      }
    }, 6000);

    // After 7 seconds, activate step 5
    setTimeout(() => {
      if (steps[4]) {
        steps[4].classList.add('active');
      }
    }, 7500);
  }

  // =============================================
  // Smooth Parallax on Orbs
  // =============================================
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, i) => {
      const speed = 0.05 + i * 0.02;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

})();
