/**
 * Created by kamoszm on 2015-07-14.
 */

app.service('googleMap', function(){
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

    var styledMap = new google.maps.StyledMapType(styleArray,
        {name: "Contact"});

    var mapInit = function () {
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

    this.init = function(){
        mapInit();
    }
});