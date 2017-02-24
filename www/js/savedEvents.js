angular.module('app.savedEvents', ['pascalprecht.translate'])

.controller('SavedEventsCtrl', function($scope, $http, $ionicModal,
    $timeout, $ionicLoading, $filter, $cordovaSocialSharing) {

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
    $scope.$on('$ionicView.enter', function(){//per executar-ho cada cop que es carrega el view
        $scope.savedEvents=[];
        if (localStorage.getItem("events_app_savedEvents")) {
          $scope.savedEvents = JSON.parse(localStorage.getItem("events_app_savedEvents"));
          console.log("savedEvents");
          console.log($scope.savedEvents);
        }
        $scope.events=$scope.savedEvents;
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
