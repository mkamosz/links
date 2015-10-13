/**
 * Created by kamoszm on 2015-07-14.
 */

app.service('googleMap', ['$window', function($window){
    var styleArray = [
        {
            featureType: "all",
            stylers: [
                { saturation: -94 }
            ]
        },
        {
            featureType: "road.local",
            elementType: "labels",
            stylers: [
                { visibility: "on" }
            ]
        },
        {
            featureType: "poi.business",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    $window.mapInit = function () {

        var styledMap = new google.maps.StyledMapType(styleArray,
            {name: "Contact"});
        var map;

        var warsaw = new google.maps.LatLng(52.230185,21.013);


        var mapOptions = {
            zoom: 14,
            center: warsaw,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            },

            scrollwheel: false,
            draggable: true
        };

        var image = 'assets/img/layout/marker.png';

        map = new google.maps.Map(document.getElementById('contactMap'),
            mapOptions);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        var marker1 = new google.maps.Marker({
            position: warsaw,
            map: map,
            icon:image
        });
    };

    var initialization = function(src,callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
        script.src = src;
    };

    this.init = function(){
        initialization('http://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=mapInit');
    }
}]);