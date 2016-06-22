angular.module('noParks.controllers', [])

.controller('MapController', ['MapFactory','$scope','$http', 'routeGeneratorService', function( $scope, MapFactory, $http, routeGeneratorService) {
  console.log('calling noParks controller');
    var self = this;

  self.hello = "Hello World";

  function init(){
    new MapFactory;
  };
  init();

  // self.map = new MapFactory;
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