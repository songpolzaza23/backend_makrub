const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('profiles');

passport.use(
    new localStrategy({ usernameField: 'username' },
        (username, password, done) => {
            User.findOne({ username: username },
                (err, user) => {
                    if (err) {
                        return done(err);
                    } else if (!user) {
                        // ไม่รู้จัก username
                        return done(null, false, { message: 'username is not register' });
                    } else if (!user.verifyPassword(password)) {
                        //password ไม่ถูกต้อง
                        return done(null, false, { message: 'Wrong Password' });
                    } else {
                        return done(null, user);
                    }
                })
        })
);