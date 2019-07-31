function getAnchorPositions (anchorArray) {
  return anchorArray.map(function (anchor) {
    return anchor.getBoundingClientRect().top;
  });
};

function getActiveAnchor (anchorPositions) {
  return anchorPositions.filter(function (item) {
    return item <= 300;
  }).length;
};

function getArrayFrom (query) {
  return Array.from(document.querySelectorAll(query));
};

(function () {
  var storyNavWrap = document.querySelector('.component.story-nav');
  var storyNav = document.querySelector('nav.story-nav');

  // triggering sticky story nav
  function triggerStickyNav () {
    if (storyNavWrap.getBoundingClientRect().top <= 57) {
      storyNav.classList.add('fixed');
    } else {
      storyNav.classList.remove('fixed');
    }
  };

  if (storyNavWrap) {
    window.addEventListener('scroll', triggerStickyNav);
    window.addEventListener('load', triggerStickyNav);

    // reading and outputting (initial) pages
    var pages = Array.from(document.querySelectorAll('.story-section')).length;
    document.querySelector('output[data-total-pages]').innerHTML = pages;

    // updating current page on scroll
    function updatePage () {
      var activePage = getActiveAnchor(getAnchorPositions(getArrayFrom('.page-anchor')));
      if (activePage > 0) {
        document.querySelector('output[data-current-page]').innerHTML = activePage;
      } else {
        document.querySelector('output[data-current-page]').innerHTML = 1;
      }
    }

    window.addEventListener('scroll', updatePage);
    window.addEventListener('load', updatePage);
  }
}());