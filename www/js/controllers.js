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

  var platform = new H.service.Platform({
    'app_id': 'DemoAppId01082013GAL',
    'app_code': 'AJKnXv84fjrb0KIHawS0Tg'
    });

    var targetElement = document.getElementById('mapContainer');
    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    $scope.map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.normal.map,
    {
      zoom: 10,
      center: { lng: -0.12, lat: 51.50 }
      // center: { lng: 25.27, lat: 54.68 } <-- Lithuania Co-ordinates
    });

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents($scope.map));

    $scope.map.addEventListener('tap', function(evt) {
      console.log(evt.type, evt.currentPointer.type);
    });

    var ui = H.ui.UI.createDefault($scope.map, maptypes);
      // ui.getControl('mapsettings').setEnabled(false);

      // Create the parameters for the routing request:
    var routingParameters = {
      // The routing mode:
      'mode': 'fastest;car',
      // The start point of the route:
      'waypoint0': 'geo!50.1120423728813,8.68340740740811',
      // The end point of the route:
      'waypoint1': 'geo!52.5309916298853,13.3846220493377',
      // To retrieve the shape of the route we choose the route
      // representation mode 'display'
      'representation': 'display'
    };

  var onResult = function(result) {
    var route,
      routeShape,
      startPoint,
      endPoint,
      strip;
    if(result.response.route) {
    // Pick the first route from the response:
    route = result.response.route[0];
    // Pick the route's shape:
    routeShape = route.shape;

    // Create a strip to use as a point source for the route line
    strip = new H.geo.Strip();

    // Push all the points in the shape into the strip:
    routeShape.forEach(function(point) {
      var parts = point.split(',');
      strip.pushLatLngAlt(parts[0], parts[1]);
    });

    startPoint = route.waypoint[0].mappedPosition;
    endPoint = route.waypoint[1].mappedPosition;

    // Create a polyline to display the route:
    var routeLine = new H.map.Polyline(strip, {
      style: { strokeColor: 'blue', lineWidth: 10 }
    });

    // Create a marker for the start point:
    var startMarker = new H.map.Marker({
      lat: startPoint.latitude,
      lng: startPoint.longitude
    });

    var endMarker = new H.map.Marker({
       lat: endPoint.latitude,
       lng: endPoint.longitude
     });

     // Add the route polyline and the two markers to the map:
     map.addObjects([routeLine, startMarker, endMarker]);

     // Set the map's viewport to make the whole route visible:
     map.setViewBounds(routeLine.getBounds());
     }
   };

   // Get an instance of the routing service:
   var router = platform.getRoutingService();

  // Call calculateRoute() with the routing parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  router.calculateRoute(routingParameters, onResult,
    function(error) {
      alert(error.message);
    });

  });
