const search = require('../../../api/search.js'),
	  message = require('../../../api/message.js');

/** Set routes
 *
 * @param {Object} app
 * @return {Void}
*/

const setRoutes = (app) => {
	app.get('/api/v1/public/search/getAllData/:page', (req, res) => {
		const page = req.params['page'];

		res.setHeader('Content-Type', 'application/json');

		search.getAllData(page).then(data => {
			res.send(message.set(data, 'success'));
		}).catch(reason => {
			res.status(400);
			res.send(message.set(reason, 'error'));
		});

		
	});

	app.get('/api/v1/public/search/getFilteredData/:page', (req, res) => {
		const page = req.params['page'];
		const query = req.query.query;

		res.setHeader('Content-Type', 'application/json');

		search.getFilteredData(query, page).then(data => {
			res.send(message.set(data, 'success'));
		}).catch(reason => {
			res.status(400);
			res.send(message.set(reason, 'error'));
		});
	});	
};

module.exports = setRoutes;