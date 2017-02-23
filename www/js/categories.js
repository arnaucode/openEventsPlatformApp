angular.module('app.categories', ['pascalprecht.translate'])

.controller('CategoriesCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $filter) {


    $scope.categories;
    $http.get(urlapi + 'categoriesList')
    .then(function(data){
        $scope.categories=data.data;
        console.log($scope.categories);
    }, function(data){
        console.log('data error');
        console.log(data);
        $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

    });
});
