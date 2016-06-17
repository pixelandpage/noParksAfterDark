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
    console.log('star' + userInput);
    console.log('calling service');
    routeGeneratorService.getLocation(userInput)
    .then(function(response){
      self.currentRequest.push(response);
    });
  };

}]);



// "https://no-parks-after-dark-backend.herokuapp.com/location/api/?searchtext=50%20commercial%20street

noParks.service('routeGeneratorService', ['$http', function($http) {
  var self = this;

  self.getLocation= function(userInputLocation) {
    console.log('getLocation called');
    var location = userInputLocation;
    console.log(location);
    var url = "https://no-parks-after-dark-backend.herokuapp.com/location/api?searchtext=" + location;
    var data = JSON.stringify(location);
    var headers = { headers: { 'Content-Type': 'application/json' }, dataType: 'jsonp'};
    console.log('data=' + data);
    console.log('headers=' + headers);

    return $http.get(url ).then(function(res) {
      self.status = '';
      console.log(res)
      console.log(url);
      return res;
    }).catch(function(res) {
      console.log(res);
      self.status = 'Failed';
      return self.status;
    });
  };
}]);

noParks.controller('MapController',  function($scope, IntrospectModule) {
  console.log('calling noParks controller');
  this.hello = "Hello World";

  var factories = IntrospectModule('factories');

  })
   .factory('IntrospectModule', function($injector) {
        // This factory will dynamically return all services/controllers/directives/etc
        // given the module name.

        return function (moduleName) {
            var out = {};
            angular.module(moduleName)._invokeQueue.forEach(function(item) {
                var name = item[2][0];
                out[name] = $injector.get(name);
            });
            return out;
        };
    });
