const User = require('../models/user.js');

module.exports.signUpForm = (req, res) => {
    res.render('users/signup');
}

module.exports.signUp = async (req, res) => {
    try{

        let { username, email, password } = req.body;

        let newUser = new User({ username, email });
        let registeredUser = await User.register(newUser, password);

        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }

            req.flash('success', `Welcome to Stayease, ${username}! 🚀 You are all set to explore.`);
            res.redirect('/listings');
        });

    } catch(e) {

        req.flash('error', e.message);
        res.redirect('/signup');

    }

}

module.exports.logInForm = (req, res) => {
    res.render('users/login');
}

module.exports.logIn = async (req, res) => {
    let { username } = req.body;

    req.flash('success', `Welcome back to , ${username}! 🚀 You are all set to explore.`);

    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}

module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }

        req.flash('success', 'You have signed out safely. Safe travels!');
        res.redirect('/');
    });
}