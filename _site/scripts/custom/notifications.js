//
// Notificaiton Functionality
//
tldr.notificationTimer;

tldr.popNotification = function() {
  tldr.killNotification();
  $('html').addClass('open-notification');

  // Set timeOut
  tldr.notificationTimer = setTimeout(function(){
    $('html').removeClass('open-notification');
  }, 5000);
}
tldr.killNotification = function() {
  tldr.killNotificationTimeout();
  $('html').removeClass('open-notification');
}
tldr.killNotificationTimeout = function() {
  clearTimeout(tldr.notificationTimer);
}

$(".close-button-trigger").on("click touch", function() {
  tldr.killNotification();
});



//
// More info / Message Functionality
//
tldr.messageTimer;

// Info Toggle Function
tldr.toggleInfo = function() {
  var message = document.getElementById('info-message');
  var isOpen = $('html').hasClass('open-message');

  if (isOpen) {
    $('html').removeClass('open-message');
    tldr.killMessageTimeout();

  } else {
    $('html').addClass('open-message');

    tldr.messageTimer = setTimeout(function(){
      $('html').removeClass('open-message');
    }, 10000);
  }
}

tldr.killMessage = function() {
  tldr.killMessageTimeout();
  $('html').removeClass('open-message');
}
tldr.killMessageTimeout = function() {
  clearTimeout(tldr.messageTimer);
}

// More Info
$("#more-info").on("click touch", function() {
  tldr.toggleInfo();
});
