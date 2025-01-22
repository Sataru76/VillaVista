const User = require("../models/user")

module.exports.rendersignUpForm = (req, res) => {
    res.render("user/signup.ejs");

}


module.exports.signUpUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        // let existingUser = await User.findOne({ $or: [{ username }, { email }] });
        let existingUser = await User.findOne({ $or: [{ username: new RegExp("^" + username + "$", "i") }, { email: new RegExp("^" + email + "$", "i") }] });
        if(existingUser){
            req.login(existingUser, function (err) {
                if (err) {
                    return next(err);
                }
                req.flash("success", "Welcome to wanderlust");

                res.redirect("/listings");
            });
        }else{

        let newUser = new User({
            email: email,
            username: username,
        })

        let registeruser = await User.register(newUser, password);
      
            req.login(registeruser, function (err) {
                if (err) {
                    return next(err);
                }
                req.flash("success", "Welcome to wanderlust");

                res.redirect("/listings");
            });
        
        }

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");

    }


}


module.exports.renderloginForm = (req, res) => {
    res.render("user/login.ejs");

}


module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}


module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logout Successfully");
        res.redirect("/listings");
    });
}

module.exports.signUpUser = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        // Check if username or email already exists
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            // If user exists, log them in
            req.login(existingUser, function (err) {
                if (err) {
                    return next(err);
                }
                req.flash("success", "Welcome back to Wanderlust");
                res.redirect("/listings"); // Redirect to listings page
            });
        } else {
            // If user doesn't exist, create a new one
            let newUser = new User({
                username,
                email,
            });

            // Register the new user
            await User.register(newUser, password);

            // Log the new user in after registration
            req.login(newUser, function (err) {
                if (err) {
                    return next(err);
                }
                req.flash("success", "Welcome to Wanderlust");
                res.redirect("/listings"); // Redirect to listings page
            });
        }
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup"); // Redirect to signup page if an error occurs
    }
};
