angular.module('app.events', ['pascalprecht.translate'])

.controller('EventsCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $filter) {


    $scope.events=[];
    $scope.page=0;
    $scope.doRefresh = function() {
      /* events refresh: */
        $http.get(urlapi + 'events?page=' + $scope.page)
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
    };
    $scope.doRefresh();

});
