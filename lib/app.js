const express = require('express'),
      ejs = require('ejs'),
      helmet = require('helmet'),
      path = require('path'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      config = require('../config');

const app = express();      

if (config.server.cors.enabled) {
	const corsOptions = {
	  origin: (origin, cb) => {
	    if (config.server.cors.whitelist.indexOf(origin) !== -1) {
	      cb(null, true)
	    } else {
	      cb(new Error('Not allowed by CORS'))
	    }
	  }
	}

	app.options('*', cors(corsOptions));
}

app.use(bodyParser.json());
app.use(helmet());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../static')));

module.exports = app;