angular.module('app.user', ['pascalprecht.translate', 'ui-leaflet'])

.controller('UserCtrl', function($scope, $http, $ionicModal,
        $stateParams, $timeout, $ionicLoading, $filter,
        leafletData, leafletBoundsHelpers) {

    $scope.center= {
        lat: 0,
        lng: 0,
        zoom: 1
    };
    $scope.markers=[];
    $scope.tiles= {
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: {
            attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    };

    $scope.user={};
    $scope.doRefresh = function() {
      /* events refresh: */
        $http.get(urlapi + 'users/id/'+ $stateParams.userid)
        .then(function(data){
            console.log('data success events');
            console.log(data); // for browser console
            //$scope.events = data.data; // for UI
            $scope.user=data.data;
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            if($scope.user.location)
            {
                $scope.markers=[];
                $scope.markers.push({
                    lat: Number($scope.user.location.geo.lat),
                    lng: Number($scope.user.location.geo.long),
                    message: $scope.user.location.name
                });
                $scope.center= {
                    lat: Number($scope.user.location.geo.lat),
                    lng: Number($scope.user.location.geo.long),
                    zoom: 16
                };
            }

        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
    };
    $scope.doRefresh();

});
