
Project is based on this
https://github.com/rymaruk/app-react-graphql-elasticsearchjs

### docker-compose.yml
Thanks to this file, running `docker-compse up` in a terminal will start elasticsearch and kibana.

### server.client.js
To get this Elasticsearch client up and running you will need to have run `yarn add elasticsearch -S` if you have not already done so

### Create Index
Navigate to the indexes folder in the terminal and run `node create-index`
In elasticsearch run the following command and you should see the index `GET /_cat/indices`
In elasticsearch you can verify the explicit mapping structure you have created at `GET /movies/_mapping`

### Delete Index
Navigate to the indexes folder in the terminal and run `node delete-index` to delete the index you have just created
In elasticsearch run the following command and you should see the index has gone `GET /_cat/indices`

### Bulk import
Import the list of movies from json/movies.js by navigating to the indexes folder and running `node bulk-import`
In elasticsearch run the following command to see your documents `GET /movies/_search`
