// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


var map, marker;

function initializeMap(location){

   console.log(location);

   var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

   var mapsOptions = {
      center: currentLocation,
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), mapsOptions);

  marker = new google.maps.Marker({
     position: currentLocation,
     map: map
 });

  function createInfoWindow(text){
      var infowindow = new google.maps.InfoWindow({
        content: text
    });
      return infowindow;
  }
  
var rightlick = google.maps.event.addListener(map, "rightclick", function(event) {
   console.log("rightclick")
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
 
    // populate yor box/field with lat, lng
    // alert("Lat=" + lat + "; Lng=" + lng);
    new google.maps.Marker({
       position: event.latLng,
       map: map,
       icon: {
          url: '/assets/homeless.png',
          scaledSize: new google.maps.Size(50, 50)
        }
   });

    $.ajax({
          url: '/map',
          method: 'POST',
          dataType: "json",
          data: { 
            x: location.coords.latitude,
            y: location.coords.longitude
          }
      });
});


  var info = createInfoWindow(document.getElementById("homeless_marker"));

  google.maps.event.addListener(marker, 'click',function() {
          info.open(map,marker);
  });


  $('#add_marker').fadeIn().click(function(event){
      console.log("location:",location);
      $.ajax({
          url: '/map',
          method: 'POST',
          dataType: "json",
          data: { 
            x: location.coords.latitude,
            y: location.coords.longitude
          },
          success: function(data){
            marker.setIcon({
              url: '/assets/homeless.png',
              scaledSize: new google.maps.Size(50, 50)
            });
          },
      });
  });
}

$(document).ready(function(){
    navigator.geolocation.getCurrentPosition(initializeMap);
  });


    