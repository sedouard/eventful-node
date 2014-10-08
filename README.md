eventful-node
=============

A simple client library for the Eventful API for event searching. (http://api.eventful.com)

# Getting Started

(In the near future you will be able to) Do:

```bash

npm install eventful-node

```

Then you can require and intiailze a new client with your api_key:

```js

var eventful = require('eventful-node');
var client = new eventful.Client(<YOUR EVENTFUL API KEY>);

```

## Searching for events

To search you can use the search function. Pass a [searchEventOptions](https://github.com/sedouard/eventful-node/blob/master/lib/eventful-node.d.ts) and the [callback](https://github.com/sedouard/eventful-node/blob/master/lib/eventful-node.d.ts).

```js

client.searchEvents({ options }, callback);

```

Example - Get all events listed in eventful with keyword 'music':

```js

client.searchEvents({ keywords: 'music' }, function(err, data){

  if(err){
  
    return console.error(err);
  
  }
  
  console.log('Recieved ' + data.search.total_items + ' events');
  
  console.log('Event listings: ');
  
  //print the title of each event
  for(var i in data.search.events){
  
    console.log(data.search.events[i].title);
  
  }

});

```

## Getting Possible Event Cateogires

```js
  
  client.listCategories(function(err, data){
    
    if(err){
    
      return console.error(err);
    
    }
    for(var i in data){
      console.log('Available event categories: ');
      console.log('id:' + data[i].id);
      console.log('id:' + data[i].name);
    }
  });
  
```

# Building

This library is built and tested using [gruntjs](http://gruntjs.com). Be sure to have the grunt command line interface (cli) installed globally on your machine:

```bash
# On some systems, you may need to run this command with sudo
npm install grunt-cli -g
```

To build eventful-node, fork or clone this repository and do:

```bash

npm install --dev
grunt

```

This will compile the [typescript](http://typescriptlang.org) into javascript, minify it and place it in the ./bin folder.

# Testing

To run the associated unit tests do:

Unix/Linux:

```bash

export API_KEY=<YOUR_EVENTFUL_API_KEY>
grunt test

```

Windows:

```batch

set API_KEY=<YOUR_EVENTFUL_API_KEY>
grunt test

```

# Contributing

This library is written in [typescript](http://typescriptlang.org) and as such contributions must be made in typescript. To make things easier, you can start this grunt watch task which will automatically validate and compile your typescript from ./src/eventful-node.ts to javascript in ./lib/eventful-node.js.


```bash
grunt watch
```

Please check the issues tab with 'help wanted' issues to contribute.

