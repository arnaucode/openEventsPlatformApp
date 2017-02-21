angular.module('app.newEvent', ['pascalprecht.translate'])

.controller('NewEventCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $filter) {

    $scope.event={};
    $scope.event.categories=[{name: "prova"}];
    $scope.postEvent = function(){
        $http({
            url: urlapi + 'events',
            method: "POST",
            data: $scope.event
        })
        .then(function(data) {
            window.location.href="#/app/events";
        },
        function(response) { // optional
                // failed
                console.log(response);
        });
    };
});
