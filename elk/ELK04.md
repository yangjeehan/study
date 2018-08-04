#####매트릭 어그리게이션 ( 산술을 할 때 쓰임, min ,max등 ) 


$ cat simple_basketball.json
>{ "index" : { "_index" : "basketball", "_type" : "record", "_id" : "1" } }
{"team" : "Chicago Bulls","name" : "Michael Jordan", "points" : 30,"rebounds" : 3,"assists" : 4, "submit_date" : "1996-10-11"}
{ "index" : { "_index" : "basketball", "_type" : "record", "_id" : "2" } }
{"team" : "Chicago Bulls","name" : "Michael Jordan","points" : 20,"rebounds" : 5,"assists" : 8, "submit_date" : "1996-10-11"}

$ curl -XPOST 'localhost:9200/_bulk' --data-binary @simple_basketball.json

$ cat avg_points_aggs.json
>{
        "size" : 0,
        "aggs" : {
                "avg_score" : {
                        "avg" : {
                                "field" : "points"
                        }
                }
        }
}

$  curl -XGET localhost:9200/_search?pretty --data-binary @avg_points_aggs.json
>{
  "took" : 38,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "avg_score" : {
      "value" : 25.0
    }
  }
}

$ cat max_points_aggs.json
>{
        "size" : 0,
        "aggs" : {
                "max_score" : {
                        "max" : {
                                "field" : "points"
                        }
                }
        }
}

$  curl -XGET localhost:9200/_search?pretty --data-binary @max_points_aggs.json
>{
  "took" : 4,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "max_score" : {
      "value" : 30.0
    }
  }
}

$ cat min_points_aggs.json
>{
        "size" : 0,
        "aggs" : {
                "min_score" : {
                        "min" : {
                                "field" : "points"
                        }
                }
        }
}

$  curl -XGET localhost:9200/_search?pretty --data-binary @min_points_aggs.json
>{
  "took" : 2,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "min_score" : {
      "value" : 20.0
    }
  }
}

$  cat sum_points_aggs.json
>{
        "size" : 0,
        "aggs" : {
                "sum_score" : {
                        "sum" : {
                                "field" : "points"
                        }
                }
        }
}

$ curl -XGET localhost:9200/_search?pretty --data-binary @sum_points_aggs.json
>{
  "took" : 2,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "sum_score" : {
      "value" : 50.0
    }
  }
}

$ cat stats_points_aggs.json
>{
        "size" : 0,
        "aggs" : {
                "stats_score" : {
                        "stats" : {
                                "field" : "points"
                        }
                }
        }
}

$ curl -XGET localhost:9200/_search?pretty --data-binary @stats_points_aggs.json
>{
  "took" : 2,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "stats_score" : {
      "count" : 2,
      "min" : 20.0,
      "max" : 30.0,
      "avg" : 25.0,
      "sum" : 50.0
    }
  }
}










