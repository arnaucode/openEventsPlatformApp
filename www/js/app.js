//var urlapi = "http://localhost:3000/api/";
var urlapi = "http://192.168.1.35:3001/api/";



angular.module('app', [
    'ionic',
    'pascalprecht.translate',
    'ngCordova',
    'app.menu',
    'app.main',
    'app.events',
    'app.mapEvents',
    'app.event',
    'app.alerts',
    'app.savedEvents',
    'app.categories',
    'app.byCategory',
    'app.place',
    'app.byPlace',
    'app.calendar',
    'app.byDay',
    'app.users',
    'app.user',
    'app.login',
    'app.userZone',
    'app.newEvent',
    'app.editUser',
    'app.statistics',
    'app.newAlert'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenuCtrl'
    })

    .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
        }
      }
    })
    .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: 'templates/events.html',
          controller: 'EventsCtrl'
        }
      }
    })
    .state('app.mapEvents', {
      url: '/mapEvents',
      views: {
        'menuContent': {
          templateUrl: 'templates/mapEvents.html',
          controller: 'MapEventsCtrl'
        }
      }
    })
    .state('app.event', {
      url: '/events/:eventid',
      views: {
        'menuContent': {
          templateUrl: 'templates/event.html',
          controller: 'EventCtrl'
        }
      }
    })
    .state('app.alerts', {
      url: '/alerts',
      views: {
        'menuContent': {
          templateUrl: 'templates/alerts.html',
          controller: 'AlertsCtrl'
        }
      }
    })
    .state('app.savedEvents', {
      url: '/savedEvents',
      views: {
        'menuContent': {
          templateUrl: 'templates/savedEvents.html',
          controller: 'SavedEventsCtrl'
        }
      }
    })
    .state('app.categories', {
      url: '/categories',
      views: {
        'menuContent': {
          templateUrl: 'templates/categories.html',
          controller: 'CategoriesCtrl'
        }
      }
    })
    .state('app.byCategory', {
      url: '/byCategory/:categoryname',
      views: {
        'menuContent': {
          templateUrl: 'templates/byCategory.html',
          controller: 'ByCategoryCtrl'
        }
      }
    })
    .state('app.place', {
      url: '/place',
      views: {
        'menuContent': {
          templateUrl: 'templates/place.html',
          controller: 'PlaceCtrl'
        }
      }
    })
    .state('app.byPlace', {
      url: '/byPlace/:place',
      views: {
        'menuContent': {
          templateUrl: 'templates/byPlace.html',
          controller: 'ByPlaceCtrl'
        }
      }
    })
    .state('app.calendar', {
      url: '/calendar',
      views: {
        'menuContent': {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarCtrl'
        }
      }
    })
    .state('app.byDay', {
      url: '/byDay/:day',
      views: {
        'menuContent': {
          templateUrl: 'templates/byDay.html',
          controller: 'ByDayCtrl'
        }
      }
    })
    .state('app.users', {
      url: '/users',
      views: {
        'menuContent': {
          templateUrl: 'templates/users.html',
          controller: 'UsersCtrl'
        }
      }
    })
    .state('app.user', {
      url: '/users/:userid',
      views: {
        'menuContent': {
          templateUrl: 'templates/user.html',
          controller: 'UserCtrl'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
    .state('app.userZone', {
      url: '/userZone',
      views: {
        'menuContent': {
          templateUrl: 'templates/userZone.html',
          controller: 'UserZoneCtrl'
        }
      }
    })
    .state('app.newEvent', {
      url: '/newEvent',
      views: {
        'menuContent': {
          templateUrl: 'templates/newEvent.html',
          controller: 'NewEventCtrl'
        }
      }
    })
    .state('app.editUser', {
      url: '/editUser',
      views: {
        'menuContent': {
          templateUrl: 'templates/editUser.html',
          controller: 'EditUserCtrl'
        }
      }
    })
    .state('app.statistics', {
      url: '/statistics',
      views: {
        'menuContent': {
          templateUrl: 'templates/statistics.html',
          controller: 'StatisticsCtrl'
        }
      }
    })
    .state('app.newAlert', {
      url: '/newAlert',
      views: {
        'menuContent': {
          templateUrl: 'templates/newAlert.html',
          controller: 'NewAlertCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
})
  /* translator */
  .config(['$translateProvider', function($translateProvider) {

    /* get lang from the file translations.js */
    for (lang in translations) {
      $translateProvider.translations(lang, translations[lang]);
    }

    if (window.localStorage.getItem('lang')) {
      $translateProvider.preferredLanguage(window.localStorage.getItem('lang'));
    } else {
      $translateProvider.preferredLanguage('english');
    };

    $translateProvider.useSanitizeValueStrategy('escape');

  }])
  .factory('httpInterceptor', function httpInterceptor($q, $window, $location) {
    return {
      request: function(config) {
        return config;
      },
      requestError: function(config) {
        return config;
      },
      response: function(res) {
        return res;
      },
      responseError: function(res) {
        return res;
      }
    }
  })
  .factory('api', function($http) {
    return {
      init: function() {
        $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem("events_app_token");
        $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem("events_app_token");
      }
    };
  })
  .run(function(api) {
    api.init();
  });
