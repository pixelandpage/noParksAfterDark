noParks.factory('MapFactory', ["$cordovaGeolocation",
    function($cordovaGeolocation) {
        var app_code = 'pG2gTxRQDbxVAsdDMCN1WA';
        var app_id = 'toJMr8CRe6wBffMtHC4B';

        var platform = new H.service.Platform({
            'app_id': app_id,
            'app_code': app_code
        });

        var maptypes = platform.createDefaultLayers();

        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };

        function getWeatherLocation() {

            return $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                return {
                    center: {
                        lat: lat,
                        lng: long
                    },
                    zoom: 13


                }
            });
        }
//         '
      var map = getWeatherLocation().then((data) => {
                                      console.log(data);
               var map = new H.Map(document.getElementById('mapContainer'), maptypes.normal.map, data);
                        var ui = H.ui.UI.createDefault(map, maptypes);
                        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
                                      return map;
                                  })

// function createMap(){
// var platform = new H.service.Platform({
//   app_id: 'DemoAppId01082013GAL',
//   app_code: 'AJKnXv84fjrb0KIHawS0Tg',
//   useCIT: true,
//   useHTTPS: true
// });

// var defaultLayers = platform.createDefaultLayers();

// var map = new H.Map(
//   document.getElementById('mapContainer'),
//   defaultLayers.normal.map,
//   {
//   zoom: 10,
//   center: { lat: 52.51, lng: 13.4 }
//   });

// var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// var ui = H.ui.UI.createDefault(map, defaultLayers);
// };

// var map = createMap();

 return map;
}
]);