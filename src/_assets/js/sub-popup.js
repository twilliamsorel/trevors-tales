(function () {
  var popup = document.querySelector('.subscription-modal');
  var close = popup.querySelector('[data-close-popup]');
  
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
}());