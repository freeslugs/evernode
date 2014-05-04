'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'duParallax',
  'ngRoute',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeController'
    }).
    when('/dashboard', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardController'
    }).
    when('/new', {
      templateUrl: 'partials/new.html',
      controller: 'NewController'
    }).
    when('/view', {
      templateUrl: 'partials/view.html',
      controller: 'ViewController'
    }).
    otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);
});
