(function () {
<<<<<<< HEAD
  var categoryNav = document.querySelector('.category-nav');
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
=======
	var categoryNav = document.querySelector('.category-nav');
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

>>>>>>> ed672c05e70476dc0a532e84da355f920446c8a3
}());