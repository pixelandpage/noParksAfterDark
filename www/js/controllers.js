angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
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
})

.controller('MapController',  function($scope, IntrospectModule) {

  this.hello = "Hello World";

  var factories = IntrospectModule('factories')

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
    })
