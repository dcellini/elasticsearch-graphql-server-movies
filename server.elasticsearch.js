const client = require('./server.client');
const elasticSearchSchema = require('./server.es.schema');

/**
 * TODO Ping the CLIENT to be sure 
 * *** ElasticSearch *** is up
 */
client.ping({
  requestTimeout: 30000,
}, function (error) {
  error
    ? console.error('ElasticSearch cluster is down!')
    : console.log('ElasticSearch is ok');
});

// The ApiElasticSearchClient function below calls this and passes in the elasticsearch schema
function ElasticSearchClient(elasticSearchSchema) {
  // perform the actual search passing in the index, the search query and the type
  return client.search({index: 'catalog', body: elasticSearchSchema});
}

function ApiElasticSearchClient(req, res) {
  // perform the actual search passing in the index, the search query and the type
  ElasticSearchClient({...elasticSearchSchema})
    .then(r => res.send(r['hits']['hits']))
    .catch(e => {
      console.error(e);
      res.send([]);
    });
}

module.exports = {
  ApiElasticSearchClient,
  ElasticSearchClient
};
