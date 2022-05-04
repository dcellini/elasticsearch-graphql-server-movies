import client from "../client.js";
import {ELASTICSEARCH_INDEX_NAME} from "../utils.js"

client.indices.delete(
  {
    index: ELASTICSEARCH_INDEX_NAME
  },
  (error, response) => {
    if(!error) {
      console.info("🚀 Deleted index");
      console.info(response);
    } else {
      console.info(error);
    }

  }
);
