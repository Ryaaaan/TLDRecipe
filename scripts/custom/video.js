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
