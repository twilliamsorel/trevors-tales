(function () {
  var popup = document.querySelector('.subscription-modal');

  if (popup) {
    var close = popup.querySelector('[data-close-popup]');
    var cta = document.querySelector('[data-cta-marker]');
    
    close.addEventListener('click', function () {
      popup.classList.add('removed');
      localStorage.hideSubscribe = true;
    });

    if (!localStorage.hideSubscribe) {
      setTimeout(function () {
        popup.classList.remove('removed');
        setTimeout(function () {
          popup.style.opacity = '1';
        }, 100);
      }, 90000);
    }

    window.addEventListener('scroll', function () {
      if ((cta.getBoundingClientRect().top - window.innerHeight) < 0 && !localStorage.hideSubscribe) {
        popup.classList.add('removed');
      } else if (!localStorage.hideSubscribe) {
        popup.classList.remove('removed');
      }
    });
  }
}());