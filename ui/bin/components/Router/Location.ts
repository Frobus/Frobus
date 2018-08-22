import * as queryString from "query-string";
import * as UrlPattern from "url-pattern";

export let isMatch = function(path, url){
	return (new UrlPattern(url + "(/)(*)")).match( path );
}

export class Location {
	private url: string;
	private location: {
		path: string;
		query: object;
		hashQuery: object;
		string: string;
	}

	constructor(url){
		this.url = url;
		this.location = this.parseUrl(url);
	}
	parseUrl(url) {
		let urlSplited = url.split("?");
		var path = urlSplited[0];
		var query = urlSplited[1];
		var hash = "";
	
		var result = {
			path: "",
			query: {},
			hashQuery: {},
			string: "",
		}
	
		if( query ){
			var querySplited = query.split("#");
			result.query = queryString.parse(querySplited.shift());
			hash = querySplited.join("#");
		} else {
			var pathSplited = path.split("#");
			path = pathSplited.shift()
			hash = pathSplited.join("#");
		}
	
		result.path = path;
	
		if( hash ){
			result.hashQuery = queryString.parse(hash);
		}

		result.string = this.toString(result);

		return result;
	}
	toString(location = this.location){
		var string = location.path;
		if( queryString.stringify(location.query) ){
			string += "?" + queryString.stringify(location.query);
		}
		if( queryString.stringify(location.hashQuery) ){
			string += "#" + queryString.stringify(location.hashQuery);
		}
		return string;
	}
	getLocation(){
		return this.location;
	}
	isMatch(url){
		return isMatch(this.location, url);
	}
}