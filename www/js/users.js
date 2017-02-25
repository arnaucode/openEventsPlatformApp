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

    $scope.followingUsers=[];
    $scope.$on('$ionicView.enter', function(){//per executar-ho cada cop que es carrega el view
        if (localStorage.getItem("events_app_followingUsers")) {
          $scope.followingUsers = JSON.parse(localStorage.getItem("events_app_followingUsers"));
          console.log("followingUsers");
          console.log($scope.followingUsers);
        }
    });
    $scope.followUser = function(user){
        $scope.followingUsers.push(user._id);
        localStorage.setItem("events_app_followingUsers", JSON.stringify($scope.followingUsers));
    };
    $scope.unfollowUser = function(user){
        for(var i=0; i<$scope.followingUsers.length; i++) {
            if ($scope.followingUsers[i] === user._id){
                $scope.followingUsers.splice(i, 1);
            }
        }
        localStorage.setItem("events_app_followingUsers", JSON.stringify($scope.followingUsers));
    };
    $scope.isUserFollowed = function(user) {
        for(var i=0; i<$scope.followingUsers.length; i++) {
            if ($scope.followingUsers[i] === user._id){
                return true;
            }
        }
        return false;
    };
});
