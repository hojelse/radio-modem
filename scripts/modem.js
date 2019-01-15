document.getElementById("live").onclick = function(){
  var live = document.getElementById("live");
  var livetext = document.getElementById("live-text");
  var offlinetext = document.getElementById("offline-text");
  var livebeacon = document.getElementById("live-beacon");
  $(live).toggleClass("live-offline")
  $(livetext).toggleClass("live-text-offline");
  $(offlinetext).toggleClass("offline-text");
  $(livebeacon).toggleClass("pulse-offline");
}

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('resize scroll', function() {
  if (mediaquery.matches) {
    $('.episode-title').each(function() {
      var activeEpisode = $(this).attr('id');
      if ($(this).isInViewport()) {
        var activeEpisodes = document.getElementsByClassName('episode-active');
        //var noActiveEpisodes = activeEpisodes.length;
        //if (noActiveEpisodes < 2){
        $('#episode-' + activeEpisode).addClass('episode-active');
        //console.log('#epsiode-' + activeEpisode);
        //}
      } else {
        $('#episode-' + activeEpisode).removeClass('episode-active');
      }
    });
  }
});

var mediaquery = window.matchMedia("(max-width: 600px)");

//Mixcloud API
var widget = Mixcloud.PlayerWidget(document.getElementById("my-widget-iframe"));
widget.ready.then(function() {
  widget.play();
  widget.pause();
  document.getElementById('togglePlay').onclick = function(){
    widget.togglePlay();
    $('#togglePlay').toggleClass("playing");
  };
});