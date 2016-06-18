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

    var posOptions = {timeout: 10000, enableHighAccuracy: false};

function test(){
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      lat  = position.coords.latitude;
      long = position.coords.longitude;
      return {lng:long.toString(), lat:lat.toString()};
      // console.log(mycoords);
      // return mycoords;
      // return '{ lng: \'25.27\', lat: \'54.68\'}';
    }, function(err) {
      // error
    });
}


// console.log($cordovaGeolocation.getCurrentPosition(posOptions));
// console.log($cordovaGeolocation.getCurrentPosition(posOptions.value));
// console.log($cordovaGeolocation.getCurrentPosition(posOptions.coords));
    mycoords = test();
    console.log(mycoords);
    var map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.normal.map,
      {
        zoom: 10,
        // center: $cordovaGeolocation.getCurrentPosition()
        center: { lng: '0', lat: '0' }
      });

      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // map.addEventListener('tap', function(evt) {
      //   console.log(evt.type, evt.currentPointer.type);
      //   map.setCenter(evt.target.getPosition());
      //   //event target is the marker itself, group is a parent event target
      //   var bubble = new H.ui.InfoBubble(evt.target.getPosition(),{
      //     // read custom data
      //     content: evt.target.getData()
      //     });
      //     //show info bubble
      //     ui.addBubble(bubble);
      //   }, false);
      //     addMarkerToGroup(group, position, inf);

      var ui = H.ui.UI.createDefault(map, maptypes);
          return map;

}]);
