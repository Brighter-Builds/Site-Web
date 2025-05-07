const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateCursor() {
  // Smooth interpolation for main cursor
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

  // Smoother follower with slight delay
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;

  requestAnimationFrame(updateCursor);
}

updateCursor();

document.addEventListener('mousedown', () => {
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(0.8)`;
  cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%) scale(0.6)`;
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(1)`;
  cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%) scale(1)`;
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%) scale(1.5)`;
    cursor.style.opacity = '0.5';
  });

  el.addEventListener('mouseleave', () => {
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%) scale(1)`;
    cursor.style.opacity = '1';
  });
});

function init() {
  var style = ["style1", "style2", "style3", "style4"];

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  //meteoros

  var numeroAleatorio = 5000;

  setTimeout(function () {
    carregarMeteoro();
  }, numeroAleatorio);

  function carregarMeteoro() {
    setTimeout(carregarMeteoro, numeroAleatorio);
    numeroAleatorio = getRandomArbitrary(5000, 10000);
    var meteoro =
      "<div class='meteoro " + style[getRandomArbitrary(0, 4)] + "'></div>";
    document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = meteoro;
    setTimeout(function () {
      document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = "";
    }, 1000);
  }
}
window.onload = init;


var scene = new THREE.Scene();
document.addEventListener("mousemove", onMouseMove, false);
var camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight);
});

const loader = new THREE.TextureLoader();
  
const distance = Math.min(300, window.innerWidth);
const geometry = new THREE.BufferGeometry();
const vertices = [];

for (var i = 0; i < 1600; i++) {
  var theta = Math.acos(THREE.MathUtils.randFloatSpread(2));
  var phi = THREE.MathUtils.randFloatSpread(360);

  vertices.push(
    distance * Math.sin(theta) * Math.cos(phi),
    distance * Math.sin(theta) * Math.sin(phi),
    distance * Math.cos(theta)
  );
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({
  flatShading: true,
});

var particles = new THREE.Points(geometry, material);
particles.boundingSphere = 5;

var renderingParent = new THREE.Group();
renderingParent.add(particles);
var resizeContainer = new THREE.Group();
resizeContainer.add(renderingParent);
scene.add(resizeContainer);

camera.position.z = 360;

var animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
var myTween;
function onMouseMove(event) {
  if (myTween) myTween.kill();

  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  myTween = gsap.to(particles.rotation, {
    duration: 0.1,
    x: mouseY * -1,
    y: mouseX,
  });
}
animate();

// Scaling animation
var animProps = { scale: 1, xRot: 0, yRot: 0 };
gsap.to(animProps, {
  duration: 16,
  scale: 1.5,
  repeat: -1,
  yoyo: true,
  ease: "sine",
  onUpdate: function () {
    renderingParent.scale.set(
      animProps.scale,
      animProps.scale,
      animProps.scale
    );
  },
});

gsap.to(animProps, {
  duration: 1000,
  xRot: Math.PI * 2,
  yRot: Math.PI * 4,
  repeat: -1,
  yoyo: true,
  ease: "none",
  onUpdate: function () {
    renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
  },
});

// Configuration de l'effet 3D des cartes
const initProjectCards = () => {
    if (typeof VanillaTilt === 'undefined') {
        console.warn('VanillaTilt n\'est pas chargé');
        return;
    }

    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        // Initialisation de l'effet tilt
        VanillaTilt.init(card, {
            reverse: false,
            max: 10,
            startX: 0,
            startY: 0,
            perspective: 1500,
            scale: 1.03,
            speed: 300,
            transition: true,
            axis: null,
            reset: true,
            "full-page-listening": false,
            gyroscope: false,
            gyroscopeMinAngleX: -45,
            gyroscopeMaxAngleX: 45,
            gyroscopeMinAngleY: -45,
            gyroscopeMaxAngleY: 45
        });

        // Ajouter la classe pour activer la perspective 3D
        card.style.transformStyle = 'preserve-3d';
        
        // Sélectionner les éléments internes
        const content = card.querySelector('.project-content');
        const image = card.querySelector('.project-image');
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        const button = card.querySelector('.project-btn');

        // Appliquer les transformations 3D
        if (content) content.style.transform = 'translateZ(30px)';
        if (image) image.style.transform = 'translateZ(40px)';
        if (title) title.style.transform = 'translateZ(50px)';
        if (description) description.style.transform = 'translateZ(40px)';
        if (button) button.style.transform = 'translateZ(45px)';
    });
};

// Attendre que le DOM soit chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectCards);
} else {
    initProjectCards();
}

// Configuration de l'effet 3D des box
const initBoxTilt = () => {
    const boxes = document.querySelectorAll('.container .box');
    
    boxes.forEach(box => {
        VanillaTilt.init(box, {
            max: 25, // Augmentation de l'angle maximal
            speed: 400,
            glare: true,
            "max-glare": 0.5,
            scale: 1.1, // Agrandissement au survol
            perspective: 1000,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            transition: true
        });

        // Ajout d'une class pour le style 3D
        box.style.transformStyle = 'preserve-3d';
        
        // Ajouter l'effet de profondeur sur le contenu
        const content = box.querySelector('b');
        if (content) {
            content.style.transform = 'translateZ(50px)';
        }
    });
};

// Initialiser l'effet quand le DOM est chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBoxTilt);
} else {
    initBoxTilt();
}

// Configuration et initialisation des particules
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#8093F1", "#B388EB", "#F7AEF8"]
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        }
    }
});

// Effet de parallaxe sur le scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.parallax-bg');
    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Effet de parallaxe sur le hero
document.addEventListener('mousemove', (e) => {
    const space = document.querySelector('.space');
    const stars = document.querySelector('.stars1');
    const flares = document.querySelectorAll('.flare');
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Effet de parallaxe sur l'espace et les étoiles
    if (space) {
        space.style.transform = `translate3d(${mouseX * -30}px, ${mouseY * -30}px, 0)`;
    }
    if (stars) {
        stars.style.transform = `translate3d(${mouseX * -50}px, ${mouseY * -50}px, 0)`;
    }
    
    // Effet de parallaxe sur les flares lumineux
    flares.forEach((flare, index) => {
        const depth = (index + 1) * 0.2;
        flare.style.transform = `translate3d(${mouseX * -70 * depth}px, ${mouseY * -70 * depth}px, 0)`;
    });
});

// Animation des cartes au scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});