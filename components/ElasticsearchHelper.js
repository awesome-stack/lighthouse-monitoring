const elasticsearch = require('elasticsearch');

module.exports = class ElasticsearchHelper {

  static postEs(esHost, indexName, jsonData) {
    const client = new elasticsearch.Client({
      host: esHost,
      log: 'info'
    });
    client.bulk({
      body: [
        { "index": { "_index": indexName, "_type": indexName } },
        jsonData,
      ]
    }, function (err, resp) {
      if (err !== undefined) {
        console.log(err);
      } else {
        console.log(resp);
      }
    });
  }

}
