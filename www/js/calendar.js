angular.module('app.calendar', ['pascalprecht.translate'])

.controller('CalendarCtrl', function($scope, $http, $ionicModal, $timeout,
        $ionicLoading, $filter) {

    $scope.dayClick = function(date) {
      window.location="#/app/byDay/" + date;
    };
});
