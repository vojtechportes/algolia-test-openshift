const validator = require('node-validator');
const algoliasearch = require('algoliasearch');
const config = require('../../config');
const clientPublic = algoliasearch(config.algolia.appID, config.algolia.publicApiKey);
const clientPrivate = algoliasearch(config.algolia.appID, config.algolia.privateApiKey);
const indexPublic = clientPublic.initIndex(config.algolia.indexName);
const indexPrivate = clientPrivate.initIndex(config.algolia.indexName);

/**
 * Get simplified algoliasearch settings
 *
 * @return {Object}
 * @api private
 */

const getSettings = async () => {
	return new Promise ((resolve, reject) => {
		let settings = {};

		try {
			indexPrivate.getSettings().then((data) => {
				settings = {
					'limit': data.hitsPerPage,
					'total': data.paginationLimitedTo 
				};

				resolve(settings);
			}).catch((reason) => {
				reject(reason);
			});
		} catch (err) {
			reject(err);
		}
	});
};

/**
 * Get minimal data from search results
 *
 * @param {Object} data
 * @return {Object}
 * @api private
 */

const getMinData = async (data) => {
	return new Promise ((resolve, reject) => {
		let minData = {
			'nbHits': data.nbHits,
			'page': data.page,
			'nbPages':data.nbPages,
			'hitsPerPage': data.hitsPerPage,
			'query': data.query,
			'params': data.params
		};

		resolve(minData);            
	});
}

/**
 * Get all data
 *
 * @param {Integer} page
 * @return {Object}
 * @api public
 */

const getAllData = async (page = 0) => {
	return new Promise(async (resolve, reject) => {
	    const toValidate = {
	        'page': parseInt(page)
	    };

	    const check = validator.isObject()
	        .withRequired('page', validator.isInteger({'min': 0}));

	    validator.run(check, toValidate, async (errorCount, errors) => {		
	    	if (errorCount === 0) {
				indexPublic.search({'query': '', 'page': page}).then(async (data) => {
					const minData = await getMinData(data);

		        	let newData = {
		        		'data': data,
		        		'minData': minData
		        	};

		        	resolve(newData);
				}).catch((reason) => {
					reject(reason);
				});
			} else {
	            reject(errors);
	        }
		});
	});
};

/**
 * Get filtered data based on query string
 *
 * @param {String} query
 * @param {Integer} page
 * @return {Object}
 * @api public
 */

const getFilteredData = async (query = '', page = 0) => {
	return new Promise (async (resolve, reject) => {
	    const toValidate = {
	    	'query': query,
	        'page': parseInt(page)
	    };

	    const check = validator.isObject()
	    	.withRequired('query', validator.isString())
	        .withRequired('page', validator.isInteger({'min': 0}));

	    validator.run(check, toValidate, async (errorCount, errors) => {
	        if (errorCount === 0) {
	            indexPublic.search({'query': query, 'page': page}).then(async (data) => {
	            	const minData = await getMinData(data);

	            	let newData = {
	            		'data': data,
	            		'minData': minData
	            	};

	            	resolve(newData);
	            }).catch((reason) => {
	            	reject(reason);
	            });
	        } else {
	            reject(errors);
	        }
	    });
	});
};

module.exports = {
	'getAllData': getAllData,
	'getFilteredData': getFilteredData
};