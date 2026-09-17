(function () {
  var RECIPIENT = "borisroduner@bluewin.ch";
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.elements["name"].value.trim();
    var email = form.elements["email"].value.trim();
    var message = form.elements["message"].value.trim();

    var subject = "Kontaktanfrage von " + name + " über wildeecken.ch";
    var body =
      "Name: " + name + "\n" +
      "E-Mail: " + email + "\n\n" +
      message;

    var mailtoUrl =
      "mailto:" + encodeURIComponent(RECIPIENT) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailtoUrl;
  });
})();
