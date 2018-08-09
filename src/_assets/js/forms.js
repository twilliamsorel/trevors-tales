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

      console.log(data);

      postAJAX(action, data, function () {
        if (redirect) 
          window.location = redirect;
      });

      form.reset();
    });
  });
}());