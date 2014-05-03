/* hold our database connection settings */ 
module.exports = {
	// url looks like: 'mongodb://<host>/<db-name>'
    'url' : 'mongodb://evernode:techcrunch@ds043987.mongolab.com:43987/evernode' // temporary local config
    // 'url' : process.env.MONGOLAB_URI || 'mongodb://localhost/campuswaps-test' // temporary local config
};

