/* ─────────────────────────────────────────────────────────────
   Angela Read — Portfolio
   script.js  |  tab switching + lightbox
   ───────────────────────────────────────────────────────────── */

var tabButtons = document.querySelectorAll('.tab-btn');
var tabPanels  = document.querySelectorAll('.tab-panel');

function switchTab(tabName) {
  tabButtons.forEach(function (btn) { btn.classList.remove('active'); });
  tabPanels.forEach(function (panel) { panel.classList.remove('active'); });

  var matchingBtn   = document.querySelector('[data-tab="' + tabName + '"]');
  var matchingPanel = document.getElementById('tab-' + tabName);

  if (matchingBtn)   matchingBtn.classList.add('active');
  if (matchingPanel) matchingPanel.classList.add('active');

  // Save the current tab in the URL so the browser remembers it
  history.replaceState(null, '', '?tab=' + tabName);
}

document.addEventListener('DOMContentLoaded', function () {

  // Tab click handler
  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      switchTab(button.dataset.tab);
    });
  });

  // Load the correct tab from the URL on page load
  var params   = new URLSearchParams(window.location.search);
  var tabParam = params.get('tab');
  if (tabParam) {
    switchTab(tabParam);
  }

});

// ─── LIGHTBOX WITH ARROW NAVIGATION ─────────────────────────

var overlay = document.createElement('div');
overlay.id = 'lightbox';
overlay.innerHTML = `
  <span id="lightbox-prev">&#8592;</span>
  <img id="lightbox-img" src="" alt="">
  <span id="lightbox-next">&#8594;</span>
  <span id="lightbox-close">&#10005;</span>
`;
document.body.appendChild(overlay);

var currentImages = [];
var currentIndex  = 0;

// Group images by masonry-grid so each category navigates separately
document.querySelectorAll('.masonry-grid').forEach(function (grid) {
  var images = grid.querySelectorAll('img');

  images.forEach(function (img, index) {
    img.addEventListener('click', function () {
      currentImages = Array.from(images);
      currentIndex  = index;
      showLightbox();
    });
  });
});

function showLightbox() {
  document.getElementById('lightbox-img').src = currentImages[currentIndex].src;
  overlay.classList.add('active');

  // Fade arrows at the start and end of each category
  document.getElementById('lightbox-prev').style.opacity = currentIndex === 0 ? '0.2' : '0.7';
  document.getElementById('lightbox-next').style.opacity = currentIndex === currentImages.length - 1 ? '0.2' : '0.7';
}

// Previous arrow
document.getElementById('lightbox-prev').addEventListener('click', function (e) {
  e.stopPropagation();
  if (currentIndex > 0) {
    currentIndex--;
    showLightbox();
  }
});

// Next arrow — on last image close lightbox and scroll to last image in category
document.getElementById('lightbox-next').addEventListener('click', function (e) {
  e.stopPropagation();
  if (currentIndex < currentImages.length - 1) {
    currentIndex++;
    showLightbox();
  } else {
    overlay.classList.remove('active');
    switchTab('creative');
    currentImages[currentImages.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

// Close when clicking the overlay background
overlay.addEventListener('click', function () {
  overlay.classList.remove('active');
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
  if (!overlay.classList.contains('active')) return;

  if (e.key === 'Escape') {
    overlay.classList.remove('active');
  }

  if (e.key === 'ArrowLeft') {
    if (currentIndex > 0) {
      currentIndex--;
      showLightbox();
    }
  }

  if (e.key === 'ArrowRight') {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
      showLightbox();
    } else {
      overlay.classList.remove('active');
      switchTab('creative');
      currentImages[currentImages.length - 1].scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  }

});

// ─── BACK TO TOP BUTTON ──────────────────────────────────────

var backToTop = document.createElement('button');
backToTop.id = 'back-to-top';
backToTop.innerHTML = '&#8593; Back to top';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', function () {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', function () {
  var activePanel = document.querySelector('.tab-panel.active');
  if (activePanel) {
    activePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

window.addEventListener('scroll', function () {
  var activePanel = document.querySelector('.tab-panel.active');
  var isHiddenTab = activePanel && (activePanel.id === 'tab-home' || activePanel.id === 'tab-about');

  if (window.scrollY > 400 && !isHiddenTab) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});