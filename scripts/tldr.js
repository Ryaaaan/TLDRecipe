$(document).ready(function(){
  tldr.initHighlighter();
  tldr.hideCopyButton();

  // Launch cookies
  tldr.updateDOMFavoriteList();
  tldr.updateDOMNightMode();

  if (iOSDevice) {
    tldr.iosPlayerControls();
  }
});
$(document).on('scroll', function(){
  tldr.hideCopyButton();
});
$(window).on('resize', function(){
  $('body').removeClass('open-settings');
  tldr.activeFilterFinder();
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






$(".close-button-trigger").on("click touch", function() {
  tldr.killNotification();
});



// Open Search
$(".search-toggle").on("click touch", function() {
  tldr.openSearch();
  $('html').removeClass('open-settings');
});
tldr.openSearch = function() {
  var isOpen = $('html').hasClass('searching');

  if (!isOpen) {
    $('html').addClass('searching');
    $('#search-input').focus();

  } else {
    $('html').removeClass('searching');
  }
}

// Search Input
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


// Open Settings
$('.settings-toggle').on('click touch', function(){
  tldr.openSettings();
});
tldr.openSettings = function() {
  var isOpen = $('html').hasClass('open-settings');

  if (isOpen) {
    $('html').removeClass('open-settings');
  } else {
    $('html').addClass('open-settings');
  }
}

// Overlay Mask Kill Switch
$(".overlay-mask").on("click touch", function() {
  $('html').removeClass('searching');
  $('html').removeClass('open-settings');
});







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

//
// Big List Functionality
//

$('.toggles span').mouseenter(function(){
  // Set Highlighter to Hovered Filter
  tldr.positionHighlighter(this);
});
$('.toggles span').mouseleave(function(){
  // Reset Highlighter to Active Filter
  tldr.activeFilterFinder();
});

$('.toggles span').on('click touch', function(){
  tldr.filterMasterList(this);
});


tldr.initHighlighter = function() {
  var foundFilters = $('.filter-container').length;
  if (foundFilters) {
    // add a slight delay to ensure items
    // have loaded on the page
    setTimeout(function(){
      $('.highlight').css('display', 'block');
      tldr.positionHighlighter(document.getElementById('alpha-toggle'));
    }, 100);
  }
}

tldr.filterMasterList = function(filter) {
  var relatedList = "." + filter.id + "-list";
  var isActive = $(relatedList).hasClass('active-list');

  if (!isActive) {
    $('.post-list').removeClass('active-list');
    $(relatedList).addClass('active-list');

    tldr.toggleActiveFilter(filter);
  }
}

tldr.toggleActiveFilter = function(toggled) {
  var isActive = $(toggled).hasClass('active-filter');

  if (!isActive) {
    $('.toggles span').removeClass('active-filter');
    $(toggled).addClass('active-filter');
  }

  tldr.activeFilterFinder();
}

tldr.activeFilterFinder = function() {
  var foundFilters = $('.filter-container').length;
  if (foundFilters) {
    var activeFilter = document.getElementsByClassName('active-filter')[0];
    tldr.positionHighlighter(activeFilter);
  }
}

tldr.positionHighlighter = function(hovered) {
  // Get Body Left Position (should always be 0)
  var bodyPositionLeft = document.body.getBoundingClientRect().left;
  // Get Body Top Position (should always be 0)
  var bodyPositionTop = document.body.getBoundingClientRect().top;
  // Get Parent Container Left Position
  var parentContainerLeft = document.getElementById('toggle-list').getBoundingClientRect().left;
  // Get Parent Container Top Position
  var parentContainerTop = document.getElementById('toggle-list').getBoundingClientRect().top;
  // Current Hovered Element
  var hoveredElement = document.getElementById(hovered.id);
  // Current Hovered Left Position
  var hoveredPositionLeft = hoveredElement.getBoundingClientRect().left;
  // Current Hovered Top Position
  var hoveredPositionTop = hoveredElement.getBoundingClientRect().top;
  //
  // var hoveredCSS = getComputedStyle(hoveredElement);
  var hoveredPadding = parseInt($(hoveredElement).css('padding-right')) + parseInt($(hoveredElement).css('padding-left'));
  // Current Hovered Width
  var hoveredWidth = hoveredElement.offsetWidth - (hoveredPadding / 2);
  // Calculate Child Left Position within Parent
  var childPositionLeft = (hoveredPositionLeft - bodyPositionLeft) - parentContainerLeft + (hoveredPadding / 4);
  // Calculate Child Top Position within Parent
  var childPositionTop = (hoveredPositionTop) - parentContainerTop + 32;
  // Set Width Accordingly
  $('.highlight').css({'width': hoveredWidth, 'left': childPositionLeft, 'top': childPositionTop});
}

//
// Storing some data
//
$('.favorite-flag').on('click touch', function(){
  var recipe = this.parentNode;
  var listName = 'favorites'

  tldr.checkLocalStorage(recipe, listName);
});

// Set/Update Night Mode Flag
tldr.nmTriggerClicked = function() {

}

// Init NM Trigger
$("#nm-trigger").on("click touch", function() {
  var isDark = tldr.hasNightModeClass();
  var listName = 'night-mode'

  tldr.checkLocalStorage(isDark, listName);
  tldr.nightModeSwitch();
});



tldr.checkLocalStorage = function(newData, listName) {
  var checkList = JSON.parse(localStorage.getItem(listName));

  if (checkList == null) {
   // no data on this thing - lets set one
   tldr.setLocalStorage(newData, listName);
  } else {
    // update existing data
    tldr.updateLocalStorage(newData, listName);
  }
}

tldr.setLocalStorage = function(newData, listName) {
  // define clicked favorite and list
  var dataList = []

  if (listName == 'favorites') {
    var data = newData.dataset.favorite;
    dataList.push(data);
    // init favorite list
    localStorage.setItem(listName, JSON.stringify(dataList));
    // reflect change on DOM once cookie is set
    tldr.updateDOMFavoriteList();
  }

  if (listName == 'night-mode') {
    var data = newData;
    dataList.push(data);
    // init night-mode list
    localStorage.setItem(listName, JSON.stringify(dataList));
    // reflect change on DOM once cookie is set
    tldr.updateDOMNightMode();
  }
}

tldr.updateLocalStorage = function(newData, listName) {
  // Current Cookie Data List
  var currentList = JSON.parse(localStorage.getItem(listName));

  if (listName == 'favorites') {
    // look for duplicates
    var updatedData = newData.dataset.favorite;
    var hasData = currentList.includes(updatedData);

    // if already favorited
    if (hasData) {
      // find index of favorite and remove it
      var index = currentList.indexOf(updatedData);
      currentList.splice(index, 1);
      // update list after favorite removal
      localStorage.setItem(listName, JSON.stringify(currentList));
      tldr.updateDOMFavoriteList();
    } else {
      // set favorite
      currentList.push(updatedData)
      localStorage.setItem(listName, JSON.stringify(currentList));
      tldr.updateDOMFavoriteList();
    }
  }

  if (listName == 'night-mode') {
    // set night mode bool
    currentList = []
    currentList.push(!newData);
    localStorage.setItem(listName, JSON.stringify(currentList));
    tldr.updateDOMNightMode();
  }
}

// show favorites on front-end
tldr.updateDOMFavoriteList = function(listName) {
  var listName = 'favorites'
  // Set Cookie Vars
  var currentList = JSON.parse(localStorage.getItem(listName));

  // if data has been defined
  if (currentList != null) {
    // Resest all favorites on DOM
    var allPossibleFavs = document.querySelectorAll("[data-favorite]");
    for (var x = 0; x < allPossibleFavs.length; x++) {
      allPossibleFavs[x].classList.remove('favorite');
    }

    for (var i = 0; i < currentList.length; i++) {
       var favHTML = document.querySelectorAll("[data-favorite=" + currentList[i] + "]");
       // sometimes theres more than one DOM element matching
       for (var f = 0; f < favHTML.length; f++) {
         favHTML[f].classList.add('favorite');
       }
     }
  }
}

// update night mode settings
tldr.updateDOMNightMode = function(listName) {
  var listName = 'night-mode'
  // Set Cookie Vars
  var currentList = JSON.parse(localStorage.getItem(listName));
  var alreadyNM = tldr.isNightModeURL();

  // if data has been defined
  if (currentList != null) {
    if (currentList[0] && !alreadyNM) {
      // if nm cookie is true and we on a normal page, redirect
      var nmURL = window.location.pathname
      window.location.href = '/nm' + nmURL;
      // history.pushState('', '', '/nm' + nmURL);
    } else if (!currentList[0] && alreadyNM) {
      // if nm cookie is false and we on a nm page, redirect
      var nmURL = window.location.pathname
      var normalURL = nmURL.replace('/nm/', '/');
      window.location.href = normalURL;
      // history.pushState('', '', normalURL);
    }
  }
}


tldr.nightModeSwitch = function() {
  var isNight = $('body').hasClass('night-mode');

  if (!isNight) {
    $('body').addClass('night-mode');
    tldr.swapURLPaths(isNight);
    var nmURL = window.location.pathname
    history.pushState('', '', '/nm' + nmURL);
  } else {
    $('body').removeClass('night-mode');
    tldr.swapURLPaths(isNight);
    var nmURL = window.location.pathname
    history.pushState('', '', '/nm' + nmURL);
  }
}

tldr.swapURLPaths = function(isNight) {
  var anch = document.querySelectorAll('a');

  for (var i = 0; i < anch.length; i++) {
    var host = anch[i].host;
    var url = anch[i].href;
    var targetURL = url.split(host)[1];

    // console.log(url.split(host)[1]);
    // var notRoot = url.contains('/nm/');

    if (isNight) {
      var regURL = url.split('/nm')[1];
      anch[i].href = regURL;
    } else {
      anch[i].href = '/nm' + targetURL;
    }
  }
}




























//

//
// Video Controls
//
var vid = document.getElementById("recipe-video");

$('.play-btn').on('click touch', function(){
  tldr.playVideo();
});
$('.replay-btn').on('click touch', function(){
  tldr.replayVideo();
});
$('.back-btn').on('click touch', function(){
  tldr.skipBack();
});
$('.fwd-btn').on('click touch', function(){
  tldr.skipFwd();
});

tldr.iosPlayerControls = function() {
  var recipePage = window.location.href.includes('recipes');
  var videoPage = document.getElementsByClassName("video-holster")

  if (videoPage.length > 0) {
    videoPage[0].classList.add('ios-controls');
  }
}

tldr.playVideo = function() {
  var controller = document.getElementById('video-controller');
  var playTime = controller.classList.contains('play-video');

  if (playTime) {
    if (iOSDevice) {
      vid.play();
    } else {
      vid.play();
      controller.classList.remove('play-video');
    }
  } else {
    vid.pause();
    controller.classList.add('play-video');
  }
}
tldr.pauseVideo = function() {
  vid.pause();
}
tldr.replayVideo = function() {
  vid.load();
  vid.play();
}
tldr.skipBack = function() {
  var vidCurrentTime = vid.currentTime;
  vid.currentTime = vidCurrentTime - 5;
}
tldr.skipFwd = function() {
  var vidCurrentTime = vid.currentTime;
  vid.currentTime = vidCurrentTime + 5;
}

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
