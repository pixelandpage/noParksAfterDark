// angular.module('noParks.controllers', [])

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
    // console.log(userInput);
    console.log('calling service');
    routeGeneratorService.getLocation(userInput)
    .then(function(response){
      self.currentRequest.push(response);
    });

    console.log(self.currentRequest);
  };
    // console.log(self.currentRequest); // not available

}]);

noParks.service('routeGeneratorService', ['$http', function($http) {
  var self = this;

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

      function routePoints(result) {
        console.log(result);
        var route = result.response.route[0];
      console.log(route);
        addRouteShapeToMap(route);
        addManueversToMap(route);
      }

      function routeInstructions(result){
          console.log(result);
          console.log(result);
          console.log(result);
          console.log(result);
          console.log(result);
          console.log(result);
          var route = result.data.response.route[0];
          addWaypointsToPanel(route.waypoint);
        addManueversToPanel(route);
        addSummaryToPanel(route.summary);
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
