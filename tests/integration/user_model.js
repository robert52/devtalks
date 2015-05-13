'use strict';

/**
 * Important! Set the environment to test
 */
process.env.NODE_ENV = 'test';

var ENV = process.env.NODE_ENV;

var root = __dirname + '/../../';
var chai = require('chai');
var should = chai.should();
var User = require(root+'/app/models/users');
var usersFixture = require('../fixtures/users');
var userFixture = usersFixture[0];

describe('User Model Integration', function() {
  before(function(done) {
    // clean db
    // create test user from fixture

    done();
  });

  after(function(done) {
    // drop database and clean everything

    done();
  });


  describe('#authenticate()', function() {
    it('should return the user if the credentials are valid', function(done) {
      User.authenticate(userFixture.email, 'test1234', function(err, user) {
        if (err) throw err;

        should.exist(user);
        user.email.should.equal(userFixture.email);
        user.password.should.equal(userFixture.password);
        user.passwordSalt.should.equal(userFixture.passwordSalt);
        done();
      });
    });

    it('should return nothing if the credential of the user are invalid', function(done) {
      User.authenticate(userFixture.email, 'notuserpassowrd', function(err, user) {
        if (err) throw err;

        should.not.exist(user);
        done();
      });
    });
  });

});