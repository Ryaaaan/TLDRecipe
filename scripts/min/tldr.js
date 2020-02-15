$(document).ready(function(){tldr.initHighlighter(),tldr.hideCopyButton(),tldr.updateDOMFavoriteList(),tldr.updateDOMNightMode(),iOSDevice&&tldr.iosPlayerControls()}),$(document).on("scroll",function(){tldr.hideCopyButton()}),$(window).on("resize",function(){$("body").removeClass("open-nav"),tldr.activeFilterFinder()}),window.tldrecipe=window.tldrecipe||{};var notificationTimeout,tldr=window.tldrecipe,iOSDevice=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;tldr.hasNightModeClass=function(){return!!document.body.classList.contains("night-mode")},tldr.isNightModeURL=function(){return!!window.location.href.includes("nm/")},tldr.nightModeToggle=function(){var t=document.body.classList.contains("night-mode"),e=window.location.href;if(t)var i=e.replace("?nightmode=true","");else i=e+"?nightmode=true";window.location=i},$(".list li").on("click touch",function(){tldr.toggleList(this)}),tldr.copyItems=document.getElementById("copyShit"),$(".copy-button").on("click touch",function(){iOSDevice?tldr.iosCopyToClipboard(tldr.copyItems):tldr.normalCopyToClipboard(tldr.copyItems)}),$(".close-button-trigger").on("click touch",function(){tldr.killNotification()}),$(".search-toggle").on("click touch",function(){tldr.openSearch(),$("html").removeClass("open-nav")}),tldr.openSearch=function(){$("html").hasClass("searching")?$("html").removeClass("searching"):($("html").addClass("searching"),$("#search-input").focus())},$("#search-input").keyup(function(){var t=this.value.length;tldr.isSearchingTrigger(t)}),tldr.isSearchingTrigger=function(t){0<t?$("html").addClass("typing"):$("html").removeClass("typing")},$(".settings-toggle").on("click touch",function(){tldr.openSettings()}),tldr.openSettings=function(){$("html").hasClass("open-nav")?$("html").removeClass("open-nav"):$("html").addClass("open-nav")},$(".overlay-mask").on("click touch",function(){$("html").removeClass("searching"),$("html").removeClass("open-nav")}),$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(t){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash);(e=e.length?e:$("[name="+this.hash.slice(1)+"]")).length&&(t.preventDefault(),$("html, body").animate({scrollTop:e.offset().top},500,function(){}))}}),tldr.popNotification=function(){tldr.killNotification(),$("html").addClass("open-notification"),notificationTimeout=setTimeout(function(){$("html").removeClass("open-notification")},2500)},tldr.killNotification=function(){tldr.killNotificationTimeout(),$("html").removeClass("open-notification")},tldr.killNotificationTimeout=function(){clearTimeout(notificationTimeout)},$(".toggles span").mouseenter(function(){tldr.positionHighlighter(this)}),$(".toggles span").mouseleave(function(){tldr.activeFilterFinder()}),$(".toggles span").on("click touch",function(){tldr.filterMasterList(this)}),tldr.initHighlighter=function(){$(".filter-container").length&&setTimeout(function(){$(".highlight").css("display","block"),tldr.positionHighlighter(document.getElementById("alpha-toggle"))},100)},tldr.filterMasterList=function(t){var e="."+t.id+"-list";$(e).hasClass("active-list")||($(".post-list").removeClass("active-list"),$(e).addClass("active-list"),tldr.toggleActiveFilter(t))},tldr.toggleActiveFilter=function(t){$(t).hasClass("active-filter")||($(".toggles span").removeClass("active-filter"),$(t).addClass("active-filter")),tldr.activeFilterFinder()},tldr.activeFilterFinder=function(){if($(".filter-container").length){var t=document.getElementsByClassName("active-filter")[0];tldr.positionHighlighter(t)}},tldr.positionHighlighter=function(t){var e=document.body.getBoundingClientRect().left,i=(document.body.getBoundingClientRect().top,document.getElementById("toggle-list").getBoundingClientRect().left),o=document.getElementById("toggle-list").getBoundingClientRect().top,n=document.getElementById(t.id),l=n.getBoundingClientRect().left,r=n.getBoundingClientRect().top,a=parseInt($(n).css("padding-right"))+parseInt($(n).css("padding-left")),d=n.offsetWidth-a/2,c=l-e-i+a/4,s=r-o+32;$(".highlight").css({width:d,left:c,top:s})},$(".favorite-flag").on("click touch",function(){var t=this.parentNode;tldr.checkLocalStorage(t,"favorites")}),tldr.nmTriggerClicked=function(){var t=tldr.hasNightModeClass();tldr.checkLocalStorage(t,"night-mode")},tldr.nmTrigger=document.getElementById("nm-trigger"),tldr.nmTrigger.addEventListener("click",function(){tldr.nmTriggerClicked()}),tldr.nmTrigger.addEventListener("touchstart",function(){tldr.nmTriggerClicked()}),tldr.checkLocalStorage=function(t,e){null==JSON.parse(localStorage.getItem(e))?tldr.setLocalStorage(t,e):tldr.updateLocalStorage(t,e)},tldr.setLocalStorage=function(t,e){var i=[];if("favorites"==e){var o=t.dataset.favorite;i.push(o),localStorage.setItem(e,JSON.stringify(i)),tldr.updateDOMFavoriteList()}if("night-mode"==e){o=t;i.push(o),localStorage.setItem(e,JSON.stringify(i)),tldr.updateDOMNightMode()}},tldr.updateLocalStorage=function(t,e){var i=JSON.parse(localStorage.getItem(e));if("favorites"==e){var o=t.dataset.favorite;if(i.includes(o)){var n=i.indexOf(o);i.splice(n,1),localStorage.setItem(e,JSON.stringify(i)),tldr.updateDOMFavoriteList()}else i.push(o),localStorage.setItem(e,JSON.stringify(i)),tldr.updateDOMFavoriteList()}"night-mode"==e&&((i=[]).push(!t),localStorage.setItem(e,JSON.stringify(i)),tldr.updateDOMNightMode())},tldr.updateDOMFavoriteList=function(t){var e=JSON.parse(localStorage.getItem("favorites"));if(null!=e){for(var i=document.querySelectorAll("[data-favorite]"),o=0;o<i.length;o++)i[o].classList.remove("favorite");for(var n=0;n<e.length;n++)for(var l=document.querySelectorAll("[data-favorite="+e[n]+"]"),r=0;r<l.length;r++)l[r].classList.add("favorite")}},tldr.updateDOMNightMode=function(t){var e=JSON.parse(localStorage.getItem("night-mode")),i=tldr.isNightModeURL();if(null!=e)if(e[0]&&!i){var o=window.location.pathname;window.location.href="/nm"+o}else if(!e[0]&&i){var n=(o=window.location.pathname).replace("/nm/","/");window.location.href=n}};var vid=document.getElementById("recipe-video");$(".play-btn").on("click touch",function(){tldr.playVideo()}),$(".replay-btn").on("click touch",function(){tldr.replayVideo()}),$(".back-btn").on("click touch",function(){tldr.skipBack()}),$(".fwd-btn").on("click touch",function(){tldr.skipFwd()}),tldr.iosPlayerControls=function(){window.location.href.includes("recipes");var t=document.getElementsByClassName("video-holster");0<t.length&&t[0].classList.add("ios-controls")},tldr.playVideo=function(){var t=document.getElementById("video-controller");t.classList.contains("play-video")?iOSDevice?vid.play():(vid.play(),t.classList.remove("play-video")):(vid.pause(),t.classList.add("play-video"))},tldr.pauseVideo=function(){vid.pause()},tldr.replayVideo=function(){vid.load(),vid.play()},tldr.skipBack=function(){var t=vid.currentTime;vid.currentTime=t-5},tldr.skipFwd=function(){var t=vid.currentTime;vid.currentTime=t+5},tldr.toggleList=function(t){$(t).toggleClass("toggled")},tldr.normalCopyToClipboard=function(t){t.select(),document.execCommand("copy"),tldr.popNotification(),tldr.hideKeyboard()},tldr.iosCopyToClipboard=function(t){var e=t.contentEditable,i=t.readOnly,o=document.createRange();t.contentEditable=!0,t.readOnly=!1,o.selectNodeContents(t);var n=window.getSelection();n.removeAllRanges(),n.addRange(o),t.setSelectionRange(0,999999),t.contentEditable=e,t.readOnly=i,document.execCommand("copy"),tldr.popNotification(),tldr.hideKeyboard()},tldr.hideKeyboard=function(){document.activeElement.blur(),$(tldr.copyItems).blur(),document.documentElement.scrollTop=document.documentElement.scrollTop},tldr.hideCopyButton=function(){!($(window).scrollTop()+$(window).height()>=$(document).height()-125)&&75<$(window).scrollTop()&&window.oldScroll<window.scrollY?$(".copy-button").addClass("hide-it"):$(".copy-button").removeClass("hide-it"),window.oldScroll=window.scrollY};