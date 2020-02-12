//
// Notificaiton Functionality
//
var notificationTimeout;

tldr.popNotification = function() {
  tldr.killNotification();
  $('html').addClass('open-notification');

  // Set timeOut
  notificationTimeout = setTimeout(function(){ $('html').removeClass('open-notification');}, 2500);
}
tldr.killNotification = function() {
  tldr.killNotificationTimeout();
  $('html').removeClass('open-notification');
}
tldr.killNotificationTimeout = function() {
  clearTimeout(notificationTimeout);
}
