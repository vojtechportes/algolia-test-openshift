const config = require('./config');
const app = require('./lib/app.js');

/* APP UI Routes */

require('./lib/routes/ui/homepage.js')(app);

/* APP API Routes */

require('./lib/routes/api/v1/search.js')(app);

/* Start APP */

const server = app.listen(config.server.port, () => {
    console.log("Listening on port " + config.server.port);
});