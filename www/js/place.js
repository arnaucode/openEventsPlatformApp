angular.module('app.place', ['pascalprecht.translate', 'ui-leaflet'])

.controller('PlaceCtrl', function($scope, $http, $ionicModal, $timeout,
        $ionicLoading, $filter, leafletData, leafletBoundsHelpers) {

    $scope.center= {
        lat: 0,
        lng: 0,
        zoom: 1
    };
    $scope.markers=new Array();
    $scope.tiles= {
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: {
            attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    };
    $scope.place={
        location:{
            direction:"",
            geo:{
                lat:"",
                long:""
            }
        }
    };
    $scope.getGeo = function(){
        $scope.markers=[];
        console.log($scope.place.location.direction);
        $http.get('http://nominatim.openstreetmap.org/search?q=' + $scope.place.location.direction + '&format=json&limit=1')
        .then(function(data) {
            console.log(data);
            if(data.data[0])
            {
                $scope.place.location.geo.lat=data.data[0].lat;
                $scope.place.location.geo.long=data.data[0].lon;
                //$scope.newtravel.from.name=data.data[0].display_name;
                $scope.markers.push({
                    lat: Number(data.data[0].lat),
                    lng: Number(data.data[0].lon),
                    message: $scope.place.location.direction
                });
                $scope.center= {
                    lat: Number(data.data[0].lat),
                    lng: Number(data.data[0].lon),
                    zoom: 16
                };
            }
        });
    };
});
