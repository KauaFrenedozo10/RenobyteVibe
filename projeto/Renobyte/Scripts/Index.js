(function() {
    let mouseX = 0, mouseY = 0;

    // Canvas de partículas
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            this.color = `rgba(126, 207, 126, ${Math.random() * 0.5 + 0.2})`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * 1.5;
                this.y -= Math.sin(angle) * 1.5;
            }
            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    for (let i = 0; i < 120; i++) particles.push(new Particle());

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 80) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(126, 207, 126, ${0.1 * (1 - dist / 80)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Atualiza posição do mouse para interação com partículas
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Digitação
    const typingElement = document.getElementById('typing');
    const phrase = "repensando o futuro do lixo eletrônico";
    let i = 0;
    function typeWriter() {
        if (i < phrase.length) {
            typingElement.textContent += phrase.charAt(i);
            i++;
            setTimeout(typeWriter, 70 + Math.random() * 40);
        } else {
            typingElement.style.borderRight = '2px solid #7ecf7e';
        }
    }
    setTimeout(typeWriter, 500);

    // Glitch no título
    const mainTitle = document.getElementById('mainTitle');
    mainTitle.addEventListener('mouseenter', () => {
        mainTitle.classList.add('glitch-active');
        setTimeout(() => mainTitle.classList.remove('glitch-active'), 300);
    });

    // Menu mobile
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    hamburger.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // Revelação com scroll
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => observer.observe(el));

    // Contadores animados
    const tonCounter = document.getElementById('tonCounter');
    const percentCounter = document.getElementById('percentCounter');
    function animateCounter(el, start, end, duration) {
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            el.textContent = current.toFixed(0);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = end;
        }
        requestAnimationFrame(step);
    }
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(tonCounter, 0, 2.5, 1500);
                animateCounter(percentCounter, 0, 3, 1500);
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    if (tonCounter) aboutObserver.observe(tonCounter);

    // Efeito 3D nos cards
    document.querySelectorAll('.news-card, .ponto-card, .tipo-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Partículas ao clicar nos botões
    function createParticlesAt(x, y, count = 15) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.background = '#7ecf7e';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10001';
            particle.style.opacity = '1';
            document.body.appendChild(particle);
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 5 + 3;
            const dx = Math.cos(angle) * velocity;
            const dy = Math.sin(angle) * velocity;
            let posX = x, posY = y, opacity = 1;
            function animate() {
                posX += dx;
                posY += dy + 0.15;
                opacity -= 0.02;
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;
                if (opacity > 0) requestAnimationFrame(animate);
                else particle.remove();
            }
            requestAnimationFrame(animate);
        }
    }
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            createParticlesAt(e.clientX, e.clientY, 25);
        });
    });
})();