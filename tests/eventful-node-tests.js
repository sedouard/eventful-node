/// <reference path="../lib/eventful-node.d.ts"/>
var assert = require("assert");
var eventful = require('../lib/eventful-node.js');
var client = new eventful.Client(process.env.API_KEY);
////////////////////////////////////////////////////////////////////////////////
//Sample tests for Continuous Integration for the data source
///////////////////////////////////////////////////////////////////////////////
describe('eventful-node', function(){
  describe('#searchEvents()', function(){
    it('should return a list of events with at lest 1 recipe', function(done){
      
      client.searchEvents({
        keywords: 'music'
      }, function(err, data){
      
        assert.equal(true, (err == null));
        
        //basic check, see if we have any events
        assert.equal(true, data.search.total_items > 0);
        done();
      });
    })
  })
})