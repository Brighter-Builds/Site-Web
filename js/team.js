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

    // === DYNAMIC SECTION COLOR THEME ===
    function setSectionTheme(main, dark) {
        document.documentElement.style.setProperty('--section-main', main);
        document.documentElement.style.setProperty('--section-dark', dark);
        document.body.classList.add('dynamic-section');
        // Fond général : transparent, on ne touche plus au body
        document.body.style.background = '';
        // Flares : seul le flare du milieu (magenta) et le deuxième (cyan) prennent la couleur, avec un fondu doux
        document.querySelectorAll('.flare').forEach(f => {
            f.style.background = '';
            f.style.filter = '';
            f.style.opacity = '0.5';
        });
        const flareMagenta = document.querySelector('.flare.magenta');
        if (flareMagenta) {
            flareMagenta.style.background = `radial-gradient(circle, ${main} 0%, ${dark} 80%, transparent 100%)`;
            flareMagenta.style.filter = 'blur(120px)';
            flareMagenta.style.opacity = '0.7';
            flareMagenta.style.transition = 'background 0.8s, filter 0.8s, opacity 0.8s';
        }
        const flareCyan = document.querySelector('.flare.cyan');
        if (flareCyan) {
            flareCyan.style.background = `radial-gradient(circle, ${dark} 0%, ${main} 60%, transparent 100%)`;
            flareCyan.style.filter = 'blur(100px)';
            flareCyan.style.opacity = '0.5';
            flareCyan.style.transition = 'background 0.8s, filter 0.8s, opacity 0.8s';
        }
        // Etoiles : pas de changement
        const stars = document.querySelector('.stars1');
        if (stars) stars.style.background = '';
    }

    function resetSectionTheme() {
        document.documentElement.style.setProperty('--section-main', '#B388EB');
        document.documentElement.style.setProperty('--section-dark', '#8093F1');
        document.body.classList.remove('dynamic-section');
        document.body.style.background = '';
        document.querySelectorAll('.flare').forEach(f => {
            f.style.background = '';
            f.style.filter = '';
            f.style.opacity = '';
        });
        const stars = document.querySelector('.stars1');
        if (stars) stars.style.background = '';
    }

    // Survol des sections pour changer le thème
    const teamSections = document.querySelectorAll('.team-category');
    teamSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            const main = section.getAttribute('data-color');
            const dark = section.getAttribute('data-dark');
            setSectionTheme(main, dark);
            // Réinitialise tous les styles personnalisés sur toutes les cartes/boutons/images du site
            document.querySelectorAll('.contact-btn, .team-card, .profile-image').forEach(el => {
                el.style.removeProperty('border-color');
                el.style.removeProperty('box-shadow');
                if (el.classList.contains('contact-btn')) {
                    el.style.removeProperty('background');
                }
            });
            // Applique la couleur uniquement sur les éléments de la section survolée
            section.querySelectorAll('.contact-btn, .profile-image, .team-card').forEach(el => {
                el.style.setProperty('border-color', main, 'important');
                el.style.setProperty('box-shadow', `0 0 0 2px ${main}`, 'important');
                if (el.classList.contains('contact-btn')) {
                    el.style.setProperty('background', `linear-gradient(90deg, ${main}, ${dark})`, 'important');
                }
            });
        });
        section.addEventListener('mouseleave', () => {
            resetSectionTheme();
            // Réinitialise uniquement les styles personnalisés de cette section
            section.querySelectorAll('.contact-btn, .team-card, .profile-image').forEach(el => {
                el.style.removeProperty('border-color');
                el.style.removeProperty('box-shadow');
                if (el.classList.contains('contact-btn')) {
                    el.style.removeProperty('background');
                }
            });
        });
    });
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