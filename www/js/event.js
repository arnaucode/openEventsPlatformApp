angular.module('app.event', ['pascalprecht.translate', 'ui-leaflet'])

.controller('EventCtrl', function($scope, $http, $ionicModal,
        $stateParams, $timeout, $ionicLoading, $filter, $ionicPopup,
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
                    message: $scope.event.location.direction
                });
                $scope.center= {
                    lat: Number($scope.event.location.geo.lat),
                    lng: Number($scope.event.location.geo.long),
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


    $scope.share = function(event){
        var message = "[" + event.title + "]" + event.description;
        /*var subject = event.title;
        var file= ['',''];*/
        var link = "http://duckduckgo.com";
        $cordovaSocialSharing
        .share(message, link) // Share via native share sheet
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occured. Show a message to the user
      });
    };



    $scope.deleteEvent = function(){
       var confirmPopup = $ionicPopup.confirm({
         title: 'Deleting event',
         template: 'Are you sure you want to delete <b>'+ $scope.event.title+'</b>?'
       });
       confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
         console.log("delete travel: " + $stateParams.eventid);
         $http({
             url: urlapi + '/events/id/' + $stateParams.eventid,
             method: "DELETE"
         })
         .then(function(response) {
                 console.log(response);
                 $scope.events=response.data;
                 /*localStorage.setItem('c_travels', JSON.stringify($scope.travels));
                 localStorage.setItem('c_travelsLastDate', JSON.stringify(new Date()));*/
                 $ionicLoading.show({ template: 'Event deleted', noBackdrop: true, duration: 2000 });
                 window.location.href="#/app/main";
         },
         function(response) { // optional
                 // failed
                 $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });
         });
       } else {
         console.log('You are not sure');
       }
     });
    };
});
