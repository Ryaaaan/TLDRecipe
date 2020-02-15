$(document).ready(function(){
  tldr.initHighlighter();
  tldr.hideCopyButton();
  tldr.updateDOMFavoriteList();
  tldr.updateDOMNightMode();
  // tldr.isNightModeURL();

  if (iOSDevice) {
    tldr.iosPlayerControls();
  }
});
$(document).on('scroll', function(){
  tldr.hideCopyButton();
});
$(window).on('resize', function(){
  $('body').removeClass('open-nav');
  tldr.activeFilterFinder();
  // tldr.animateChef();
});


// Establish Global Namespace + Variables
window.tldrecipe = window.tldrecipe || {}
var tldr = window.tldrecipe;

// Detect iOS
var iOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Night Mode Check
tldr.hasNightModeClass = function() {
  var hasClass = document.body.classList.contains('night-mode');

  if (hasClass){
    return true
  } else {
    return false
  }
}

tldr.isNightModeURL = function() {
  var url = window.location.href;
  var hasNightMode = url.includes('nm/');

  if (hasNightMode){
    return true
  } else {
    return false
  }
}

tldr.nightModeToggle = function() {
  var isDark = document.body.classList.contains('night-mode');
  var url = window.location.href

  if (isDark){
    var newURL = url.replace('?nightmode=true', '');
  } else {
    var newURL = url + '?nightmode=true'
  }

  window.location = newURL
}




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




$(".close-button-trigger").on("click touch", function() {
  tldr.killNotification();
});




// $(".search-toggle").on("click touch", function() {
//   tldr.openSearch();
//   $('html').removeClass('open-nav');
// });

// Init Search Trigger
tldr.searchTrigger = document.getElementById('search-toggle');
tldr.searchTrigger.addEventListener('click', function() {
    tldr.openSearch();
});
tldr.searchTrigger.addEventListener('touchstart', function() {
    tldr.openSearch();
});


tldr.openSearch = function() {
  var isOpen = $('html').hasClass('searching');
  // var isOpenMobile = $('html').hasClass('searching-mobile');

  if (!isOpen) {
    $('html').addClass('searching');
    $('#search-input').focus();

  } else {
    $('html').removeClass('searching');
  }

  // if (!isOpen && !isOpenMobile) {
  //
  //   if (!iOSDevice) {
  //     $('html').addClass('searching');
  //   } else {
  //     $('html').addClass('searching-mobile');
  //   }
  //
  //   $('#search-input').focus();
  // }
}
// tldr.killSearch = function() {
//   $('html').removeClass('searching');
// }
// $(".search-toggle .close-container").on("click touch", function(e) {
//   tldr.killSearch();
//   e.stopPropagation();
// });

// $(".overlay-mask").on("click touch", function() {
//   $('html').removeClass('searching');
//   $('html').removeClass('open-nav');
// });

tldr.overlayMask = document.getElementById('overlay-mask');
tldr.overlayMask.addEventListener('click', function() {
  $('html').removeClass('searching');
  $('html').removeClass('open-nav');
});
tldr.overlayMask.addEventListener('touchstart', function() {
  $('html').removeClass('searching');
  $('html').removeClass('open-nav');
});


// Navigation
$('.menu-toggle').on('click touch', function(){
  tldr.openSettings();
});

tldr.menuTrigger = document.getElementById('menu-toggle');
tldr.menuTrigger.addEventListener('click', function() {
  tldr.openSettings();
});
tldr.menuTrigger.addEventListener('touchstart', function() {
  tldr.openSettings();
});

tldr.openSettings = function() {
  var isOpen = $('html').hasClass('open-nav');

  if (isOpen) {
    $('html').removeClass('open-nav');
  } else {
    $('html').addClass('open-nav');
  }
}





$("#search-input").keyup(function() {
  var charCount = this.value.length;
  tldr.isSearchingTrigger(charCount);
});

tldr.isSearchingTrigger = function(charCount) {
  if (charCount > 0) {
    $('html').addClass('typing');
  } else {
    $('html').removeClass('typing');
  }
}



// Smooth Scroll Copy Pasta
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
  // On-page links
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 500, function() {});
    }
  }
});
