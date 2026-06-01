/* ─────────────────────────────────────────────────────────────
   Angela Read — Portfolio
   script.js  |  tab switching logic for index.html
   ───────────────────────────────────────────────────────────── */

// Wait until the page has fully loaded before running any code
document.addEventListener('DOMContentLoaded', function () {

  var tabButtons = document.querySelectorAll('.tab-btn');
  var tabPanels  = document.querySelectorAll('.tab-panel');

  function switchTab(tabName) {
    tabButtons.forEach(function (btn) { btn.classList.remove('active'); });
    tabPanels.forEach(function (panel) { panel.classList.remove('active'); });

    var matchingBtn   = document.querySelector('[data-tab="' + tabName + '"]');
    var matchingPanel = document.getElementById('tab-' + tabName);

    if (matchingBtn)   matchingBtn.classList.add('active');
    if (matchingPanel) matchingPanel.classList.add('active');

    // Save the current tab in the URL without reloading the page
    // So when you come back from GitHub or LinkedIn it remembers where you were
    history.replaceState(null, '', '?tab=' + tabName);
  }

  // Tab click handler
  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      switchTab(button.dataset.tab);
    });
  });

  // Check if the URL has ?tab=about or ?tab=ux etc. and load that tab
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

// Group images by their parent masonry-grid so categories stay separate
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

  // Fade prev arrow on first image
  document.getElementById('lightbox-prev').style.opacity = currentIndex === 0 ? '0.2' : '0.7';
  // Fade next arrow on last image
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

// Next arrow — closes lightbox and returns to Creative Work tab on last image
document.getElementById('lightbox-next').addEventListener('click', function (e) {
  e.stopPropagation();
  if (currentIndex < currentImages.length - 1) {
    currentIndex++;
    showLightbox();
  } else {
    overlay.classList.remove('active');
    switchTab('creative');
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
    }
  }
});