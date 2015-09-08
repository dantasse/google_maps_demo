// Here's where we're calling the google maps API. No API key needed yet, b/c
// we're not using it very much. If we started using it enough that we wanted
// to track our usage, we should get an API key. More info:
// https://developers.google.com/maps/documentation/javascript/tutorial#api_key
//
// And that "async!" is from the async plugin.
// https://github.com/millermedeiros/requirejs-plugins
define(['maplabel'], function () {
    return function (canvas, dataPanel) {
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

        // Plots a prediction along with a number. (right now the number is the
        // number of tweets in that bin I guess)
        var plotPrediction = function(prediction, num_tweets, which) {
            var lat = prediction[0];
            var lon = prediction[1];

            var cir = drawCircle(lat, lon, num_tweets*3);
            cir['title'] = "" + which;
            var label = new MapLabel({
                text: which,
                position: new google.maps.LatLng(lat, lon),
                map: map,
                fontSize: 15,
                align: 'left',
            });
            var miniCir = new google.maps.Circle({
              strokeColor: '#000000',
              strokeOpacity: 1.0,
              strokeWeight: 2,
              fillColor: '#000000',
              map: map,
              center: new google.maps.LatLng(lat, lon),
              radius: 5
            });
            queriedUsersMarkers.push(cir);
            queriedUsersMarkers.push(miniCir);
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
                // remove previous markers from map and empty queriedUsersMarkers
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
              // console.log(predictions);
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
});
