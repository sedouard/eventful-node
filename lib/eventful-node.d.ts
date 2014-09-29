/// <reference path="../typings/xml2js/xml2js.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
declare module eventful {
    interface searchEventOptions {
        location: string;
        date: string;
        category: string;
        within: string;
        units: string;
        count_only: boolean;
        sort_order: string;
        sort_direction: string;
        page_size: number;
        page_number: number;
        image_sizes: string;
        languages: number;
        mature: string;
        include: string;
    }
    interface searchEventResults {
        total_items: number;
        page_size: number;
        page_count: number;
        page_number: number;
        page_items: number;
        first_item: number;
        last_item: number;
        search_time: number;
        events: any[];
    }
    class Client {
        private app_key;
        private base_url;
        constructor(key: string);
        public searchEvents(options: searchEventOptions, callback: (err: any, data: searchEventResults) => void): void;
    }
}
export = eventful;
