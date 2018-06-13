/**
 * Express app configuration
**/

const config = {
	'algolia': {
		'appID': '975SXHJ1TX',
		'publicApiKey': '6b3bee7de716ed5d8b630764b51e83c2',
		'privateApiKey': '9595e45c66059f29dac42df32b2ab39b',
		'indexName': 'algolia_test'
	},
	'server': {
		'port': 5000,
		'cors': {
			'enabled': true,
			'whitelist': []
		}
	}
};

module.exports = config;