// mockup of a data layer access
module.exports = {
    login: function (email, password, callback) {
        if (email === "test@test.com" && password === "test") {
            return {
                result: true,
                data: {
                    userid: 1,
                    fname: "Paul",
                    lname: "Brie"
                }
            };
        } else {
            return {result: false, msg: "invalid credentials"};
        }
    }
};