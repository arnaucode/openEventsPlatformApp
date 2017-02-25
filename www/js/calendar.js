angular.module('app.calendar', ['pascalprecht.translate'])

.controller('CalendarCtrl', function($scope, $http, $ionicModal, $timeout,
        $ionicLoading, $filter) {

    $scope.dayClick = function(date) {
      window.location="#/app/byDay/" + date;
    };

    var startOfWeek = moment().startOf('month');
    var endOfWeek = moment().endOf('month');
    $scope.days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
        $scope.days.push(new Date(day.toDate()));
        day = day.clone().add(1, 'd');
    }

    console.log($scope.days);
});
