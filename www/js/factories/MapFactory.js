noParks.factory('MapFactory', ["$cordovaGeolocation", function($cordovaGeolocation){
  var app_code ='pG2gTxRQDbxVAsdDMCN1WA';
   var app_id = 'toJMr8CRe6wBffMtHC4B';

 var platform = new H.service.Platform({
    'app_id': app_id,
    'app_code': app_code
    });

    // var targetElement = document.getElementById('mapContainer');
    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:


  var posOptions = {timeout: 10000, enableHighAccuracy: false};


    // console.log('outside' + lat);
    // console.log('outside' + long);

  // var watchOptions = {
  //   timeout : 3000,
  //   enableHighAccuracy: false // may cause errors if true
  // };
  //
  // var watch = $cordovaGeolocation.watchPosition(watchOptions);
  // watch.then(
  //   null,
  //   function(err) {
  //     // error
  //   },
  //   function(position) {
  //     var lat  = position.coords.latitude;
  //     var long = position.coords.longitude;
  // });


  // watch.clearWatch();
  // // OR
  // $cordovaGeolocation.clearWatch(watch)
  //   .then(function(result) {
  //     // success
  //     }, function (error) {
  //     // error
  //   });

function callGeolocatorLat(){
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
    var lat  = position.coords.latitude;
    console.log(lat);
    return lat;
    // return {'long' : long, 'lat': lat};
  }, function(err) {
    // error
  });
}

function callGeolocatorLong(){
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {

    var long = position.coords.longitude;
    console.log(long);
    return long;
    // return {'long' : long, 'lat': lat};
  }, function(err) {
    // error
  });
}

function createMap(){
  // console.log(long);
  callGeolocatorLat();
  callGeolocatorLong();
    var map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.normal.map,
      {
        zoom: 10,
        center: { lng: long, lat: lat }
        // center: { lng: 25.27, lat: 54.68 } <-- Lithuania Co-ordinates
      });
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      map.addEventListener('tap', function(evt) {
        console.log(evt.type, evt.currentPointer.type);
      });

      var ui = H.ui.UI.createDefault(map, maptypes);

      return map;
    }

  createMap();

}]);
