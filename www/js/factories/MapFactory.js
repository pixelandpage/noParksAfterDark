angular.module('noParks.factories', [])

.factory('MapFactory', ["$cordovaGeolocation",
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

        var lat, long;//redundent?

        function createMap() {
            return $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                return {
                    center: {
                        lat: lat,
                        lng: long
                    },
                    zoom: 16
                };
            });
        }

var icon = new H.map.Icon('./img/marker.png');

function map(){
      createMap().then((data) => {
              var map = new H.Map(document.getElementById('mapContainer'), maptypes.normal.map, data);
              var marker = new H.map.Marker({lat:lat,lng:long},{ icon: icon });
              map.addObject(marker);
                        var ui = H.ui.UI.createDefault(map, maptypes);
                        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
                                      return map;
                                  });
                                }
 var maps = map();
    return map;
}
]);
