'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('HomeController', function ($scope, parallaxHelper) {
    $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);
  }).
  controller('DashboardController', function ($scope) {

  }).
  controller('NewController', function ($scope) {
  // write Ctrl here

  }).
  controller('ViewController', function ($scope, parallaxHelper) {
    $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);

  });
