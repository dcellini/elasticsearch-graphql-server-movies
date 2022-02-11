import _ from "lodash";
import client from "../client.js";
import { ELASTICSEARCH_INDEX_NAME, BULK_DATA} from "../utils.js"

const initialBulk = {index: {_index: ELASTICSEARCH_INDEX_NAME}};
let collectionBulk = [];

/**
 * Generate own bulk schema:
 * {index: {_index: "catalog"}}
 * {name: "Some name of product", brand: "Name Brand", ...}
 */
_.map(_.keys(BULK_DATA), uuid => {
  collectionBulk = [
    ...collectionBulk, 
    initialBulk, 
    BULK_DATA[uuid]
  ];
});

client.bulk({body: collectionBulk}, function (err, r) {
  if (err) {
    console.log(collectionBulk)
    console.log(`Failed Bulk operation\n`, err);
  } else {
    console.log(collectionBulk)
    console.log(`🚀 Successfully imported ${_.keys(BULK_DATA).length} items \n`);
  }
});
