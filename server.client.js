const ElasticSearch = require('elasticsearch');

/**
 * *** ElasticSearch *** client
 * @type {Client}
 */

// The below will only work by running yarn add elasticsearch -S if not already done
const client = new ElasticSearch.Client({
  hosts: ['http://127.0.0.1:9200']
});

// used in previous code for bonsaid
// const client = new ElasticSearch.Client({
//   host: 'https://c3s7fzosyt:7oz4htt742@elasticsearch-books-636535958.eu-west-1.bonsaisearch.net:443',
//   log: 'trace'
// });

module.exports = client;
