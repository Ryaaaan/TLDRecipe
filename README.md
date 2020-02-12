# TLDRecipe
---
All recipes. No bullshit.

Site built using [Jekyll RB](https://jekyllrb.com/) + [GitHub Pages](https://pages.github.com/).


### Todo Items:
- [ ] Write real README
- [ ] Test Firefox
- [ ] Test Safari
- [ ] Test IE (latest)
- [ ] Add Watch to `gulp.js` on JS file changes (and others?)
- [ ] Add dark mode cookie
- [ ] Full Nutrition List (beyond MVP)
- [ ] A working HTML 5 Video Player (across all devices / platforms)
- [ ] Close Search button click area is funky - needs updated
- [ ] Clean up JS (remove jQuery)
- [ ] Hover interactions for Search / Menu Buttons
- [ ] Add custom color picker with `cookies.js` and `var(color)`
- [x] Add Minify / Uglify JS Functionality


---
## Local Dev
### PC
- Make sure local environment is set to `development` by running `set JEKYLL_ENV=development`

More information on Jekyll Environments can be found [here](https://jekyllrb.com/docs/configuration/environments/)

---
## Production
### PC
- Run project as production to minify / uglify scripts `set JEKYLL_ENV=production`
- Build project `jekyll build`
- Alternatively, run the project `bundle exec jekyll serve`

More information on Jekyll Environments can be found [here](https://jekyllrb.com/docs/configuration/environments/)


---
## Web Scrapers

## Allrecipes
Scrape up recipes at the page level:
```javascript
// Grab Ingredients.
var ingredients = document.getElementsByClassName('recipe-ingred_txt');

for (var i = 0; i < ingredients.length; i++) {
    var ingredient = ingredients[i].innerHTML;
    console.log(ingredient);
}
```

Scrape up instructions at the page level:

```javascript
// Grab Instructions.
var instructions = document.getElementsByClassName('recipe-directions__list--item');

for (var i = 0; i < instructions.length; i++) {
    // Check for empty/hidden NG class
    var hasNG = instructions[i].classList.contains('ng-binding');

    if (!hasNG) {
        var instruction = instructions[i].innerHTML;
        console.log(instruction);
    }
}
```

Macro scraping at page level:
```javascript
var calories = document.querySelectorAll('[itemprop="calories"]')[0];
var fatContent = document.querySelectorAll('[itemprop="fatContent"]')[0];
var carbohydrateContent = document.querySelectorAll('[itemprop="carbohydrateContent"]')[0];
var proteinContent = document.querySelectorAll('[itemprop="proteinContent"]')[0];
var cholesterolContent = document.querySelectorAll('[itemprop="cholesterolContent"]')[0];
var sodiumContent = document.querySelectorAll('[itemprop="sodiumContent"]')[0];
```
