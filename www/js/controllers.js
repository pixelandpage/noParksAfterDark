angular.module('noParks.controllers', [])

.controller('MapController', ['MapFactory','$scope','$http', 'routeGeneratorService', function( $scope, MapFactory, $http, routeGeneratorService) {
  console.log('calling noParks controller');
    var self = this;

  self.hello = "Hello World";


  self.currentRequest = [];

  self.routeGenerator = function(userInput){
    console.log('calling route')
    routeGeneratorService.getLocation(userInput)
    .then(function(response){
      // console.log(response);
      self.currentRequest.push(response);
});
}
    }])


.controller('DashCtrl', function($scope) { //links to Ionic
var deploy = new Ionic.Deploy();

  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    deploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      console.log('Ionic Deploy: Progress... ', prog);
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
  };
});

// noParks.controller('RouteRequestController', ['$scope','$http', 'routeGeneratorService',  function($scope, $http, routeGeneratorService){
//   var self = this;

//   self.currentRequest = [];

//   $scope.routeGenerator = function(userInput){

//     routeGeneratorService.getLocation(userInput)
//     .then(function(response){
//       console.log(response);
//       self.currentRequest.push(response);
//     });
//   };
// }]);

noParks.service('routeGeneratorService', ['$http', 'MapFactory', function($http, MapFactory) {
  var self = this;

//how a call would look like in full
//https://no-parks-after-dark-backend.herokuapp.com/route/api/?endtext=50%20commercial%20street%20london&starttext=100%20shoreditch%20high%20street%20london
// https://no-parks-after-dark-backend.herokuapp.com/route/api/
// ?endtext=50%20commercial%20street%20london&starttext=100%20shoreditch%20high%20street%20london&type=pedestrian&nightmode=park:-1,tunnel:-1
console.log(mapContainer);
  self.getLocation= function(userInputLocation) {
    var location = userInputLocation;
    console.log(location);
    var extraparams = '&nightmode=park:-1,tunnel:-1'
    var url = "https://no-parks-after-dark-backend.herokuapp.com/route/api/?" + location + extraparams;
    var data = JSON.stringify(location);
    var headers = { headers: { 'Content-Type': 'application/json' }, dataType: 'jsonp'};
    return $http.get(url).then(function(result) {
      self.status = '';
       routePoints(result);
      routeInstructions(result);

    })}

      function routePoints(result) {
        var app_code = 'pG2gTxRQDbxVAsdDMCN1WA';
        var app_id = 'toJMr8CRe6wBffMtHC4B';

          var platform = new H.service.Platform({
            'app_id': app_id,
            'app_code': app_code
        });

        var maptypes = platform.createDefaultLayers();
                document.getElementById('mapContainer').innerHTML = ''

         map = new H.Map(document.getElementById('mapContainer'), maptypes.normal.map);
          var ui = H.ui.UI.createDefault(map, maptypes);
                        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        var route = result.data.response.route;
        addRouteShapeToMap(route);
        addManueversToMap(route);
      }

      function routeInstructions(result){
          var route = result.data.response.route[0];
        addWaypointsToPanel(route.waypoint);
        addManueversToPanel(route);
        addSummaryToPanel(route.summary);
      }
        function addRouteShapeToMap(route){

         var strip = new H.geo.Strip(),
           routeShape = route[0].shape
           console.log(routeShape);

         routeShape.forEach(function(point) {
           var parts = point.split(',');
           strip.pushLatLngAlt(parts[0], parts[1]);
         });

         polyline = new H.map.Polyline(strip, {
           style: {
             lineWidth: 4,
             strokeColor: 'rgba(0, 128, 255, 0.7)'
           }
         });
console.log(mapContainer);
         map.addObject(polyline);
         map.setViewBounds(polyline.getBounds(), true);
        }


        function addManueversToMap(route){
         var svgMarkup = '<svg width="18" height="18" ' +
           'xmlns="http://www.w3.org/2000/svg">' +
           '<circle cx="8" cy="8" r="8" ' +
             'fill="#1b468d " stroke="white" stroke-width="1"  />' +
           '</svg>',
           dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
           group = new  H.map.Group(),
           i,
           j;

           for (i = 0;  i < route[0].leg.length; i += 1) {
           for (j = 0;  j < route[0].leg[i].maneuver.length; j += 1) {
             maneuver = route[0].leg[i].maneuver[j];
             var marker =  new H.map.Marker({
               lat: maneuver.position.latitude,
               lng: maneuver.position.longitude} ,
               {icon: dotIcon});
               console.log(maneuver.position.latitude);
             marker.instruction = maneuver.instruction;
             group.addObject(marker);
           }
         }

         group.addEventListener('tap', function (evt) {
           map.setCenter(evt.target.getPosition());
           openBubble(
              evt.target.getPosition(), evt.target.instruction);
         }, false);

         map.addObject(group);



  };

function addWaypointsToPanel(waypoints){

  var nodeH3 = document.createElement('h3'),
    waypointLabels = [],
    i;

   for (i = 0;  i < waypoints.length; i += 1) {
    waypointLabels.push(waypoints[i].label);
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

function openBubble(position, text){

    bubble =  new H.ui.InfoBubble(
      position,
      {content: text});
    ui.addBubble(bubble);
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();

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
   Number.prototype.toMMSS = function () {
  return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';

}
}
}]);



