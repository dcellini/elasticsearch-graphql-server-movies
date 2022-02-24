import elasticSearchSchema from "./schema/index.js";
import ElasticSearchClient from "./elasticSearchClient.js"

const ApiElasticSearchClient = (req, res) => {
  // perform the actual search passing in the index, the search query and the type
  ElasticSearchClient({...elasticSearchSchema})
    .then(r => res.send(r['hits']['hits']))
    .catch(e => {
      console.error(e);
      res.send([]);
    });
}

export default ApiElasticSearchClient;
