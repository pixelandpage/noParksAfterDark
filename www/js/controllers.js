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

.controller('MapController', function($scope) {

  this.hello = "Hello World";

  // var platform = new H.service.Platform({
  //   'app_id': 'DemoAppId01082013GAL',
  //   'app_code': 'AJKnXv84fjrb0KIHawS0Tg'
  //   });

  //   // Obtain the default map types from the platform object
  //   var maptypes = platform.createDefaultLayers();

  //   // Instantiate (and display) a map object:
  //   $scope.map = new H.Map(
  //   document.getElementById('mapContainer'),
  //   maptypes.normal.map,
  //   {
  //     zoom: 10,
  //     center: { lng: 13.4, lat: 52.51 }
  //   });
  });
