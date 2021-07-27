const superagent = require('superagent');

class HttpClient {

    constructor() {
        this._init();
    }

    _init(){
        this.method = undefined;
        this.url = undefined;
        this.body = undefined;
        this.query = undefined;
        this.headers = {};
    }
    
    post(url, data) {
        if (!url) {
            throw new Error("need a url for request")
        }
        this.method = "post";
        this.url = url;
        if(data){
            this.body = data;
        }
        return this;
    }

    setQuery(query) {
        this._setParam(query);
        return this;
    }

    get(url, query) {
        if (!url) {
            throw new Error("need a url for request");
        }
        this.method = "get";
        this.url = url;
        this._setParam(query);
        return this;
    }

    _setParam(query){
        if (query) {
            this.query = query;
        }
    }

    setHeaders(header, val) {
        if (header && val) {
            this.headers[header] = val;
        }
        return this;
    }

    async go() {
        if (!this.method) {
            throw (new Error("please choose a get or post method for request"));
        }
        let agent = superagent[this.method](this.url);
        if (this.body) agent = agent.send(this.body);
        if (this.query) agent = agent.query(this.query);
        for (const key in this.headers) {
            agent = agent.set(key, this.headers[key]);
        }
        return await agent;
    }

}

module.exports = HttpClient;
