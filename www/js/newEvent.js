angular.module('app.newEvent', ['pascalprecht.translate', 'ui-leaflet'])

.controller('NewEventCtrl', function($scope, $http, $ionicModal, $timeout,
    $ionicLoading, $filter, leafletData, leafletBoundsHelpers,
    $cordovaCamera) {


    //initialization
    $scope.event={};
    $scope.event.categories=[];
    $scope.event.location={
        direction: "",
        geo: {
            lat: "",
            long: "",
            name: ""
        }
    };

    //imgfile
    $scope.selectImgFile = function() {
      console.log("img");
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.event.imgpreview = "data:image/jpeg;base64," + imageData;
        $scope.event.img = imageData;
      }, function(err) {
        console.log(err);
      });
    };

    //get list of categories
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
    $scope.categorySelected = function(){
        $scope.event.categories=[];
        for(var i=0; i<$scope.categories.length; i++)
        {
            if($scope.categories[i].selected)
            {
                $scope.event.categories.push($scope.categories[i]);
            }
        }
        console.log($scope.event.categories);
    };


    $scope.postEvent = function(){
        $http({
            url: urlapi + 'events',
            method: "POST",
            data: $scope.event
        })
        .then(function(data) {
            $scope.event={};
            window.location.href="#/app/events";
        },
        function(response) { // optional
                // failed
                console.log(response);
        });
    };

    /* map */

    $scope.center= {
        lat: 0,
        lng: 0,
        zoom: 1
    };
    $scope.markers=new Array();
    $scope.tiles= {
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: {
            attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    };
    $scope.getGeo = function(){

        $scope.markers=[];
        console.log($scope.event.location.direction);
        $http.get('http://nominatim.openstreetmap.org/search?q=' + $scope.event.location.direction + '&format=json&limit=1')
        .then(function(data) {
            console.log(data);
            if(data.data[0])
            {
                $scope.event.location.geo.lat=data.data[0].lat;
                $scope.event.location.geo.long=data.data[0].lon;
                //$scope.newtravel.from.name=data.data[0].display_name;
                $scope.markers.push({
                    lat: Number(data.data[0].lat),
                    lng: Number(data.data[0].lon),
                    message: $scope.event.location.direction
                });
                $scope.center= {
                    lat: Number(data.data[0].lat),
                    lng: Number(data.data[0].lon),
                    zoom: 16
                };
            }
        });

    };
});
