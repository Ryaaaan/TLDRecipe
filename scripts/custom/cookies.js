//
// Storing some data
//
$('.favorite-flag').on('click touch', function(){
  var recipe = this.parentNode;
  var listName = 'favorites'

  tldr.checkLocalStorage(recipe, listName);
});


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
      // window.location.href = '/nm' + nmURL;
      history.pushState('', '', '/nm' + nmURL);
    } else if (!currentList[0] && alreadyNM) {
      // if nm cookie is false and we on a nm page, redirect
      var nmURL = window.location.pathname
      var normalURL = nmURL.replace('/nm/', '/');
      // window.location.href = normalURL;
      history.pushState('', '', normalURL);
    }
  }
}

tldr.forceDOMNightMode = function(listName) {
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
    } else if (!currentList[0] && alreadyNM) {
      // if nm cookie is false and we on a nm page, redirect
      var nmURL = window.location.pathname
      var normalURL = nmURL.replace('/nm/', '/');
      window.location.href = normalURL;
    }
  }
}


tldr.nightModeSwitch = function() {
  var isNight = $('body').hasClass('night-mode');

  if (!isNight) {
    $('body').addClass('night-mode');
    tldr.swapURLPaths(isNight);
  } else {
    $('body').removeClass('night-mode');
    tldr.swapURLPaths(isNight);
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
