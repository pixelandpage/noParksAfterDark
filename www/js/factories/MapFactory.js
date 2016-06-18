noParks.factory('MapFactory', ["$cordovaGeolocation", function($cordovaGeolocation){
  var app_code ='pG2gTxRQDbxVAsdDMCN1WA';
  var app_id = 'toJMr8CRe6wBffMtHC4B';

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
  var platform = new H.service.Platform({
    'app_id': app_id,
    'app_code': app_code
    });

    // var targetElement = document.getElementById('mapContainer');
    var maptypes = platform.createDefaultLayers();


      lat  = position.coords.latitude;
      long = position.coords.longitude;
      var mycoords =  {lng:long.toString(), lat:lat.toString()};

      var map = new H.Map(
        document.getElementById('mapContainer'),
        maptypes.normal.map,
        {
          zoom: 10,
          center: mycoords
        });

      // return mycoords;
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      var ui = H.ui.UI.createDefault(map, maptypes);
    }, function(err) {
      // error
    });
    return 'map';



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


}]);
