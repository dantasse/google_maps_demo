// Here we create a class (sorta) called TweetMap. JS doesn't have "classes"
// like a Java or even Python; all you can do is create "functions." But here
// is a function called TweetMap that sort of acts like a class.
// |canvas| is the html canvas element where you want the map to be.
function TweetMap(canvas) {
    var latitude = 40.4417, // default pittsburgh downtown center
        longitude = -80.0000;
    var centerMarker;
    var redDotImg = 'static/images/maps_measle_red.png';
    var queriedUsersMarkers = [];
    var mapOptions = {
        center: {lat: latitude, lng: longitude},
        zoom: 14,
        disableDefaultUI: true
    };
    var map = new google.maps.Map(canvas, mapOptions);

    var drawLine = function(lat1, lng1, lat2, lng2) {
       var line1Coordinates = [
          new google.maps.LatLng(lat1, lng1),
          new google.maps.LatLng(lat2, lng2)
        ];
        var line1 = new google.maps.Polyline({
          path: line1Coordinates,
          geodesic: true,
          strokeColor: '#000000',
          strokeOpacity: 0.3,
          strokeWeight: 1
        });
        line1.setMap(map);
        return line1;
    }
    // Radius is in meters.
    var drawCircle = function(lat, lng, radius) {
      var options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        map: map,
        center: new google.maps.LatLng(lat, lng),
        radius: radius
      }
      cir = new google.maps.Circle(options);
      return cir;
    }
    // Draw grid lines for our rectangular bins.
    for (var lat = 40.2417; lat < 40.6417; lat += .01) {
        drawLine(lat, -80.2, lat, -79.8);
    }
    for (var lng = -80.2; lng < -79.8; lng += .01) {
        drawLine(40.2417, lng, 40.6417, lng);
    }

    // Just plots a red circle at the point you want. Called "prediction" for
    // no real reason; I was just trying to predict stuff in another thing I was
    // doing.
    var plotPrediction = function(prediction, num_tweets, label) {
        var lat = prediction[0];
        var lon = prediction[1];

        var cir = drawCircle(lat, lon, 5);
        cir['title'] = "" + label;
        var label = new MapLabel({
            text: label,
            position: new google.maps.LatLng(lat, lon),
            map: map,
            fontSize: 15,
            align: 'left',
        });
        // We keep this list queriedUsersMarkers so that we can remove them
        // when we want. So it's important that, whenever you add something to
        // the map, you add it to this list too.
        queriedUsersMarkers.push(cir);
        queriedUsersMarkers.push(label);
    };

    function attachTextToMarker(marker, message) {
        var textWindow = new google.maps.InfoWindow({
            content: message
        });

        google.maps.event.addListener(marker, 'click', function() {
            textWindow.open(marker.get('map'), marker);
        });
    }
    var plotTweet = function (tweet) {
        if(tweet != null && tweet["coordinates"] != null && tweet["coordinates"]["coordinates"] != null) {
            var userGeoCoordData = tweet["coordinates"]["coordinates"];
            var userMarker = new google.maps.Marker({
                // Note that tweets are stored as (lon, lat), not (lat, lon).
                // This is annoying; I usually try to store points as (lat, lon)
                // whenever I can, but Twitter stores them as lon, lat; whatever.
                position: {lat: userGeoCoordData[1], lng: userGeoCoordData[0]},
                map: map,
                icon: redDotImg
            });
            var userText = "<b>" + tweet["user"]["screen_name"] + "</b>: " + tweet["text"]
                         + "<br /> (" + userGeoCoordData[0].toFixed(4) + ", " + userGeoCoordData[1].toFixed(4) + "), " + tweet['created_at'];
            attachTextToMarker(userMarker, userText);
            queriedUsersMarkers.push(userMarker);
        }
    };

    var api =  {
        clearMap: function () {
            // remove previous markers from map
            if(queriedUsersMarkers.length > 0) {
                for(var i = 0; i < queriedUsersMarkers.length; i++) {
                    queriedUsersMarkers[i].setMap(null);
                }
                queriedUsersMarkers.length = 0;
            }
        },

        drawLine: function(lat0, lon0, lat1, lon1) {
            var line = drawLine(lat0, lon0, lat1, lon1);
            queriedUsersMarkers.push(line);
        },
        plotLabel: function(point, labelText) {
            var lat = point[0];
            var lon = point[1];
            var label = new MapLabel({
                text: labelText,
                position: new google.maps.LatLng(lat, lon),
                map: map,
                fontSize: 25,
                align: 'left',
            });

          queriedUsersMarkers.push(label);
        },
        plotPredictions: function(predictions) {
          for (var i = 0; i < predictions.length; i++) {
            plotPrediction(predictions[i], predictions[i][2], i+1);
          }
        },
        plotTweets: function(tweets) {
          for (var i = 0; i < tweets.length; i++) {
            plotTweet(tweets[i]);
          }
        },
    };
    return api;
};
var tweetMap = new TweetMap(document.getElementById('map-canvas'), document.getElementById("data-panel"));