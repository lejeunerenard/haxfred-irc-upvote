var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = require('chai').expect;
var path = require('path');
var chai = require('chai');

var helpers = require('../lib/helpers');
var Haxfred = require('haxfred');

chai.use(expect);
chai.use(sinonChai);

describe('Upvoting', function () {
   describe('detectUpvote()', function () {
      var usernames = ['alice', 'bob', 'charlie'];
      var regex = helpers.detectUpvoteRegex(usernames);

      it('detects username followed by a "+"', function () {
        var message = 'bob+';
        expect(helpers.detecUpvote(message, regex)).to.be.eq('bob');
      });
      it('detecs "username:" followed by a "+" ', function () {
        var message = 'bob:+';
        expect(helpers.detecUpvote(message, regex)).to.be.eq('bob');
      });
      it('detecs "username:", space character followed by a "+" ', function(){
        var message = 'bob	:+';
        expect(helpers.detecUpvote(message, regex)).to.be.eq('bob');
      });
      it('doesnt detect if there is anything between the username and "+"', function() {
        var message = 'bob	foo:+';
        expect(helpers.detecUpvote(message, regex)).to.not.be.ok;
      });
      it('detects if username starts with space', function () {
        var message = 'things   bob	:+';
        expect(helpers.detecUpvote(message, regex)).to.be.eq('bob');
      });
      it('detects if username doesnt start with space', function() {
        var message = 'thingbob	:+';
        expect(helpers.detecUpvote(message, regex)).to.not.be.ok;
      });
      it('detects with space after ":" and before "+"', function () {
        var message = 'bob:  +';
        expect(helpers.detecUpvote(message, regex)).to.be.eq('bob');
      });
   });
   describe('emit upvote event', function () {
     // Since we dont really want to setup the irc module for a test
      var usernames = ['alice', 'bob', 'charlie'];
      Haxfred.irc = {}
      Haxfred.irc.users = function() {
        return usernames;
      }
     it('fires upvote event when upvote is detected from another user');
     it('does not fire upvote event when upvote is detected from same user');
   });
});
