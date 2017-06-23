angular.module('app.mapEvents', ['pascalprecht.translate', 'ui-leaflet'])

  .controller('MapEventsCtrl', function($scope, $http, $ionicModal,
    $timeout, $ionicLoading, $filter,
    leafletBoundsHelpers, $cordovaSocialSharing) {

    //map
    $scope.center = {
      lat: 0,
      lng: 0,
      zoom: 1
    };
    $scope.markers = [];
    $scope.tiles = {
      url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      options: {
        attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    };


    $scope.events = [];
    $scope.page = 0;
    $http.get(urlapi + 'events')
      .then(function(data) {
        console.log('data success events');
        console.log(data); // for browser console
        //$scope.events = data.data; // for UI
        $scope.events = data.data;
        $scope.$broadcast('scroll.refreshComplete'); //refresher stop
        for (var i = 0; i < $scope.events.length; i++) {
          if ($scope.events[i].location) {
            var msg = "<a href='#/app/events/" + $scope.events[i]._id + "'>" +
              "<h4>" + $scope.events[i].title + "</h4>" +
              "<img src='" + $scope.events[i].img + "' style='width:100%;'>" +
              $scope.events[i].description + "</a>";

            $scope.markers.push({
              lat: Number($scope.events[i].location.geo.lat),
              lng: Number($scope.events[i].location.geo.long),
              message: msg
            });
            $scope.center = {
              lat: Number($scope.events[i].location.geo.lat),
              lng: Number($scope.events[i].location.geo.long),
              zoom: 12
            };
          }
        }
      }, function(data) {
        console.log('data error');
        $scope.$broadcast('scroll.refreshComplete'); //refresher stop
        $ionicLoading.show({
          template: 'Error connecting server',
          noBackdrop: true,
          duration: 2000
        });

      });


  });
