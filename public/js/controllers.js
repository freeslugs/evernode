'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope) {

  }).
  controller('HomeController', function ($scope, parallaxHelper) {
    $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);
  }).
  controller('DashboardController', function (lectureService, $scope) {
    lectureService.async().then(function(d) {
      $scope.lecture = d.lecture;
    });
  }).
  controller('NewController', function (noteService, $scope) {
    noteService.async().then(function(d) {
      $scope.note = d.title;
    });
  }).
  controller('ViewController', function ($scope, parallaxHelper) {
    $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);

  });
