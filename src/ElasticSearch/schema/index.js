// This schema is utilised in server.elasticsearch.js
const getAllSchema = {
  "size": 1000,
  "from": 0,
  "query": {
    "match_all": {}
  }
};

export default getAllSchema;

