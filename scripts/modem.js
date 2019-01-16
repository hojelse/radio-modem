//pseudocode marked with triple slashes "///"

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
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //parse JSON to javascript objects
      var response = JSON.parse(xhttp.responseText);
      
      //arrays of html elements
      var episodes = document.getElementsByClassName("episode");
      var episodeTitles = document.getElementsByClassName("episode-title");
      var episodeImages = document.getElementsByClassName("episode-image");
      var episodeMetas = document.getElementsByClassName("episode-meta");

      ///get episode descriptions (Don't know how, do you have to webscrape?)

      for(var i = 0; i < episodes.length; i++) {
        //loop through and trim off everything before the double slash, example string: "The DNA podcast S3 #02 // Old Vs. New (SWU)"
        var paragraph = response.data[i].name;
        var regex = /.\/\/./;
        var found = paragraph.match(regex);
        var newEpisodeTitle = paragraph.slice(found.index + 4, paragraph.length);
        episodeTitles[i].innerHTML = newEpisodeTitle;
        //extract season and epsiode number from title
        //extract season
        var regex = /.S[0-9]./;
        var found = paragraph.match(regex);
        var episodeSeason = paragraph.slice(found.index + 2, found.index + 3);
        //extract episode number
        var regex = /.#[0-9]./;
        var found = paragraph.match(regex);
        var episodeNumber = paragraph.slice(found.index + 2, found.index + 4);      
        //update .episode-meta with season and episode number
        episodeMetas[i].innerHTML = "Season " + episodeSeason + " - Episode " + episodeNumber;
        //update .episode-image with image url
        episodeImages[i].style.backgroundImage = "url('"+response.data[i].pictures.large+"')";
      }

      //update iframe of the first episode
      var iframe = document.getElementById("my-widget-iframe");
      iframe.src = "https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&hide_artwork=1&feed=%2FRadioModem%2F"+response.data[0].slug+"%2F";
    }
};
xhttp.open("GET", "https://api.mixcloud.com/radiomodem/cloudcasts/", true);
xhttp.send();

//Mixcloud Widget
var widget = Mixcloud.PlayerWidget(document.getElementById("my-widget-iframe"));
widget.ready.then(function() {
  widget.play();
  widget.pause();
  document.getElementById('togglePlay').onclick = function(){
    widget.togglePlay();
    $('#togglePlay').toggleClass("playing");
    widget.seek(91);
  };
});