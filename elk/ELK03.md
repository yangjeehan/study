#####버킷 어그리게이션
버켓 어그리게이션은 (group by) 라고 생각하면 된다,
팀별로 그룹 지어주는 개념 

실습전 INDEX에 삽입 : 
$ curl -XPUT localhost:9200/basketball

$ cat basketball_mapping.json
>{
        "record" : {
                "properties" : {
                        "team" : {
                                "type" : "string",
                                "fielddata" : true
                        },
                        "name" : {
                                "type" : "string",
                                "fielddata" : true
                        },
                        "points" : {
                                "type" : "long"
                        },
                        "rebounds" : {
                                "type" : "long"
                        },
                        "assists" : {
                                "type" : "long"
                        },
                        "blocks" : {
                                "type" : "long"
                        },
                        "submit_date" : {
                                "type" : "date",
                                "format" : "yyyy-MM-dd"
                        }
                }
        }
}

$ curl -XPUT 'localhost:9200/basketball/record/_mapping' -d @basketball_mapping.json

$  cat twoteam_basketball.json
>{ "index" : { "_index" : "basketball", "_type" : "record", "_id" : "1" } }
{"team" : "Chicago","name" : "Michael Jordan", "points" : 30,"rebounds" : 3,"assists" : 4, "blocks" : 3, "submit_date" : "1996-10-11"}
{ "index" : { "_index" : "basketball", "_type" : "record", "_id" : "2" } }
{"team" : "Chicago","name" : "Michael Jordan","points" : 20,"rebounds" : 5,"assists" : 8, "blocks" : 4, "submit_date" : "1996-10-13"}
{ "index" : { "_index" : "basketball", "_type" : "record", "_id" : "3" } }
{"team" : "LA","name" : "Kobe Bryant","points" : 30,"rebounds" : 2,"assists" : 8, "blocks" : 5, "submit_date" : "2014-10-13"}
{ "index" : { "_index" : "basketball", "_type" : "record", "_id" : "4" } }
{"team" : "LA","name" : "Kobe Bryant","points" : 40,"rebounds" : 4,"assists" : 8, "blocks" : 6, "submit_date" : "2014-11-13"}


##### ADD BASKETBALL DOCUMENTS
$ curl -XPOST 'localhost:9200/_bulk' --data-binary @twoteam_basketball.json

TERM AGGS ( GROUP BY TEAM )
>  cat terms_aggs.json
{
        "size" : 0,
        "aggs" : {
                "players" : {
                        "terms" : {
                                "field" : "team"
                        }
                }
        }
}



$ curl -XGET localhost:9200/_search?pretty --data-binary @terms_aggs.json
>{
  "took" : 13,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 4,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "players" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : "chicago",
          "doc_count" : 2
        },
        {
          "key" : "la",
          "doc_count" : 2
        }
      ]
    }
  }
}

##### AGGS (STATS GROUP BY TEAM) 

$ cat stats_by_team.json
>{
        "size" : 0,
        "aggs" : {
                "team_stats" : {
                        "terms" : {
                                "field" : "team"
                        },
                        "aggs" : {
                                "stats_score" : {
                                        "stats" : {
                                                "field" : "points"
                                        }
                                }
                        }
                }
        }
}

$ curl -XGET localhost:9200/_search?pretty --data-binary @stats_by_team.json
>{
  "took" : 3,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 4,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "aggregations" : {
    "team_stats" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : "chicago",
          "doc_count" : 2,
          "stats_score" : {
            "count" : 2,
            "min" : 20.0,
            "max" : 30.0,
            "avg" : 25.0,
            "sum" : 50.0
          }
        },
        {
          "key" : "la",
          "doc_count" : 2,
          "stats_score" : {
            "count" : 2,
            "min" : 30.0,
            "max" : 40.0,
            "avg" : 35.0,
            "sum" : 70.0
          }
        }
      ]
    }
  }
}







