import 'whatwg-fetch'

// interface FetchConfig extends RequestInit {
// 	baseURL?: string;
// 	responseType?: string;
// }

// interface IProps {
// 	initConfig?: Partial<FetchConfig>;
// 	reqIntercept?: (config: FetchConfig) => FetchConfig;
// 	resIntercept?: (response: Response) => Promise<any>;
// 	resErrorCallback?: (err) => void
// }

export class Fetch {
	// initConfig: Partial<FetchConfig>;
	// reqIntercept: (config: FetchConfig) => FetchConfig;
	// resIntercept: (response: Response, config?: FetchConfig) => Promise<any>;
	// resErrorCallback: (err) => void;

	constructor(props) {
    props = props || {}
		this.initConfig = props.initConfig || {};
		this.reqIntercept = props.reqIntercept || function(config) {
			return config
		};
		this.resIntercept = props.resIntercept || function(res, config) {

      if(config.responseType === 'response') {
        return res
      }
			if(config.responseType === 'arraybuffer' || config.responseType === 'blob') {
				return res.blob()
			}
			return res.json()
		}
		this.resErrorCallback = props.resErrorCallback || function () {}
    this.apiErrorCallback = function (res, config) {
      if(config.errCallback) {
        typeof config.errCallback === 'function' && config.errCallback(res, conifg)
      }else {

        typeof props.apiErrorCallback === 'function' && props.apiErrorCallback (res, config)
      }
      return res
    }
	}

	request(url, options) {
		// 合并初始化config
		const config = Object.assign({}, this.initConfig, options)

		return fetch((options.baseURL || '') + url, this.reqIntercept(config))
			.then(res => this.resIntercept(res, config))
      .then(res => this.apiErrorCallback(res, config))
			.catch(err => {
				this.resErrorCallback(err);
			});
	}

	get(url, params, config = {}) {
		let options = {
			method: 'GET',
			...config
		}
		let newUrl = params ? this.queryString(url, params) : url;
		
		return this.request(newUrl, options)
	}

	post(url, data = {}, config = {}) {
		let options = {
			method: 'POST',
			headers: {
				"content-type": "application/json;charset=UTF-8"
			},
			body: {},
			...config
		}
		options.body = JSON.stringify(data)
		return this.request(url, options)
	}

	delete(url, params, conifg = {}) {
		let options = {
			method: 'DELETE',
			...conifg
		}
		let newUrl = params ? this.queryString(url, params) : url;
		return this.request(newUrl, options)
	}

	put(url, data = {}, config = {}) {
		let options = {
			method: 'PUT',
			body: {},
			...config
		}
		options.body = JSON.stringify(data)
		return this.request(url, options)
	}

	postForm(url, data, config = {}) {
		let options = {
			method: 'POST',
			body: {},
			...config
		}
		if (data) options.body = config.isForm ? this.buildFormData(data) : new FormData(data);
		return this.request(url, options)
	}

	queryString(url, params) {
		const ps = []
		if (typeof params === 'object') {
			for (let p in params) {
				if (p) {
					ps.push(p + '=' + encodeURIComponent(params[p]));
				}
			}
			return url + '?' + ps.join('&')
		} else {
			return url.split(':')[0] + params
		}
	}

	buildFormData(params) {
		if (params) {
			const data = new FormData()
			for (let p in params) {
				if (p) {
					data.append(p, params[p])
				}
			}
			return data;
		}
	}
}