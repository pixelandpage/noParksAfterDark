factories.factory('MapFactory', function(){




 var platform = new H.service.Platform({
    'app_id': app_id,
    'app_code': app_code
    });

    // var targetElement = document.getElementById('mapContainer');
    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.normal.map,
    {
      zoom: 10,
      center: { lng: -0.12, lat: 51.50 }
      // center: { lng: 25.27, lat: 54.68 } <-- Lithuania Co-ordinates
    });

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    map.addEventListener('tap', function(evt) {
      console.log(evt.type, evt.currentPointer.type);
    });

    var ui = H.ui.UI.createDefault(map, maptypes);

    return map


})
