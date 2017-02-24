angular.module('app.byDay', ['pascalprecht.translate'])

.controller('ByDayCtrl', function($scope, $http, $ionicModal,
            $timeout, $ionicLoading, $filter, $stateParams) {

    $scope.day=$stateParams.day;
    $scope.events=[];
    $scope.page=0;
    $scope.doRefresh = function() {
      /* events refresh: */
        //$http.get(urlapi + 'events?page=' + $scope.page)
        $http.get(urlapi + 'events/day/'+ $stateParams.day)
        .then(function(data){
            $scope.events=data.data;
            console.log($scope.events);
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

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
    $scope.savedEvents=[];
    $scope.$on('$ionicView.enter', function(){//per executar-ho cada cop que es carrega el view
        if (localStorage.getItem("events_app_savedEvents")) {
          $scope.savedEvents = JSON.parse(localStorage.getItem("events_app_savedEvents"));
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
