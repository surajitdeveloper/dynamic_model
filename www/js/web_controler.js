angular.module('starter.controllers', ["ngStorage"]);
.controller('AppCtrl', function($ionicHistory,$state,$scope, $ionicModal, $timeout,$http, $sessionStorage,$window,searchdate,$rootScope,$ionicLoading) {
	$scope.loginData = {};
	$scope.signUpData = {};
	$scope.resetData = {};
	$scope.Doc={};
	$scope.AppointmentDetails={};
	$scope.desiredSearchData = {};
	$scope.desiredSearchData.speciality = '';
	$scope.desiredSearchData.insurance = '';
	$scope.desiredSearchData.location = '';
	$scope.desiredSearchData.selectedDate = new Date();
	$scope.desiredSearchData.page=0;
	$scope.desiredSearchData.status='first';
	$scope.coreurl=coreurl;
	$scope.baseurl=baseurl;
	$scope.my_key=my_key;
});