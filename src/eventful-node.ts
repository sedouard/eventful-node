/// <reference path="../typings/xml2js/xml2js.d.ts"/>
/// <reference path="../typings/node/node.d.ts"/>

import xml2js = require('xml2js');
var unirest = require('unirest');
module eventful {
	
	export interface searchEventOptions{			
			
			location: string;
			date : string;
			category : string;
			within : string;
			units : string;
			count_only : boolean;
			sort_order : string;
			sort_direction : string;
			page_size : number;
			page_number : number;
			image_sizes : string;
			languages : number;
			mature : string;
			include : string;
			
	}
	
	export interface searchEventResults{
			
			total_items : number;
			page_size : number;
			page_count : number;
			page_number : number;
			page_items : number;
			first_item : number;
			last_item : number;
			search_time : number;
			//refer to eventful doc on content body
			//http://api.eventful.com/docs/events/search
			events : any[];
			
			
	}
	export class Client{
		
		private app_key : string;
		private base_url : string;
		constructor(key : string){
			this.app_key = key;
			this.base_url = "http://api.eventful.com/rest/";
		}
		
		public searchEvents(options : searchEventOptions, 
			callback : (err: any, data: searchEventResults) => void)
		{
			console.log('debug1');
			var request = this.base_url + 'events/search?app_key='+ this.app_key;
			
			for(var i in options){
				
				request += '&';
				
				request += i + '=' + options[i];
			}
			
			unirest.get(request, (response : any, err : any) => {

				if(err){
					console.error(err);
					return callback(err, null);
				}
				var x : xml2js.Options;

				xml2js.parseString(response.body, {explicitArray : false}, (err: any, parsed: any) => {
					

					if(err){
						console.error(err);
						return callback(err, null);
					}
					
					return callback(null, parsed);
				});
				
			});
			
		}
	}
	
}

export = eventful;