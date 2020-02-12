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
