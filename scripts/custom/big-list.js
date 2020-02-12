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
