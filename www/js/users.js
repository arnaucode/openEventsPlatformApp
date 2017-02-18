angular.module('app.users', ['pascalprecht.translate'])

.controller('UsersCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $filter) {


    $scope.users=[];
    $scope.page=0;
    $scope.doRefresh = function() {
      /* users refresh: */
        $http.get(urlapi + 'users?page=' + $scope.page)
        .then(function(data){
            console.log('data success users');
            console.log(data); // for browser console
            //$scope.users = data.data; // for UI
            $scope.users=data.data;
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
    };
    $scope.doRefresh();

});
