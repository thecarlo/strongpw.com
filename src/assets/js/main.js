$(function () {
  if (!window.location.host.startsWith("localhost")) {
    if (!window.location.host.startsWith("www")) {
      window.location = window.location.protocol + "//" + "www." + window.location.host + window.location.pathname;
    }
  }
  

  $('[data-toggle="tooltip"]').tooltip();
})