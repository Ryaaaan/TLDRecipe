# TLDRecipe
---
All recipes. No bullshit.

Site built using [Jekyll RB](https://jekyllrb.com/) + [GitHub Pages](https://pages.github.com/).


### MVP Todo Items:
- [ ] Write real README
- [x] Test Firefox
- [x] Test Safari
- [ ] Test IE (latest)
- [x] Redirect `/recipes` or put something there
- [x] Add Watch to `gulp.js` on JS file changes
- [x] Add dark mode cookie
- [x] Night Mode subdomain to avoid flickering of cookie load?
- [x] Remove video players until fully functional
- [x] Close/Search button click area is funky - needs updated
- [ ] Random Recipe Button
- [x] SEO / Meta details
- [x] Hover interactions for Search / Menu Buttons
- [x] Add Minify / Uglify JS Functionality

### v2 Todo Items:
- [ ] Clean up JS
- [ ] SCSS utilize nesting
- [ ] Organize SCSS by include (typo)
- [ ] Update / Clean up SCSS Color Vars
- [ ] Social Media Presence
- [ ] Randomize Message JS Notification (for copying recipe)
- [ ] A working HTML 5 Video Player (across all devices / platforms)
- [ ] Cookie/Setting turn off notifications (copy)
- [ ] Add custom color picker with `cookies.js` and `var(color)`

### v3 Todo Items:
- [ ] All images are cinemagraphs / custom photography
- [ ] Incorporate Ad's
- [ ] Full Nutrition List (breakdown of macros + vitamins)

---
## Local Dev
### PC
- Make sure local environment is set to `development` by running `set JEKYLL_ENV=development`

More information on Jekyll Environments can be found: [here](https://jekyllrb.com/docs/configuration/environments/)

### Automate Night Mode Post Creation
After making a new post within the `_posts` directory automate the `_posts/nm/` creation with gulp. This uses `gulp-replace` to change lines within the new post. Run:
- `gulp copy-nm-files`

Just look at the file to see how it works dumbass.

More information on Jekyll `_posts` can be found: [here](https://jekyllrb.com/docs/posts/)

---
## Production
### PC
- Run project as production to minify / uglify scripts `set JEKYLL_ENV=production`
- Build project `jekyll build`
- Alternatively, run the project `bundle exec jekyll serve`

More information on Jekyll Environments can be found: [here](https://jekyllrb.com/docs/configuration/environments/)


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
