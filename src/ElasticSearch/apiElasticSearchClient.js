import ElasticSearchClient from "./elasticSearchClient.js"

const ApiElasticSearchClient = (res, schema) => 
  // perform the actual search passing in the index, the search query and the type
  ElasticSearchClient({...schema})
    .then(r => res.send(r['hits']['hits']))
    .catch(e => {
      console.error(e);
      res.send([]);
    });


export default ApiElasticSearchClient;
