/// <reference path="../lib/eventful-node.d.ts"/>
var assert = require("assert");
var eventful = require('../bin/eventful-node');
var client = new eventful.Client(process.env.API_KEY);
var apiKeyMessage = "Must set the environment variable API_KEY with your eventful API key";
////////////////////////////////////////////////////////////////////////////////
//Sample tests for Continuous Integration for the data source
///////////////////////////////////////////////////////////////////////////////
describe('eventful-node', function(){
  describe('#searchEvents()', function(){
    it('should return a list of events with at lest 1 event', function(done){

      assert.equal(true, process.env.API_KEY != null, apiKeyMessage);
      client.searchEvents({
        keywords: 'music'
      }, function(err, data){

        assert.equal(true, (err == null));

        //basic check, see if we have any events
        console.log('fetched ' + data.search.total_items + ' events ' );
        assert.equal(true, data.search.total_items > 0);

        for(var i in data.search.events[i]){
          assert.equal(true, data.search.events[i].title != null);
        }
        done();
      });
    })
  })

  describe("#listCategories", function (){
    it('should return a list of categories', function(done){

      assert.equal(true, process.env.API_KEY != null, apiKeyMessage);

      client.listCategories(function(err, data){
        console.log(err);
        assert.equal(true, (err == null));
        console.log(data);
        for(var i in data){
          console.log('Available event categories: ');
          console.log('id:' + data[i].id);
          console.log('id:' + data[i].name);
          assert.equal(true, data[i].id != null);
          assert.equal(true, data[i].name != null);
        }
        done();
      });

    });
  });

  describe("#getEvent", function (){
    it('should return an event', function(done){
      const DEMO_ID = "E0-001-000278174-6";
      assert.equal(true, process.env.API_KEY != null, apiKeyMessage);

      client.getEvent({
        id: DEMO_ID
      }, function(err, data) {
        assert.ok(err == null);
        assert.equal(data['$'].id, DEMO_ID);
        done();
      });

    });
  });
})