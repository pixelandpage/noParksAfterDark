noParks.factory('MapFactory', ["$cordovaGeolocation",
    function($cordovaGeolocation) {
        var app_code = 'pG2gTxRQDbxVAsdDMCN1WA';
        var app_id = 'toJMr8CRe6wBffMtHC4B';

        var platform = new H.service.Platform({
            'app_id': app_id,
            'app_code': app_code
        });

        // var targetElement = document.getElementById('mapContainer');
        // Obtain the default map types from the platform object
        var maptypes = platform.createDefaultLayers();

        // Instantiate (and display) a map object:


        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };


        var watchOptions = {
          timeout : 3000,
          enableHighAccuracy: false // may cause errors if true
        };

        var watch = $cordovaGeolocation.watchPosition(watchOptions);
        watch.then(
          null,
          function(err) {
            // error
          },
          function(position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
        });


        // watch.clearWatch();
        // // OR
        // $cordovaGeolocation.clearWatch(watch)
        //   .then(function(result) {
        //     // success
        //     }, function (error) {
        //     // error
        //   });






        // function moveMap(map) {
        //     map.setCenter(getWeatherLocation());
        //     map.setZoom(14);
        // }



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


        // console.log(getWeatherLocation());


        return getWeatherLocation().then((data) => {
                                      console.log(data);
               var map = new H.Map(mapContainer, maptypes.normal.map, data);
                        var ui = H.ui.UI.createDefault(map, maptypes);
                        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
                                      return map;
                                  });

                // var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        //         map.addEventListener('tap', function(evt) {
        //     console.log(evt.type, evt.currentPointer.type);
        //     moveMap(map);
        //     console.log(moveMap(map))
        //     //event target is the marker itself, group is a parent event target
        //     var bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
        //         // read custom data
        //         content: evt.target.getData()
        //     });
        //     //show info bubble
        //     ui.addBubble(bubble);
        // }, false);
//         var ui = H.ui.UI.createDefault(map, maptypes);



// return map;



        // createMap();

    }
]);
