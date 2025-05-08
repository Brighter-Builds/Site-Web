// Initialize tilt effect on team cards
document.addEventListener('DOMContentLoaded', () => {
    VanillaTilt.init(document.querySelectorAll('.team-card'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.05,
        transition: true,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        perspective: 1000
    });

    // Stagger animation for team cards
    const cards = document.querySelectorAll('.team-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.1}s`;
    });

    // Mouse tracking for gradient effect
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update CSS variables for the gradient position
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        // Animation pour l'entrée de la souris
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'perspective(1000px) translateZ(50px) scale(1.1)';
        });
        
        // Animation pour la sortie de la souris avec un effet de retour en douceur
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) translateZ(0) scale(1)';
        });
    });

    // Gestion des boutons de contact
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.open('https://discord.gg/8AsrS9Vtjt', '_blank');
        });
    });

    // Initialize particles effect
    particlesJS('particles-bg', {
        particles: {
            number: {
                value: 40, // Réduit de 100 à 40
                density: {
                    enable: true,
                    value_area: 1000 // Augmenté pour plus d'espace entre les particules
                }
            },
            color: {
                value: ['#B388EB', '#8093F1', '#72DDF7']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.4, // Réduit de 0.6 à 0.4
                random: true,
                anim: {
                    enable: true,
                    speed: 0.5, // Réduit de 1 à 0.5
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true
            },
            move: {
                enable: true,
                speed: 1, // Réduit de 2 à 1
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#8093F1',
                opacity: 0.2,
                width: 1
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.4
                    }
                },
                push: {
                    particles_nb: 3
                }
            }
        }
    });

    // Add/remove gold class to Louloudelta card on hover
    const loulouImg = document.querySelector('.louloudelta-img img');
    const loulouCard = document.querySelector('.louloudelta-card');
    if (loulouImg && loulouCard) {
        loulouImg.addEventListener('mouseenter', function () {
            loulouCard.classList.add('gold');
        });
        loulouImg.addEventListener('mouseleave', function () {
            loulouCard.classList.remove('gold');
        });
    }
});

// Animate background flares
const flares = document.querySelectorAll('.flare');
flares.forEach((flare, index) => {
    const delay = index * 0.5;
    flare.style.animation = `float 20s ${delay}s ease-in-out infinite alternate`;
});

// Parallax effect for team cards on mouse move
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.team-card');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;

        const angleX = (mouseY - cardY) / 30;
        const angleY = (mouseX - cardX) / -30;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });

    // Parallax effect on background elements
    const mouseXRatio = e.clientX / window.innerWidth;
    const mouseYRatio = e.clientY / window.innerHeight;

    const flares = document.querySelectorAll('.flare');
    const stars = document.querySelector('.stars1');
    
    flares.forEach((flare, index) => {
        const depth = (index + 1) * 0.2;
        flare.style.transform = `translate3d(${mouseXRatio * -70 * depth}px, ${mouseYRatio * -70 * depth}px, 0)`;
    });

    if (stars) {
        stars.style.transform = `translate3d(${mouseXRatio * -30}px, ${mouseYRatio * -30}px, 0)`;
    }
});