'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .factory('noteService', function($http) {
    var noteService = {
      async: function() {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get('lib/notes.json').then(function (response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      }
    };
    return noteService;
  })
  .factory('lectureService', function($http) {
    var lectureService = {
      async: function() {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get('lib/lecture.json').then(function (response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      }
    };
    return lectureService;
  });
