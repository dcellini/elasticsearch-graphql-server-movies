import client from './client.js';
import {ELASTICSEARCH_INDEX_NAME} from "./utils.js"
/**
 * TODO Ping the CLIENT to be sure 
 * *** ElasticSearch *** is up
 */
// client.ping({
//   requestTimeout: 30000,
// }, function (error) {
//   error
//     ? console.error('ElasticSearch cluster is down!')
//     : console.log('ElasticSearch is ok');
// });

// The ApiElasticSearchClient function below calls this and passes in the elasticsearch schema
const ElasticSearchClient = (elasticSearchSchema) => {
  // perform the actual search passing in the index, the search query and the type
  return client.search({index: ELASTICSEARCH_INDEX_NAME, body: elasticSearchSchema});
}

export default ElasticSearchClient;