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

        function createMap() {

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
                };
            });
        }

//   group.addEventListener('tap', function (evt) {
//     map.setCenter(evt.target.getPosition());
//     openBubble(
//        evt.target.getPosition(), evt.target.instruction);
//   }, false);

//   map.addObject(group);
// }
//

//
//      // Add a marker for each maneuver
//   for (i = 0;  i < route.leg.length; i += 1) {
//     for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
//       // Get the next maneuver.
//       maneuver = route.leg[i].maneuver[j];
//
//       var li = document.createElement('li'),
//         spanArrow = document.createElement('span'),
//         spanInstruction = document.createElement('span');
//
//       spanArrow.className = 'arrow '  + maneuver.action;
//       spanInstruction.innerHTML = maneuver.instruction;
//       li.appendChild(spanArrow);
//       li.appendChild(spanInstruction);
//
//       nodeOL.appendChild(li);
//     }
//   }
//
//   routeInstructionsContainer.appendChild(nodeOL);
// }
//
// Number.prototype.toMMSS = function () {
//   return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
// };
//
// // Now use the map as required...
// calculateRouteFromAtoB (platform);
//   }
function map(){
      createMap().then((data) => {
               var map = new H.Map(mapContainer, maptypes.normal.map, data);
                        var ui = H.ui.UI.createDefault(map, maptypes);
                        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
                                      return map;
                                  });
                                }
// addRoute(map);
// var map = new H.Map(mapContainer,
//  maptypes.normal.map,{
//  center: {lat:52.5160, lng:13.3779},
//  zoom: 13
// });
// var ui = H.ui.UI.createDefault(map, maptypes);
//                   var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
// console.log(map);
 var maps = map();

 return map;
    }
]);
