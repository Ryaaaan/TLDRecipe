$(document).ready(function(){
  // tldr.animateChef();
  tldr.initHighlighter();
  tldr.hideCopyButton();
  // tldr.generateEmoji();
  tldr.updateDOMFavoriteList();
  tldr.sniffURL();

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


// Toggle Night Mode
$(".nm-toggle").on("click touch", function() {
  tldr.nightMode();
});


tldr.nightMode = function() {
  var isDark = document.body.classList.contains('night-mode');

  if (isDark) {
    document.body.classList.remove('night-mode');
  } else {
    document.body.classList.add('night-mode');
  }
}


tldr.sniffURL = function() {
  var url = window.location.href;
  var hasDarkMode = url.includes('darkmode=true');
  var isDark = document.body.classList.contains('night-mode');

  if (hasDarkMode && !isDark){
    tldr.nightMode();
  }
}

tldr.nightModeToggle = function() {
  var isDark = document.body.classList.contains('night-mode');
  var url = window.location.href

  if (isDark){
    var newURL = url.replace('?darkmode=true', '');
  } else {
    var newURL = url + '?darkmode=true'
  }

  window.location = newURL
}



// Navigation
$('.mobile-trigger').on('click touch', function(){
  tldr.openMobileNav();
});

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




$(".search-toggle").on("click touch", function() {
  tldr.openSearch();
});

$(".search-toggle .close-container").on("click touch", function(e) {
  tldr.killSearch();
  e.stopPropagation();
});

$(".overlay-mask").on("click touch", function() {
  tldr.killSearch();
});

tldr.openMobileNav = function() {
  var isOpen = $('body').hasClass('open-nav');

  if (isOpen) {
    $('body').removeClass('open-nav');
  } else {
    $('body').addClass('open-nav');
  }
}

tldr.openSearch = function() {
  var isOpen = $('html').hasClass('searching');
  var isOpenMobile = $('html').hasClass('searching');

  if (!isOpen && !isOpenMobile) {

    if (!iOSDevice) {
      $('html').addClass('searching');
    } else {
      $('html').addClass('searching-mobile');
    }

    setTimeout(function(){
      $('site-title').css('display', 'none');
    }, 175)
    $('.search-toggle').removeClass('search-icon');
    $('#search-input').focus();
  }
}
tldr.killSearch = function() {
  var isOpen = $('html').hasClass('searching');
  var isOpenMobile = $('html').hasClass('searching-mobile');

  if (isOpen || isOpenMobile) {

    if (!iOSDevice) {
      $('html').removeClass('searching');
    } else {
      $('html').removeClass('searching-mobile');
    }

    $('site-title').css('display', 'block');
    $('.search-toggle').addClass('search-icon');
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
