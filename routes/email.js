var mailjet = require('mailjet');
mailjet.init('', '');

mj.request('listsAll', 'GET', {
	success: function(data) {
        //Do something with the returned data here
        console.log(data)
    },
    error: function(error, data) {
        //handle error case here.
        //The body of the response is passed to the callback as well
        console.log(error, data)
    }
});

mj.request('messageCampaigns', 'GET', {
    //pass your request parameters in this object
    id: '207413',
    success: function(data) {
        console.log(data)
    },
    error: function(error, data) {
        console.log(error, data)
    }
});