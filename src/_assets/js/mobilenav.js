(function () {
  var mobileButton = document.querySelector('[data-mobile-button]');

  if (mobileButton) {
    var mobileMenu = document.querySelector('[data-mobile-menu]');
    var closeButton = document.querySelector('[data-close-mobile]');
    
    mobileButton.addEventListener('click', function () {
      if (mobileMenu.classList.contains('d-none')) {
        mobileMenu.classList.remove('d-none');
        setTimeout(function () {
          mobileMenu.style.opacity = 1;
        }, 10);
      } else {
        mobileMenu.style.opacity = 0;
        setTimeout(function () {
          mobileMenu.classList.add('d-none');
        }, 400);
      }
    });

    closeButton.addEventListener('click', function () {
      if (!mobileMenu.classList.contains('d-none')) {
        mobileMenu.style.opacity = 0;
        setTimeout(function () {
          mobileMenu.classList.add('d-none');
        }, 400);
      }
    });
  }
}());