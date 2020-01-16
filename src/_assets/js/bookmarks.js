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