(function () {
  var suggestionBox = document.querySelector('[data-suggestion-tracker]');

  if (suggestionBox) {
    var trackedItem = suggestionBox.getAttribute('data-suggestion-tracker');
    var close = suggestionBox.querySelector('[data-close-suggestion]');

    console.log(close);

    if (trackedItem === window.location.pathname) {
      localStorage[trackedItem] = true;
    }

    if (!localStorage[trackedItem]) {
      suggestionBox.classList.remove('d-none');
    }

    close.addEventListener('click', function () {
      localStorage[trackedItem] = true;
      suggestionBox.classList.add('d-none');
    });
  }
}());