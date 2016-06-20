noParks.controller('DashCtrl', function($scope) { //links to Ionic
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

noParks.controller('RouteRequestController', ['$scope','$http', 'routeGeneratorService', function($scope, $http, routeGeneratorService){
  var self = this;


  self.currentRequest = [];

  $scope.routeGenerator = function(userInput){
    console.log(userInput);
    console.log('calling service');
    routeGeneratorService.getLocation(userInput)
    .then(function(response){
      self.currentRequest.push(response);
    });
    console.log(self.currentRequest);
  };
    // console.log(self.currentRequest); // not available

}]);

noParks.service('routeGeneratorService', ['$http', 'MapFactory', function($http, MapFactory) {
  var self = this;
  self.map = MapFactory;
  console.log(self.map);

  self.getLocation= function(userInputLocation) {
    console.log('getLocation called');
    var location = userInputLocation;
    console.log(location);
    var url = "https://no-parks-after-dark-backend.herokuapp.com/route/api/?" + location;
    var data = JSON.stringify(location);
    var headers = { headers: { 'Content-Type': 'application/json' }, dataType: 'jsonp'};
    console.log('data=' + data);
    console.log('headers=' + headers);

    return $http.get(url ).then(function(result) {
      self.status = '';
      console.log(result);
      console.log(url);
      console.log(result.data);

        routeInstructions(result);
        routePoints(result);

      function routePoints(result) {
        console.log(result);
        var route = result.data.response.route;
      console.log(route);
        addRouteShapeToMap();
        addManueversToMap(route);
      }

      function routeInstructions(result){
          console.log(result);
          var route = result.data.response.route[0];
        addWaypointsToPanel(route.waypoint);
        addManueversToPanel(route);
        addSummaryToPanel(route.summary);
      }
        function addRouteShapeToMap(){
          // var app_code = 'pG2gTxRQDbxVAsdDMCN1WA';
          // var app_id = 'toJMr8CRe6wBffMtHC4B';
          //
          // var platform = new H.service.Platform({
          //     'app_id': app_id,
          //     'app_code': app_code
          // });
          // var maptypes = platform.createDefaultLayers();
          //
          // var map = new H.Map(mapContainer,
          //  maptypes.normal.map,{
          //  center: {lat:52.5160, lng:13.3779},
          //  zoom: 13
          // });
          // var ui = H.ui.UI.createDefault(map, maptypes);
          //                   var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
          console.log(self.map);
          // console.log(self.map);
         var strip = new H.geo.Strip(),
           routeShape = '["51.5140062,-0.0998158", "51.5139484,-0.099982","51.513809,-0.100143","51.5136373,-0.100261","51.5134978,-0.1000142","51.5133047,-0.0992632","51.513294,-0.0991023", "51.5131545,-0.0986195","51.5129399,-0.0982654", "51.5119743,-0.0983942", "51.5113628,-0.0984478", "51.5112448,-0.0984371", "51.5082836,-0.0986409", "51.5082735,-0.098473"]',
           polyline;
           console.log(JSON.parse(routeShape));

         JSON.parse(routeShape).forEach(function(point) {
           var parts = point.split(',');
           strip.pushLatLngAlt(parts[0], parts[1]);
         });

         polyline = new H.map.Polyline(strip, {
           style: {
             lineWidth: 4,
             strokeColor: 'rgba(0, 128, 255, 0.7)'
           }
         });
         console.log(polyline);
         console.log(self.map);
         console.log(addObject());
         self.map.addObject(polyline);
         self.map.setViewBounds(polyline.getBounds(), true);
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

           for (i = 0;  i < route.leg.length; i += 1) {
           for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
             maneuver = route.leg[i].maneuver[j];
             var marker =  new H.map.Marker({
               lat: maneuver.position.latitude,
               lng: maneuver.position.longitude} ,
               {icon: dotIcon});
             marker.instruction = maneuver.instruction;
             group.addObject(marker);
           }
         }

         group.addEventListener('tap', function (evt) {
           map.setCenter(evt.target.getPosition());
           openBubble(
              evt.target.getPosition(), evt.target.instruction);
         }, false);

         mapContainer.addObject(group);
        }

    }).catch(function(res) {
      console.log(res);
      self.status = 'Failed';
      return self.status;
    });
  };
}]);

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
};

noParks.controller('MapController', ['MapFactory', function( $scope, MapFactory) {
  console.log('calling noParks controller');
  this.hello = "Hello World";

}]);
