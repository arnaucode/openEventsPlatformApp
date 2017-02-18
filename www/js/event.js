angular.module('app.event', ['pascalprecht.translate', 'ui-leaflet'])

.controller('EventCtrl', function($scope, $http, $ionicModal,
        $stateParams, $timeout, $ionicLoading, $filter,
        leafletData, leafletBoundsHelpers, $cordovaSocialSharing) {


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


    $scope.event={};
    $scope.doRefresh = function() {
      /* events refresh: */
        $http.get(urlapi + 'events/id/'+ $stateParams.eventid)
        .then(function(data){
            console.log('data success events');
            console.log(data); // for browser console
            //$scope.events = data.data; // for UI
            $scope.event=data.data;
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

            if($scope.event.location)
            {
                $scope.markers=[];
                $scope.markers.push({
                    lat: Number($scope.event.location.geo.lat),
                    lng: Number($scope.event.location.geo.long),
                    message: $scope.event.location.name
                });
                $scope.center= {
                    lat: (Number($scope.travel.from.lat)+Number($scope.travel.to.lat))/2,
                    lng: (Number($scope.travel.from.long)+Number($scope.travel.to.long))/2,
                    zoom: 4
                };
            }

        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
    };
    $scope.doRefresh();


    $scope.share = function(){
        var message = "hola, això ho comparteixo";
        var subject = 'compartició';
        var file= ['',''];
        var link = "http://duckduckgo.com";
        $cordovaSocialSharing
        .share(message, subject, file, link) // Share via native share sheet
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occured. Show a message to the user
      });
    };
});
