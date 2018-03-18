angular.module('starter.services', [])

.factory('speciality', function() {
 var savedData = 'select any one'
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 };

})
.factory('insurance', function() {
 var savedData = 'I ll select my insurance company later.'
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 };

})
.factory('location', function() {
 var savedData = 'select your location'
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 };

})
.factory('searchdate', function() {
 var savedData = '';
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 };

})
.directive('scrollToTop', function() {
  return {
    restrict: 'A',
    link: function(scope, elm, attr) {
      var isTop;
      //bind changes from scope to our view: set isTop variable
      //depending on what scope variable is. If scope value
      //changes to true and we aren't at top, go to top
      scope.$watch(attr.scrollToTop, function(newValue) {
        newValue = !!newValue; //to boolean
        if (!isTop && newValue) {
          elm[0].scrollTo(0,0);
        }
        isTop = newValue; 
      });

      //If we are at top and we scroll down, set isTop and 
      //our variable on scope to false.
      elm.bind('scroll', function() {
        if (elm[0].scrollTop !==0 && isTop) {
          //Use $apply to tell angular 
          //'hey, we are gonna change something from outside angular'
          scope.$apply(function() {
            //(we should use $parse service here, but simple for example)
            scope[attr.scrollTop] = false;
            isTop = false;
          });
        }
      });

    }
  };
})
;
