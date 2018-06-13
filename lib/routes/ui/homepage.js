/** Set routes
 *
 * @param {Object} app
 * @return {Void}
*/

const setRoutes = (app) => {
	app.get('/', (req, res) => {
		const query = req.query.query || '';
		const page = req.query.page || 0;
		let type = 'search_get-all';

		if (query !== '') {
			type = 'search_get-filtered';
		}

		res.render('default', {'page': 'homepage', 'search': {'query': query, 'page': page, 'type': type}});
	});
};

module.exports = setRoutes;