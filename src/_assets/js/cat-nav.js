(function () {
  var categoryNav = document.querySelector('.category-nav');
  if (categoryNav) {
    var categoryButtons = Array.from(document.querySelectorAll('[data-category-button]'));
    var categoryAnchors = Array.from(document.querySelectorAll('[data-category-anchor]'));
    var currentlyActive = categoryButtons[0];

    function triggerActive (target) {
      currentlyActive.classList.remove('active');
      target.classList.add('active');
      currentlyActive = target;
    };

    categoryNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        triggerActive(e.target);
      }
    }, true);

    window.addEventListener('scroll', function (e) {
      categoryAnchors.forEach(function (anchor, i) {
        if (anchor.getBoundingClientRect().top < 100) {
          triggerActive(categoryButtons[i])
        }
      });
    });
  }
}());