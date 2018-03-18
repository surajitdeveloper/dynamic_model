// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services',"ngStorage", "multipleSelect", 'file-model','gm',"ngMaterial"]) //

  .run(function ($ionicPlatform, $http, $sessionStorage, $ionicLoading, $ionicPopup, $state, $location,) { //, $cordovaGeolocation
    function get_location(lat, lng)
    {
      $http.get("http://vps137395.vps.ovh.ca/baby3/public/app/findAddress?lat="+lat+"&lng="+lng).success(function (data) {
        let formatted_address = data.results[0].formatted_address;
        console.log(formatted_address);
        localStorage.formatted_address = formatted_address;
        localStorage.selLocation_str = (typeof localStorage.selLocation_str == "undefined")?localStorage.formatted_address:localStorage.selLocation_str;
      });
    }
  $ionicPlatform.ready(function() {
    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    /*
    localStorage.lat = 22.5949058;
    localStorage.lng = 88;
    localStorage.country = "India";
    */
   /////////////////////////////////////////////////////////////////////////////////
   $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="app.home")///=="/app/home"$state.current.name
    {
      var confirmPopup = $ionicPopup.confirm({
       title: '',
       template: '<span class="mono exit-text">Are you sure you want to exit?</span>'
       });
       confirmPopup.then(function(res) {
         if(res){
           ionic.Platform.exitApp();
          //  if(!ionic.Platform.isAndroid()){
          //    ionic.Platform.exitApp();
          //  }else{
          //    navigator.app.exitApp();
          //  }
         }else {
           console.log('You are not sure');
         }
       });
    }
    else
    {
      navigator.app.backHistory();
    }
  }, 100);

  ////////////////////////////////////////////////////////////////////////////////
    if (typeof localStorage.lat == "undefined" || typeof localStorage.formatted_address == "undefined")
    {
      $ionicLoading.show({
        template: '<img  src="img/loading.gif" />'
      });
      $http.get("http://ip-api.com/json").success(function (data) {
        //localStorage.country = data.country;
        localStorage.lat = data.lat;
        localStorage.lng = data.lon;
        get_location(localStorage.lat, localStorage.lng);
        $ionicLoading.hide();
      });
    }
    if(typeof localStorage.lat != "undefined")
    {
      localStorage.selLat = (typeof localStorage.selLat == "undefined")?localStorage.lat:localStorage.selLat;
      localStorage.selLng = (typeof localStorage.selLng == "undefined")?localStorage.lng:localStorage.selLng;
    }
    localStorage.profilepic = "";
    localStorage.practiceCertificate = "";
    localStorage.registrationCertificate = "";
    localStorage.token = "";
    var posOptions = {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 0
    };
    /*navigator.geolocation.getCurrentPosition(posOptions).then(function (position) {
      localStorage.lat = position.coords.latitude;
      localStorage.lng = position.coords.longitude;
      get_location(localStorage.lat, localStorage.lng);
    }, function (err) {
      if(err.code == 2)
      {
        //cordova.plugins.diagnostic.switchToLocationSettings();
      }
      $ionicLoading.show({
        template: '<span class="mono">GPS is not enabled</span>',
        duration: 1500
      });
    });*/
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        //var lat = position.coords.latitude;
        //var lng = position.coords.longitude;
        localStorage.lat = position.coords.latitude;
        localStorage.lng = position.coords.longitude;
        get_location(localStorage.lat, localStorage.lng);
      }, function (error) {
      });
    } else {
      console.log('no geolocation');
    }
    /*if(window.cordova && ionic.Platform.isAndroid())
    {
      FCMPlugin.getToken(function(token) 
      {
        // save this server-side and use it to push notifications to this device
        console.log(token);
        localStorage.token = token;
        //alert(token);
      }, function(error) {
      console.error(error);
      });
    }*/
    if(window.cordova && ionic.Platform.isAndroid())
    {
     window.FirebasePlugin.getToken(function(token) {
       // save this server-side and use it to push notifications to this device
       console.log(token);
       localStorage.token = token;
       let user_id = (typeof localStorage.userId != undefined && localStorage.userId != "")?localStorage.userId:null;
     }, function(error) {
       console.error(error);
     });
    }
    /////////////////////////////////////////////////////////////////////
    console.log(baseurl);
    $http.get(baseurl + "/userRole").then((data) => {
      //$scope.roles = data.data;
      $sessionStorage.roles = JSON.stringify(data.data);
    });
    $http.get(baseurl + "/get_all_speciality").then(function success(data) {
      let spListMain = data.data;
      let splList = [];
      let spListid = [];
      for (i = 0; i < spListMain.length; i++) {
        var degree = spListMain[i].specialty_name;
        var degree_id = spListMain[i].id;
        //console.log(degree);
        if (splList.indexOf(degree) == -1) {
          splList.push(degree);
          spListid.push(degree_id);
        }
      }
      $sessionStorage.spListMain = JSON.stringify(spListMain);
      $sessionStorage.splList = JSON.stringify(splList);
      $sessionStorage.spListid = JSON.stringify(spListid);
    });
    $http.get(baseurl + "/getlocation").then((locationData) => {
      $sessionStorage.location_data = JSON.stringify(locationData.data.data);
      //console.log($scope.location_data);
    });
    $http.get(baseurl + "/get_all_language").then(function success(data) {
      //$scope.langList = data.data;
      let langListMain = data.data;
      let langList = [];
      let langListid = [];
      for (i = 0; i < langListMain.length; i++) {
        var degree = langListMain[i].language_name;
        var degree_id = langListMain[i].id;
        if (langList.indexOf(degree) == -1) { 
          langList.push(degree);
          langListid.push(degree_id);
        }
      }
      $sessionStorage.langListMain = JSON.stringify(langListMain);
      $sessionStorage.langList = JSON.stringify(langList);
      $sessionStorage.langListid = JSON.stringify(langListid);
    });
    $http.get(baseurl + "/get_all_degree").then((data) => {
      //console.log(data.data);
      let degreeListMain = data.data;
      let degreeList = [];
      let degreeid = [];
      for (i = 0; i < degreeListMain.length; i++) {
        var degree = degreeListMain[i].degree_name;
        var degree_id = degreeListMain[i].id;
        if (degreeList.indexOf(degree) == -1) {
          degreeList.push(degree);
          degreeid.push(degree_id);
        }
      }
      $sessionStorage.degreeListMain = JSON.stringify(degreeListMain);
      $sessionStorage.degreeList = JSON.stringify(degreeList);
      $sessionStorage.degreeid = JSON.stringify(degreeid);
    });
    ////////////////////////////////////////////////////////////////////
    $http.get("http://ip-api.com/json").success(function(data)
    {
      localStorage.country = data.country;
      localStorage.lat = data.lat;
      localStorage.lng = data.lon;
    });
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    document.addEventListener('deviceready', function() {
      navigator.splashscreen.hide();
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
.state('app.bmd-home', {
  cache: false,
      url: '/bmd-home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'BMDCtrl'
        }
      }
    })
    .state('app.about', {
      cache: false,
          url: '/about',
          views: {
            'menuContent': {
              templateUrl: 'templates/about.html',
              controller: 'aboutCtrl'
            }
          }
      })
.state('app.bmd-blocked', {
  cache: false,
      url: '/bmd-blocked',
      views: {
        'menuContent': {
          templateUrl: 'templates/blocked.html',
          controller: 'BMDCtrl'
        }
      }
    })
.state('app.listing', {
  cache: false,
      url: '/listing/:selectionId',
      views: {
        'menuContent': {
          templateUrl: 'templates/listing.html',
          controller: 'BMDCtrl'
        }
      }
    })
.state('app.search', {
  cache: false,
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: 'searchCtrl'
        }
      }
    })
.state('app.doctor', {
  cache: false,
      url: '/doctor',
      views: {
        'menuContent': {
          templateUrl: 'templates/search_result.html',
          controller: 'searchCtrl'
        }
      }
    })
.state('app.login', {
    cache: false,
    url: '/login',
    views: {
            'menuContent': {
              templateUrl: 'templates/login_main.html',
              controller: 'BMDCtrl'
      }
    }
})
.state('app.registration', {
      cache: false,
      url: '/registration',
      views: {
              'menuContent': {
              templateUrl: 'templates/signup_main.html',
              controller: 'BMDCtrl'
            }
          }
      })
.state('app.appointment', { 
  cache: false,
      url: '/appointment/:apnt_date_time',
      views: {
        'menuContent': {
          templateUrl: 'templates/appointment.html',
          controller: 'BMDCtrl'
        }
      }
    })
.state('app.doctor_profile', {
      cache: false,
          url: '/doctor_profile',
          views: {
            'menuContent': {
              templateUrl: 'templates/doctor_profile.html',
              controller: 'BMDCtrlProfile'
            }
          }
    })
    .state('app.doctor_profileView', {
      cache: false,
          url: '/doctor_profileView',
          views: {
            'menuContent': {
              templateUrl: 'templates/doctor_profileView.html',
              controller: 'BMDCtrlProfile'
            }
          }
    })
.state('app.doctor_schedule', {
      cache: false,
          url: '/doctor_schedule',
          views: {
            'menuContent': {
              templateUrl: 'templates/doctor_schedule.html',
              controller: 'BMDCtrl'
            }
          }
    })
.state('app.doctor_schedule_view', {
      cache: false,
          url: '/doctor_schedule_view',
          views: {
            'menuContent': {
              templateUrl: 'templates/doctor_schedule_view.html',
              controller: 'BMDCtrl'
            }
          }
})
.state('app.my_booking', {
  cache: true,
      url: '/my_booking',
      views: {
        'menuContent': {
          templateUrl: 'templates/my_booking.html',
          controller: 'BMDCtrl'
        }
      }
    })
.state('app.search_list', {
  cache: false,
      url: '/search_list/:search_text',
      views: {
        'menuContent': {
          templateUrl: 'templates/search_listing.html',
          controller: 'BMDCtrl'
        }
      }
    })
.state('app.test', {
  cache: false,
      url: '/test',
      views: {
        'menuContent': {
          templateUrl: 'templates/test.html',
          controller: 'BMDCtrl'
        }
      }
    })
.state('app.community', {
        cache: false,
            url: '/community',
            views: {
              'menuContent': {
                templateUrl: 'templates/underConstruction.html',
                controller: 'aboutCtrl'
              }
            }
        })
.state('app.doctor_booked', {
      cache: false,
          url: '/doctor_booked',
          views: {
            'menuContent': {
              templateUrl: 'templates/doctor_booked.html',
              controller: 'doctorBookedCtrl'
            }
          }
    })
.state('app.booked_history', {
          cache: false,
              url: '/booked_history',
              views: {
                'menuContent': {
                  templateUrl: 'templates/doctor_booked.html',
                  controller: 'doctorBookedCtrl'
                }
              }
    })
  .state('app.home', {
      cache: false,
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home_new.html',
          controller: 'HomeCtrl'
        }
      }
    })
  ;
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/bmd-home');
  $urlRouterProvider.otherwise('/app/home');
});

