// mockup of a data layer access
var Users = [
  {
    _id: '554b6fe1a42e7bbc1e932344',
    email: 'test@test.com',
    name: 'Test User',
    password: 'QPzaDaAtyH2q6lmyAgyOpFZows/1AblJn5O87GdUHzQ+2DYS8DCNKT7NkUyyKefe69kBoOAzbLQ2CtEDA9O7ZFDr966A5Fmoz65PaDyb43+kVrYKdsKtejsXgKQ9kQ4bs0H4ODu0qk8IXGT4McHrR9S8OEFTAYdfTWaAfFri6ClpnazjG4wYFqfRkW0IlCNAqwx4HlDjf7G9HfIErfj8tfhPg4buQ0ACTgPOuDjJph8lmCcNgB9BZkKmzX4hJf/Rb+K7WPUH5veMx8bkdrrlsaKSggxYFthb98TQMqIWLszBDTRO0cCrsm+vVNodugzNKj/OP7B9JHydhQBcuRwSzOgTYV/MS0nsAKtqB4922qfDtdgOLbxePSL4JP2i6isCOHEmXo56oGxDiYmlasgSR9B/OabQSBozMDZuox2OYmLIBlOmvH540BKq8YmfxLJAUZlqBDLwbrQgjGPjQaU9QFrqGrLLsO9HNuIix3zA3HdC0GW5HD37ArLT2lzNNExZs8h+FJ5zFbIfrG8W594ubBCrbl3EXkpfXMYoVIET9QVhT450E4vfafjLjMcZKmY/hKg43UAm1ko2d7Ul4fo7NJyBHp7GuG30+24Xhmr1z4vB2nzxF7cfTXrI7Q0zCvXbcUXAhhxFdSmHstZhUfDSyuOIspgqdX+YVeDm5k4B7e0=',
    passwordSalt: 'ofLT6ibu8jipFm2mejad6g9/W100eG89xHGoP9bY9+qRmTdi51X9uhrTlFQH8Ro3QTuXmr1n3Fu4o88APXVlrNf167aSvQImlmCQCOOyuAQ05rv+AjYTumAIhFMbZU1Dz0RnU3pBysJh+2FuuO88IT0msigN+RjGxvlIlWrjpUAeyEXAJU/STpWTOGLXMR7WI6XHwodOIo+cfzankslQPMjtltFBooTeuusu3H5P4g5e0ae5MYq2jY2YXA3C1pwy6/kXQFg+ZLyNieMSNznNSM9exXVw/aqCPanXHeJgyhIl8c/t2LQ39Tbw9f1f2rrszfnpuk+L2INiSy1cxbSYuHHD3xPQIG2wLI8L1lFSawhiIRP5nOq2bGdRsn8eTd2VuWCex7P1b4WNYZPhuqs6x7FlEhd4av2H3/XOyC3zZZR7yPf1OsodkSVe7MdDmeU9SuOe6bMzLTdB8g2IrD++Tr4LlpE4ODdC1C8gQviqccS9I0LtuRn6zu/f1Be7sNVonPIl3oZjo7P0OFhr9LNMD5pEOrBTPzdASK7dyaMy5189P+byX66ddmWOHvp1dAyIP37cKVIT1AN+l2XAYO8fvnLI0SJYiwW2ZZSpD2xsRQ/uLLivWOr4l7hsPonyYVcOq0dsMZkWPfcwy99Z8daMRDBM3n68HVQSyWM3k8P7eKY=',
    roles: ['user'],
    phoneNumber: '0700123007',
    active: true
  }
];

var _ = require('lodash');
var passwordHelper = require('../helpers/password');

module.exports = {
  findOne: function(obj, callback) {
    var user = _.find(Users, function(user) {
      return user.email === obj.email;
    });

    callback(null, user);
  },
  authenticate: function(email, password, callback) {
    this.findOne({ email: email }, function(err, user) {
      if (err) {
        return callback(err, null);
      }

      // no user found just return the empty user
      if (!user) {
        return callback(err, user);
      }

      // verify the password with the existing hash from the user
      passwordHelper.verify(password, user.password, user.passwordSalt, function(err, result) {
        if (err) {
          return callback(err, null);
        }

        // if password does not match don't return user
        if (result === false) {
          return callback(err, null);
        }

        // return user if everything is ok
        callback(err, user);
      });
    });
  }
};