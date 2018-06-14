# Algolia Test

This application is usisng wrapper API for algoliasearch API to protect public key and to secure API using Access-Control-Allow-Origin and helmet module.

Since API is wrapped and served from backend of this application, speed of API will depend on your server configuration.

Repository with static assets can be found here https://github.com/vojtechportes/algolia-test-build-assets. Repository for deployment on Openshift is here https://github.com/vojtechportes/algolia-test-openshift.

## API

### getAll

```
/* Using Docker */

curl -X GET localhost:5500/api/v1/public/search/getAllData/:page

/* Using local installation */

curl -X GET localhost:5000/api/v1/public/search/getAllData/:page

/* Using Openshift */

curl -X GET http://algolia-test-openshift-algolia-test-openshift.1d35.starter-us-east-1.openshiftapps.com/api/v1/public/search/getAllData/:page
```

### getFiltered

```
/* Using Docker */

curl -X GET localhost:5500/api/v1/public/search/getAllData/:page?query=query

/* Using local installation */

curl -X GET localhost:5000/api/v1/public/search/getAllData/:page?query=query

/* Using Openshift */

curl -X GET http://algolia-test-openshift-algolia-test-openshift.1d35.starter-us-east-1.openshiftapps.com/api/v1/public/search/getAllData/:page?query=query
```

## Configuration

Besides algolia settingings (appID, publicApiKey, privateApiKey, indexName), you can se also set port on which this application will run and CORS to improve security of API and APP itself.

```javsacript
{
	'algolia': {
		'appID': 'abdef',
		'publicApiKey': '123456',
		'privateApiKey': '1234abcd',
		'indexName': 'some_name'
	},
	'server': {
		'port': 5000,
		'cors': {
			'enabled': true,
			'whitelist': [] /* array of whitelisted domains for CORS */
		}
	}
}
```

## Navigation

To search data, you can use search input and use arrow keys to navigate.

To go to speciffic page or search query you can use following:


```
Using local installation:

localhost:5000?page=1
localhost:5000?page=1&query=News

Using docker installation:

localhost:5500?page=1
localhost:5500?page=1&query=News

Using openshift:

http://algolia-test-openshift-algolia-test-openshift.1d35.starter-us-east-1.openshiftapps.com?page=1
http://algolia-test-openshift-algolia-test-openshift.1d35.starter-us-east-1.openshiftapps.com?page=1&query=news
```

## Install using DOCKER

```
/* After building and running docker image, application will be accessible on localhost:5500 */

docker build -t algolia-test
docker run -p 5500:5000 algolia-test
```

## Run locally using Node.js

```
/* Application will be accessible on localhost:5000 */

npm install
node index.js
```

## Prview on Openshift

```
http://algolia-test-openshift-algolia-test-openshift.1d35.starter-us-east-1.openshiftapps.com
```