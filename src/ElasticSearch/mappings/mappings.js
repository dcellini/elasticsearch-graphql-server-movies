const settings = {
  "settings": {
    "number_of_shards" : 1,
    "max_ngram_diff":  99,
    "max_shingle_diff": 99,
    "analysis": {
      "analyzer": {
        "brand_analyzer": {
          "tokenizer": "whitespace",
          "filter": [
            "lowercase",
            "trim"
          ]
        },
        "article_analyzer": {
          "tokenizer": "whitespace",
          "filter": [
            "lowercase"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "uuid": {
        "type": "text"
      },
      // text
      "title": {
        "type": "text",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      },
      // number
      "year": {
        "type": "date",
        "format": "year",
      },
      // number
      "runtime": {
        "type": "text",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      },
      // array
      "genres": {
        "type": "text",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      },
      // string
      "director": {
        "type": "text",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      },
      // array
      "actors": {
        "type": "text",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      },
      // long text
      "plot": {
        "type": "text",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      }
    }
  }
}

export default settings;