angular.module('app.menu', ['pascalprecht.translate'])


  .controller('MenuCtrl', function($scope, $window) {
    $scope.storageuser;
    if (localStorage.getItem("events_app_userdata")) {
      $scope.storageuser = JSON.parse(localStorage.getItem("events_app_userdata"));
      console.log($scope.storageuser);
    }

    $scope.logout = function() {
      localStorage.removeItem("events_app_token");
      localStorage.removeItem("events_app_userdata");
      $window.location.reload(true);
    };
  });
