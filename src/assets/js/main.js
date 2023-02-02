(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

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

function executePages () {
  // reading and outputting (initial) pages
  var pages = Array.from(document.querySelectorAll('.story-section.page')).length;
  document.querySelector('output[data-total-pages]').innerHTML = pages || 1;

  // updating current page on scroll
  function updatePage () {
    var activePage = getActiveAnchor(getAnchorPositions(getArrayFrom('.page-anchor.indexed')));
    if (activePage > 0) {
      document.querySelector('output[data-current-page]').innerHTML = activePage;
    } else {
      document.querySelector('output[data-current-page]').innerHTML = 1;
    }
  }

  window.addEventListener('scroll', updatePage);
  window.addEventListener('load', updatePage);
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

    if (document.querySelector('output[data-total-pages]')) {
      executePages();
    }
  }
}());

// SHOW/HIDE BOOKMARKS BAR
var bookmarkEvent = new CustomEvent("bookmarkEvent");

(function () {
  var bookmarkBar = document.querySelector('.bookmarks .bar');

  if (bookmarkBar) {
    // SHOW BOOKMARK ON PAGELOAD
    function revealBookmarks () {
      if (localStorage.bookmarks) {
        if (JSON.parse(localStorage.bookmarks).length > 0) {
          bookmarkBar.parentElement.classList.remove('removed');
        } else {
          bookmarkBar.parentElement.classList.add('removed');
        }
      }
    };
    revealBookmarks();

    // SHOW BOOKMARK ON ADDITION
    window.addEventListener('bookmarkEvent', revealBookmarks);

    // SHOW/HIDE BOOKMARKS
    var plus = document.querySelector('.fa-plus');
    bookmarkBar.addEventListener('click', function () {
      if (bookmarkBar.parentElement.classList.contains('expanded')) {
        bookmarkBar.parentElement.classList.remove('expanded');
        plus.style.transform = 'rotate(0deg)';
      } else {
        bookmarkBar.parentElement.classList.add('expanded');
        plus.style.transform = 'rotate(45deg)';
      }
    });
  }
}());

// COLLECT/SET BOOKMARKS
(function () {
  var storyBar = document.querySelector('nav.story-nav');

  if (storyBar) {
    var bookmarkButton = storyBar.querySelector('.bookmark-button');
    var data;

    bookmarkButton.addEventListener('click', function () {
      var currentPage = document.querySelector('[data-current-page]') ? document.querySelector('[data-current-page]').innerHTML : 1;
      var totalPages = document.querySelector('[data-total-pages]')? document.querySelector('[data-total-pages]').innerHTML : 1;
      var title = document.querySelector('.story-title').innerHTML;
      var url = window.location.pathname + '#page-' + currentPage;

      if (localStorage.bookmarks) {
        data = JSON.parse(localStorage.bookmarks);
      } else {
        data = [];
      }

      if (data.findIndex(function (obj) { return obj.url === url }) < 0) {
        data.push({'title': title, 'currentPage': currentPage, 'totalPages': totalPages, 'url': url });

        localStorage.bookmarks = JSON.stringify(data);

        // create and dispatch the event
        window.dispatchEvent(bookmarkEvent);
      }
    });
  }
}());

(function () {
  // POPULATE BOOKMARKS
  function removeBookmarks () {
    var bookmarks = Array.from(document.querySelectorAll('.bookmarks .content .bookmark'));
    bookmarks.forEach(function (item) {
      item.remove();
    });
  };

  function populateMarks () {
    var data = JSON.parse(localStorage.bookmarks);
    var template = document.querySelector('#bookmark');
    var contentWrap = document.querySelector('.bookmarks .content');

    removeBookmarks();

    data.forEach(function (mark) {
      var fragment = template.content.cloneNode(true);
      fragment.querySelector('[data-link]').href = mark.url;
      fragment.querySelector('[data-link]').setAttribute('data-link', mark.url);
      fragment.querySelector('[data-title]').innerHTML = mark.title;
      fragment.querySelector('[data-current-page]').innerHTML = mark.currentPage;
      fragment.querySelector('[data-total-pages]').innerHTML = mark.totalPages;
      
      contentWrap.appendChild(fragment);
    });

    runDeleteBind();
  };

  if (localStorage.bookmarks) {
    populateMarks();
  }

  window.addEventListener('bookmarkEvent', populateMarks);

  // REMOVE BOOKMARKS
  function runDeleteBind () {
    var bookmarks = Array.from(document.querySelectorAll('.bookmarks .content .bookmark'));
    if (localStorage.bookmarks) {
      var data = JSON.parse(localStorage.bookmarks);
    } else {
      return;
    }
    bookmarks.forEach(function (mark) {
      var remove = mark.querySelector('.remove');
      remove.addEventListener('click', function () {
        data.splice(data.findIndex(function (obj) {
          return obj.url === mark.querySelector('[data-link]').getAttribute('data-link');
        }), 1);

        localStorage.bookmarks = JSON.stringify(data);

        window.dispatchEvent(bookmarkEvent);
      });
    });
  };

  runDeleteBind();
}());

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

// BIND CUSTOM ERROR MESSAGES
document.addEventListener("DOMContentLoaded", function() {
  var elements = Array.from(document.querySelectorAll("[required]"));

  elements.forEach(function (input) {
    var customMesage = input.getAttribute('data-error');
    if (customMesage) {
      input.oninvalid = function(e) {
        e.target.setCustomValidity("");
        if (!e.target.validity.valid) {
            e.target.setCustomValidity(customMesage);
        }
      };
      input.oninput = function(e) {
        e.target.setCustomValidity("");
      };
    }
  });
});

// SERIALIZE FORM FIELDS
function serialize (form) {
  let output = "";
  let inputs = Array.from(form.querySelectorAll('[name]'));

  for (let each in inputs) {
    if (each > 0) {
      output += '&' + inputs[each].name + "=" + inputs[each].value;
    } else {
      output += '?' + inputs[each].name + "=" + inputs[each].value;
    }
  }
  return output;
};

// POST FORM TO URL
function postAJAX (url, data, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      if (callback)
        callback(this.response);
    }
  }
  xhr.open("POST", url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(data); 
};

(function () {
  var forms = Array.from(document.querySelectorAll('form'));

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = serialize(form);
      var action = form.getAttribute('action');
      var redirect = form.getAttribute('data-redirect');
      var async = form.getAttribute('data-async-thanks');
      var container = form.parentElement;

      if (async) {
        container.innerHTML = "loading...";
      }

      postAJAX(action, data, function (res) {
        if (JSON.parse(res).status === 'success') {
          if (redirect) 
            window.location = redirect;
          else if (async) {
            container.innerHTML = "<h3>success</h3><br>Thanks for joining the mailing list! Look out for updates and stories in your inbox.";
            localStorage.hideSubscribe = true;
          }
        } else {
          container.innerHTML = "Something went wrong with the request. Please try again on a stable internet connection."
        }
        if (container.classList.contains('subscription-modal')) {
          setTimeout(function () {
            container.classList.add('removed');
          }, 3000);
        }
      });

      form.reset();
    });
  });
}());

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