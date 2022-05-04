import client from "../client.js";
import settings from "../mappings/mappings.js"
import {ELASTICSEARCH_INDEX_NAME} from "../utils.js"

client.indices.create(
  {
    index: ELASTICSEARCH_INDEX_NAME,
    body: settings
  },
  (error, response, status) => {
    if(!error) {
      console.info("\n🚀 Created a new index");
      console.info(response);
      console.info('\n');
    } else {
      console.info(error);
    }

  }
);
