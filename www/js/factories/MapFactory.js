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
        function addRoute(map){
                 var w1 ='51.5174784,-0.0734599'
  var w2 = '51.52172,-0.02673'

function calculateRouteFromAtoB (platform) {
  var router = platform.getRoutingService(),
    routeRequestParams = {
      mode: 'shortest;publicTransport;park:-1',
      avoidTransportTypes: 'railMetro',
      representation: 'display',
      waypoint0:  w1, // St Paul's Cathedral
      waypoint1: w2,  // Tate Modern
      routeattributes: 'waypoints,summary,shape,legs',
      maneuverattributes: 'direction,action'
    };

  router.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError
  );
}



function onSuccess(result) {
  // routePoints(result);
console.log(result);
  routeInstructions(result);

}

function routePoints(result) {
  console.log(result);
  var route = result.response.route[0];
console.log(route);
  addRouteShapeToMap(route);
  addManueversToMap(route);
};

function routeInstructions(result){
    var route = result.response.route[0];
    addWaypointsToPanel(route.waypoint);
  addManueversToPanel(route);
  addSummaryToPanel(route.summary);
}


function onError(error) {
  alert('Ooops!');
}







// var bubble;

//  function openBubble(position, text){
//  if(!bubble){
//     bubble =  new H.ui.InfoBubble(
//       position,
//       {content: text});
//     ui.addBubble(bubble);
//   } else {
//     bubble.setPosition(position);
//     bubble.setContent(text);
//     bubble.open();
//   }
// }


// function addRouteShapeToMap(route){
//   var strip = new H.geo.Strip(),
//     routeShape = route.shape,
//     polyline;

//   routeShape.forEach(function(point) {
//     var parts = point.split(',');
//     strip.pushLatLngAlt(parts[0], parts[1]);
//   });

//   polyline = new H.map.Polyline(strip, {
//     style: {
//       lineWidth: 4,
//       strokeColor: 'rgba(0, 128, 255, 0.7)'
//     }
//   });
//   // map.addObject(polyline);
//   map.setViewBounds(polyline.getBounds(), true);
// }


// function addManueversToMap(route){
//   var svgMarkup = '<svg width="18" height="18" ' +
//     'xmlns="http://www.w3.org/2000/svg">' +
//     '<circle cx="8" cy="8" r="8" ' +
//       'fill="#1b468d" stroke="white" stroke-width="1"  />' +
//     '</svg>',
//     dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
//     group = new  H.map.Group(),
//     i,
//     j;

//     for (i = 0;  i < route.leg.length; i += 1) {
//     for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
//       maneuver = route.leg[i].maneuver[j];
//       var marker =  new H.map.Marker({
//         lat: maneuver.position.latitude,
//         lng: maneuver.position.longitude} ,
//         {icon: dotIcon});
//       marker.instruction = maneuver.instruction;
//       group.addObject(marker);
//     }
//   }

//   group.addEventListener('tap', function (evt) {
//     map.setCenter(evt.target.getPosition());
//     openBubble(
//        evt.target.getPosition(), evt.target.instruction);
//   }, false);

//   map.addObject(group);
// }

 function addWaypointsToPanel(waypoints){

  var nodeH3 = document.createElement('h3'),
    waypointLabels = [],
    i;


   for (i = 0;  i < waypoints.length; i += 1) {
    waypointLabels.push(waypoints[i].label)
   }

   nodeH3.textContent = waypointLabels.join(' - ');

  routeInstructionsContainer.innerHTML = '';
  routeInstructionsContainer.appendChild(nodeH3);
}


function addSummaryToPanel(summary){
  var summaryDiv = document.createElement('div'),
   content = '';
   content += '<b>Total distance</b>: ' + summary.distance  + 'm. <br/>';
   content += '<b>Travel Time</b>: ' + summary.travelTime.toMMSS() + ' (in current traffic)';


  summaryDiv.style.fontSize = 'small';
    summaryDiv.style.marginLeft ='5%';
  summaryDiv.style.marginRight ='5%';
  summaryDiv.innerHTML = content;
  routeInstructionsContainer.appendChild(summaryDiv);
}


function addManueversToPanel(route){



  var nodeOL = document.createElement('ol'),
    i,
    j;

  nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft ='5%';
  nodeOL.style.marginRight ='5%';
  nodeOL.className = 'directions';

     // Add a marker for each maneuver
  for (i = 0;  i < route.leg.length; i += 1) {
    for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
      // Get the next maneuver.
      maneuver = route.leg[i].maneuver[j];

      var li = document.createElement('li'),
        spanArrow = document.createElement('span'),
        spanInstruction = document.createElement('span');

      spanArrow.className = 'arrow '  + maneuver.action;
      spanInstruction.innerHTML = maneuver.instruction;
      li.appendChild(spanArrow);
      li.appendChild(spanInstruction);

      nodeOL.appendChild(li);
    }
  }

  routeInstructionsContainer.appendChild(nodeOL);
}


Number.prototype.toMMSS = function () {
  return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
}

// Now use the map as required...
calculateRouteFromAtoB (platform);
  };


      var map = getWeatherLocation().then((data) => {
                                      console.log(data);
               var map = new H.Map(mapContainer, maptypes.normal.map, data);
                        var ui = H.ui.UI.createDefault(map, maptypes);
                        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
                                      return map;
                                  })


addRoute(map);

 return map;
    }
]);