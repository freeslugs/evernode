//The API of your application
var Lecture = require('../models/lecture.js');

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};
