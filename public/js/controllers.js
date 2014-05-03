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
  controller('HomeController', function ($scope) {
  // write Ctrl here

  }).
  controller('DashboardController', function ($scope) {
  // write Ctrl here

  }).
  controller('NewController', function ($scope) {
  // write Ctrl here

  }).
  controller('ViewController', function ($scope) {
  // write Ctrl here

  });
