'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope) {

    

  }).
  controller('HomeController', function ($scope, parallaxHelper) {
    $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);
  }).
  controller('DashboardController', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '/lectures'
    }).success(function (data, status, headers, config) {
      // $scope.name = data.name;
      console.log(data);
    }).error(function (data, status, headers, config) {
      // $scope.name = 'Error!'
    });
  }).
  controller('NewController', function ($scope) {
  // write Ctrl here

  }).
  controller('ViewController', function ($scope, parallaxHelper) {
    $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);

  });
