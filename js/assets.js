document.addEventListener('DOMContentLoaded', function() {
  const passwordContainer = document.getElementById('password-container');
  const assetsContent = document.getElementById('assets-content');
  const passwordInput = document.getElementById('password-input');
  const passwordSubmit = document.getElementById('password-submit');
  const passwordError = document.getElementById('password-error');

  passwordSubmit.addEventListener('click', function() {
    if (passwordInput.value === 'ajaxbuilds') {
      passwordContainer.style.display = 'none';
      assetsContent.style.display = 'block';
    } else {
      passwordError.style.display = 'block';
    }
  });

  passwordInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      passwordSubmit.click();
    }
  });

  // Carrousel JS pour les bannières
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselImages = carouselTrack ? carouselTrack.querySelectorAll('img') : [];
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentIndex = 0;

  function updateCarousel() {
    carouselImages.forEach((img, i) => {
      img.classList.toggle('active', i === currentIndex);
    });
  }

  if (carouselImages.length) {
    updateCarousel();
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
      updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % carouselImages.length;
      updateCarousel();
    });
  }

  // Carrousel bannière plein écran
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const images = Array.from(carousel.querySelectorAll('.carousel-track img'));
    let current = 0;
    function updateCarousel() {
      images.forEach((img, i) => {
        img.classList.remove('active', 'left', 'right');
        if (i === current) {
          img.classList.add('active');
        } else if (i === (current - 1 + images.length) % images.length) {
          img.classList.add('left');
        } else if (i === (current + 1) % images.length) {
          img.classList.add('right');
        }
      });
    }
    updateCarousel();
    carousel.querySelector('.carousel-btn.prev').onclick = () => {
      current = (current - 1 + images.length) % images.length;
      updateCarousel();
      const btn = carousel.querySelector('.carousel-btn.prev');
      btn.classList.add('animate');
      setTimeout(() => btn.classList.remove('animate'), 350);
    };
    carousel.querySelector('.carousel-btn.next').onclick = () => { 
      current = (current + 1) % images.length;
      updateCarousel();
      const btn = carousel.querySelector('.carousel-btn.next');
      btn.classList.add('animate');
      setTimeout(() => btn.classList.remove('animate'), 350);
    };

    // Animation quand on clique sur une image pour la mettre au premier plan
    images.forEach((img, i) => {
      img.addEventListener('click', (e) => {
        if (!img.classList.contains('active')) {
          // Si c'est l'image de gauche ou de droite, on tourne le carrousel dans la bonne direction
          if (img.classList.contains('left')) {
            current = (current - 1 + images.length) % images.length;
          } else if (img.classList.contains('right')) {
            current = (current + 1) % images.length;
          } else {
            current = i;
          }
          updateCarousel();
          img.classList.add('banner-click-animate');
          setTimeout(() => img.classList.remove('banner-click-animate'), 650);
        } else {
          // Affichage plein écran au clic
          const overlay = document.createElement('div');
          overlay.style.position = 'fixed';
          overlay.style.top = 0;
          overlay.style.left = 0;
          overlay.style.width = '100vw';
          overlay.style.height = '100vh';
          overlay.style.background = 'rgba(10,10,20,0.97)';
          overlay.style.display = 'flex';
          overlay.style.alignItems = 'center';
          overlay.style.justifyContent = 'center';
          overlay.style.zIndex = 9999;
          overlay.style.cursor = 'zoom-out';
          const fullImg = document.createElement('img');
          fullImg.src = img.src;
          fullImg.alt = img.alt;
          fullImg.style.maxWidth = '95vw';
          fullImg.style.maxHeight = '95vh';
          fullImg.style.borderRadius = '18px';
          fullImg.style.boxShadow = '0 0 80px #B388EB77, 0 0 0 8px #181a20';
          overlay.appendChild(fullImg);
          overlay.addEventListener('click', () => overlay.remove());
          document.body.appendChild(overlay);
        }
      });
    });
  }

  // Palette: copier au clic + feedback animé
  document.querySelectorAll('.color-swatch .copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var swatch = btn.closest('.color-swatch');
      var color = swatch.getAttribute('data-color');
      if (!color) return;
      navigator.clipboard.writeText(color);
      swatch.classList.remove('copied');
      void swatch.offsetWidth; // force reflow for animation
      swatch.classList.add('copied');
      setTimeout(function(){
        swatch.classList.remove('copied');
      }, 1200);
    });
  });
});