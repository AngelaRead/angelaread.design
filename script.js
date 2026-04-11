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

// ─── LIGHTBOX ────────────────────────────────────────────────
// Creates a fullscreen overlay when you click any masonry image

// Create the overlay elements once and add them to the page
var overlay = document.createElement('div');
overlay.id = 'lightbox';
overlay.innerHTML = '<img id="lightbox-img" src="" alt=""><span id="lightbox-close">&#10005;</span>';
document.body.appendChild(overlay);

// When any masonry image is clicked, show it in the overlay
document.querySelectorAll('.masonry-item img').forEach(function (img) {
  img.addEventListener('click', function () {
    document.getElementById('lightbox-img').src = img.src;
    overlay.classList.add('active');
  });
});

// Close when clicking the X button or anywhere on the overlay
overlay.addEventListener('click', function () {
  overlay.classList.remove('active');
});

// Close when pressing Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    overlay.classList.remove('active');
  }
});