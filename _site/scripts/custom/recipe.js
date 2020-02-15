//
// Recipe Functionality
//
// Toggle Recipe Items
$(".list li").on("click touch", function() {
  tldr.toggleList(this);
  // tldr.hapticFeedback()
});

// Trigger Copy Functionality
tldr.copyItems = document.getElementById('copyShit');
$('.copy-button').on('click touch', function(){

  if (iOSDevice) {
    tldr.iosCopyToClipboard(tldr.copyItems);
  } else {
    tldr.normalCopyToClipboard(tldr.copyItems);
  }
});


tldr.toggleList = function(item) {
  $(item).toggleClass('toggled');
}

tldr.normalCopyToClipboard = function(el) {
  el.select();
  document.execCommand('copy');

  tldr.popNotification()
  tldr.hideKeyboard();
}

tldr.iosCopyToClipboard = function(el) {
  var oldContentEditable = el.contentEditable,
      oldReadOnly = el.readOnly,
      range = document.createRange();

  el.contentEditable = true;
  el.readOnly = false;
  range.selectNodeContents(el);

  var s = window.getSelection();
  s.removeAllRanges();
  s.addRange(range);

  el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

  el.contentEditable = oldContentEditable;
  el.readOnly = oldReadOnly;

  document.execCommand('copy');

  tldr.popNotification();
  tldr.hideKeyboard();
}

// Hide keyboard when selecting copy
tldr.hideKeyboard = function() {
  document.activeElement.blur();
  $(tldr.copyItems).blur();
  document.documentElement.scrollTop = document.documentElement.scrollTop;
};


tldr.hideCopyButton = function() {

  if($(window).scrollTop() + $(window).height() >= $(document).height() - 125) {
    $(".copy-button").removeClass("hide-it");
  } else if ($(window).scrollTop() > 75 && window.oldScroll < window.scrollY) {
    $(".copy-button").addClass("hide-it");
  } else {
    $(".copy-button").removeClass("hide-it");
  }

  window.oldScroll = window.scrollY;
}
