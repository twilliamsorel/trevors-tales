//= require ./polyfills.js
//= require ./storynav.js
//= require ./bookmarks.js
//= require ./mobilenav.js
//= require ./forms.js
//= require ./suggestion-tracker.js

if (window.netlifyIdentity) {
	window.netlifyIdentity.on("init", function (user) {
		if (!user) {
			window.netlifyIdentity.on("login",  function () {
				document.location.href = "/admin/";
			});
		}	
	});
}
