//
// Big List Functionality
//

$('#custom-trigger').on('click touch', function(){
  tldr.toggleFilters();
});

$('#random-trigger').on('click touch', function(){
  tldr.getRandomRecipe();
});

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

// Go to a random recipe
tldr.getRandomRecipe = function() {
  var anch = document.querySelectorAll('.alpha-toggle-list a');
  var randoList = [];

  for (var i = 0; i < anch.length; i++) {
    var host = anch[i].host;
    var url = anch[i].href;
    var targetURL = url.split(host)[1];
    var isRecipe = targetURL.includes('recipes/')

    if (isRecipe) {
      randoList.push(targetURL);
    }
  }

  var randomLink = randoList[Math.floor(Math.random() * randoList.length)];
  window.location.href = randomLink;
}


// Open / Close List Filters
tldr.toggleFilters = function() {
  var filters = document.getElementById('filter-container');
  var isOpen = filters.classList.contains('open-filters');

  if (isOpen) {
    filters.classList.remove('open-filters');
    filters.style.height = "0px";
  } else {
    filters.classList.add('open-filters');
    tldr.dynamicSizeFilterContainer();
  }
}

// Size Filter Container by px to allow nice css transitions
tldr.dynamicSizeFilterContainer = function() {
  var filters = document.getElementById('filter-container');
  var openFilters = filters.classList.contains('open-filters');
  var listHeight = document.getElementById("toggle-list");
  var totalHeight = listHeight.offsetHeight;

  if (openFilters) {
    filters.style.height = totalHeight + "px";
  }
}

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
  // Add 62px to account for padding of elements in container
  var childPositionTop = (hoveredPositionTop) - parentContainerTop + 62;
  // Set Width Accordingly
  $('.highlight').css({'width': hoveredWidth, 'left': childPositionLeft, 'top': childPositionTop});
}
