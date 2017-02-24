angular.module('app.events', ['pascalprecht.translate'])

.controller('EventsCtrl', function($scope, $http, $ionicModal,
            $timeout, $ionicLoading, $filter, $cordovaSocialSharing) {


    $scope.events=[];
    $scope.alerts=[];
    $scope.page=0;
    $scope.doRefresh = function() {
      /* events refresh: */
        //$http.get(urlapi + 'events?page=' + $scope.page)
        $http.get(urlapi + 'events')
        .then(function(data){
            console.log('data success events');
            console.log(data); // for browser console
            //$scope.events = data.data; // for UI
            $scope.events=data.data;
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
        $http.get(urlapi + 'alerts')
        .then(function(data){
            $scope.alerts=data.data;
        }, function(data){
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
    $scope.savedEvents=[];
    $scope.$on('$ionicView.enter', function(){//per executar-ho cada cop que es carrega el view
        if (localStorage.getItem("events_app_savedEvents")) {
          $scope.savedEvents = JSON.parse(localStorage.getItem("events_app_savedEvents"));
          console.log("savedEvents");
          console.log($scope.savedEvents);
        }
    });
    $scope.saveEvent = function(event){
        $scope.savedEvents.push(event);
        localStorage.setItem("events_app_savedEvents", JSON.stringify($scope.savedEvents));
        $ionicLoading.show({ template: 'Event saved', noBackdrop: true, duration: 1000 });
    };
    $scope.unsaveEvent = function(event){
        for(var i=0; i<$scope.savedEvents.length; i++) {
            if ($scope.savedEvents[i]._id === event._id){
                $scope.savedEvents.splice(i, 1);
            }
        }
        localStorage.setItem("events_app_savedEvents", JSON.stringify($scope.savedEvents));
        $ionicLoading.show({ template: 'Event unsaved', noBackdrop: true, duration: 1000 });
    };
    $scope.isEventSaved = function(event) {
        for(var i=0; i<$scope.savedEvents.length; i++) {
            if ($scope.savedEvents[i]._id === event._id){
                return true;
            }
        }
        return false;
    };
});
