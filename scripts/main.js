$(document).ready(function(){
  tldr.animateChef();
  tldr.initHighlighter();
  tldr.hideCopyButton();
  tldr.generateEmoji();
  tldr.updateDOMFavoriteList();

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
  tldr.animateChef();
});


// Establish Global Namespace + Variables
window.tldrecipe = window.tldrecipe || {}
var tldr = window.tldrecipe;

// Detect iOS
var iOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

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
  tldr.toggleSearch();
});


tldr.openMobileNav = function() {
  var isOpen = $('body').hasClass('open-nav');

  if (isOpen) {
    $('body').removeClass('open-nav');
  } else {
    $('body').addClass('open-nav');
  }
}

tldr.toggleSearch = function() {
  var isOpen = $('html').hasClass('searching');

  if (isOpen) {
    $('html').removeClass('searching');
    $('site-title').css('display', 'block');
    $('.search-toggle').addClass('search-icon');
  } else {
    $('html').addClass('searching');
    setTimeout(function(){
      $('site-title').css('display', 'none');
    }, 175)
    $('.search-toggle').removeClass('search-icon');
    $('#search-input').focus();
  }
}



tldr.animateChef = function() {
  var teleported = $('header').hasClass('slide-down');
  // console.log(isOpen)

  if ($(window).width() <= 719) {
    if (!teleported) {
      $('header').addClass('slide-down');
      setTimeout(function(){
        // $('header').addClass('centered-chef');
      }, 125)
    }
  } else {
    $('header').removeClass('slide-down');
  }
}


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
// Recipe Functionality
//
tldr.toggleList = function(item) {
  $(item).toggleClass('toggled');
}

$('.show-nav').on('click touch', function(){
  tldr.showNav();
});

tldr.showNav = function() {
  var body = document.getElementsByClassName('recipe-book')[0];
  var isOpen = body.classList.contains('open-book');

  if (isOpen) {
    body.classList.remove('open-book')
  } else {
    body.classList.add('open-book');
  }
}




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

  if (videoPage) {
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


tldr.generateEmoji = function() {
  // Wiki Reference for supported emojis https://en.wikipedia.org/wiki/Emoji
  // Preview twemoji for source and samples https://github.com/twitter/twemoji/blob/master/src/test/preview.html

  var needsMedia = document.getElementsByClassName('coming-soon').length > 0;

  // if (needsMedia) {
    var footnote = document.getElementById('footnote');

    var food = ["\u{1F330}", "\u{1F331}", "\u{1F332}", "\u{1F333}", "\u{1F334}", "\u{1F335}", "\u{1F336}", "\u{1F337}", "\u{1F338}", "\u{1F339}", "\u{1F33A}", "\u{1F33B}", "\u{1F33C}", "\u{1F33D}", "\u{1F33E}", "\u{1F33F}", "\u{1F340}", "\u{1F341}", "\u{1F342}", "\u{1F343}", "\u{1F344}", "\u{1F345}", "\u{1F346}", "\u{1F347}", "\u{1F348}", "\u{1F349}", "\u{1F34A}", "\u{1F34B}", "\u{1F34C}", "\u{1F34D}", "\u{1F34E}", "\u{1F34F}", "\u{1F350}", "\u{1F351}", "\u{1F352}", "\u{1F353}", "\u{1F354}", "\u{1F355}", "\u{1F356}", "\u{1F357}", "\u{1F358}", "\u{1F359}", "\u{1F35A}", "\u{1F35B}", "\u{1F35C}", "\u{1F35D}", "\u{1F35E}", "\u{1F35F}", "\u{1F360}", "\u{1F361}", "\u{1F362}", "\u{1F363}", "\u{1F364}", "\u{1F365}", "\u{1F366}", "\u{1F367}", "\u{1F368}", "\u{1F369}", "\u{1F36A}", "\u{1F36B}", "\u{1F36C}", "\u{1F36D}", "\u{1F36E}", "\u{1F36F}", "\u{1F370}", "\u{1F371}", "\u{1F372}", "\u{1F373}", "\u{1F374}", "\u{1F375}", "\u{1F376}", "\u{1F377}", "\u{1F378}", "\u{1F379}", "\u{1F37A}", "\u{1F37B}", "\u{1F37C}", "\u{1F37D}", "\u{1F37E}", "\u{1F37F}"]

    var randomFood = food[Math.floor(Math.random()*food.length)];
    footnote.textContent = 'Made with ' + randomFood + 'in PA';
  // }

  // https://github.com/twitter/twemoji
  twemoji.parse(document.body, {"size":72});

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

  // Dont click through to link
  // event.preventDefault();
});


tldr.checkLocalStorage = function(clickedRecipe, listName) {
  var checkList = JSON.parse(localStorage.getItem(listName));

  if (checkList == null) {
   // no data on this thing - lets set one
   tldr.setLocalStorage(clickedRecipe, listName);
  } else {
    // update existing data
    tldr.updateLocalStorage(clickedRecipe, listName);
  }
}

tldr.setLocalStorage = function(clickedRecipe, listName) {
  // define clicked favorite and list
  var favList = []
  var fav = clickedRecipe.dataset.favorite;
  favList.push(fav);
  // init favorite list
  localStorage.setItem(listName, JSON.stringify(favList));
  tldr.updateDOMFavoriteList();
}

tldr.updateLocalStorage = function(clickedRecipe, listName) {
  var fav = clickedRecipe.dataset.favorite;
  var currentList = JSON.parse(localStorage.getItem(listName));

  // look for duplicates
  // var splitFavorites = currentList.split(',');
  var hasFavorite = currentList.includes(fav);

  // if already favorited
  if (hasFavorite) {
    // find index of favorite and remove it
    var index = currentList.indexOf(fav);
    currentList.splice(index, 1);
    // update list after favorite removal
    localStorage.setItem(listName, JSON.stringify(currentList));
    tldr.updateDOMFavoriteList();
  } else {
    // set favorite
    currentList.push(fav)
    localStorage.setItem(listName, JSON.stringify(currentList));
    tldr.updateDOMFavoriteList();
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




$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
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
