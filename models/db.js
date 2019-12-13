const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, (err) => {
    if (!err) {
        console.log('MongoDB connection success!!')
    } else {
        console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2));
    }
});

require('./user.model');