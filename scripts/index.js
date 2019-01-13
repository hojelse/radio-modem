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
