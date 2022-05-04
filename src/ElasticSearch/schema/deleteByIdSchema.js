
// This schema is utilised in server.elasticsearch.js
const deleteByIdSchema = (id) => {
    return {
        "size": 1000,
        "from": 0,
        "query": {
            "match": {
                "_id": id
            }
        }
    }
};
  
  export default delete;
  
  