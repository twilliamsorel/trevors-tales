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