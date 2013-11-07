// Store locator with customisations
// - custom marker
// - custom info window (using Info Bubble)
// - custom info window content (+ store hours)

var ICON = new google.maps.MarkerImage('medicare.png', null, null,
    new google.maps.Point(14, 13));

var SHADOW = new google.maps.MarkerImage('medicare-shadow.png', null, null,
    new google.maps.Point(14, 13));

google.maps.event.addDomListener(window, 'load', function() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: new google.maps.LatLng(37.09024, -95.712891),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  });


  //var markers = [];
  //for (var i = 0; i < 100; i++) {
  //    var latLng = new google.maps.LatLng(data.photos[i].latitude,
  //        data.photos[i].longitude);
  //    var marker = new google.maps.Marker({ 'position': latLng });
  //    markers.push(marker);
  //}
  //var markerCluster = new MarkerClusterer(map, markers);
  var panelDiv = document.getElementById('panel');

  var data = new MedicareDataSource;

  var view = new storeLocator.View(map, data, {
    geolocation: false,
    features: data.getFeatures()
  });

  view.createMarker = function(store) {
    var markerOptions = {
      position: store.getLocation(),
      icon: store.getDetails().icon,
      shadow: SHADOW,
      title: store.getDetails().title
    };
    return new google.maps.Marker(markerOptions);
  }

  var infoBubble = new InfoBubble;
  view.getInfoWindow = function(store) {
    if (!store) {
      return infoBubble;
    }

    var details = store.getDetails();

    var html = ['<div class="store"><div class="title">', details.title,
      '</div><div class="address">', details.address, '</div>',
      '<div class="hours misc">', details.hours, '</div>', '<div class="email">', details.email, '</div></div>'].join('');
      

    infoBubble.setContent($(html)[0]);

    return infoBubble;
  };
 
  new storeLocator.Panel(panelDiv, {
    view: view
  });
});
