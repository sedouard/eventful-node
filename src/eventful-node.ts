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

	export interface categoryResult{
		id: string;
		name: string;
	}

	export interface getEventResult{
		id: string;
		url: string;
		title: string;
		description: string;
		start_time: string;
		stop_time: string;
		all_day: boolean;
		tz_id: number;
		tz_olson_path: string;
		tz_city: string;
		tz_country: string;
		venue_name: string;
		venue_id: string;
		venue_type: string;
		venue_display: boolean;
		city: string;
		region: string;
		postal_code: string;
		country: string;
		latitude: number;
		longitude: number;
		geocode_type: string;
		modified: string;
		owner: string;
		privacy: number;
		free: boolean;
		price: string;
		withdrawn: boolean;
		withdrawn_note: string;
		parents: any[];
		children: any[];
		links: any[];
		comments: any[];
		trackbacks: any[];
		images: any[];
		tags: any[];
		calendars: any[];
		properties: any[];
		categories: any[];
	}

	export interface getEventOptions{
		id: string;
		image_sizes: string;
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
			var request = this.base_url + 'events/search?app_key='+ this.app_key;

			for(var i in options){

				request += '&';

				request += i + '=' + options[i];
			}

			unirest.get(request, (response : any, err : any) => {

				if(err){
					return callback(err, null);
				}

				xml2js.parseString(response.body, {explicitArray : false}, (err: any, parsed: any) => {

					if(err){
						return callback(err, null);
					}

					return callback(null, parsed);
				});

			});

		}

		public listCategories(callback : (err: any, data: categoryResult[]) => void)
		{
			var request = this.base_url + '/categories/list?app_key='+ this.app_key;

			unirest.get(request, (response: any, err: any) => {

				if(err){
					return callback(err, null);
				}

				xml2js.parseString(response.body, {explicitArray : false}, (err: any, parsed: any) => {

					if(err){
						return callback(err, null);
					}

					return callback(null, parsed.categories.category);
				});
			});
		}

		public getEvent(options : getEventOptions,
			callback : (err: any, data: getEventResult) => void)
		{
			var request = this.base_url + 'events/get?app_key='+ this.app_key;

			for(var i in options){

				request += '&';

				request += i + '=' + options[i];
			}

			unirest.get(request, (response : any, err : any) => {

				if(err){
					return callback(err, null);
				}

				xml2js.parseString(response.body, {explicitArray : false}, (err: any, parsed: any) => {

					if(err){
						return callback(err, null);
					}

					return callback(null, parsed.event);
				});
			});
		}
	}

}

export = eventful;