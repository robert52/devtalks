var usersModel = require("../models/users");

function login(email, password) {

    var check = checkFields(email, password);

    // if email and/or password are empty, stop here
    if(!check.result) {
        return {result: check.result, msg: check.msg};
    // else go to data layer
    } else {
        var dataCheck = usersModel.login(email, password);
        if(dataCheck.result) {
            return {result: true, data: dataCheck.data};
        } else {
            return {result:false, msg: dataCheck.msg}
        }
    }
}

function checkFields(email, password) {
    var result = false;
    var error  = "";
    if(email === "") {
        error = "Email cannot be empty";
    } else if(password === "") {
        error = "Password cannot be empty";
    } else {
        result = true;
    }
    return {result: result, msg: error};
}

module.exports = function(app) {
    return {
        index: function(req, res) {

            // default values
            var isLogged = false;
            var errorMsg = "";
            var userData = {};

            // init session
            if(typeof req.session.logged === "undefined") {
                req.session.logged = false;
            }

            // if the login form has been submitted, try to login
            if (req.method === "POST") {
                var loginResult = login(req.body.email, req.body.password);
                console.log(loginResult);
                isLogged = loginResult.result;
                if(isLogged) {
                    userData = loginResult.data;
                    req.session.logged = true;
                } else {
                    errorMsg = loginResult.msg;
                }
            // if we have the logout parameter, logout
            }

            if(req.param("action") === "logout") {
                req.session.logged = false;
                res.redirect('/');
            } else {
                // render the page
                res.render('home', {
                    title: 'Dev Talks Demo',
                    h1: 'High efficiency with JavaScript',
                    isLogged: req.session.logged,
                    errorMsg: errorMsg,
                    userData: userData
                });
            }
        }
    };
}