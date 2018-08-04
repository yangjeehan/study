##### 엘라스틱서치 벌크
$ curl -XPOST http://localhost:9200/_bulk?pretty --data-binary @test.json
> 
{ "index" : { "_index" : "classes", "_type" : "class", "_id" : "1" } }
{"title" : "Machine Learning","Professor" : "Minsuk Heo","major" : "Computer Science","semester" : ["spring", "fall"],"student_count" : 100,"unit" : 3,"rating" : 5, "submit_date" : "2016-01-02", "school_location" : {"lat" : 36.00, "lon" : -120.00}}
{ "index" : { "_index" : "classes", "_type" : "class", "_id" : "2" } }
{"title" : "Network","Professor" : "Minsuk Heo","major" : "Computer Science","semester" : ["fall"],"student_count" : 50,"unit" : 3,"rating" : 4, "submit_date" : "2016-02-02", "school_location" : {"lat" : 36.00, "lon" : -120.00}}
{ "index" : { "_index" : "classes", "_type" : "class", "_id" : "3" } }
{"title" : "Operating System","Professor" : "Minsuk Heo","major" : "Computer Science","semester" : ["spring"],"student_count" : 50,"unit" : 3,"rating" : 4, "submit_date" : "2016-03-02", "school_location" : {"lat" : 36.00, "lon" : -120.00}}

확인하기
$  curl -XGET http://localhost:9200/classes/class/1?pretty
>   "_index" : "classes",
  "_type" : "class",
  "_id" : "1",
  "_version" : 1,
  "found" : true,
  "_source" : {
    "title" : "Machine Learning",
    "Professor" : "Minsuk Heo",
    "major" : "Computer Science",
    "semester" : [
      "spring",
      "fall"
    ],
    "student_count" : 100,
    "unit" : 3,
    "rating" : 5,
    "submit_date" : "2016-01-02",
    "school_location" : {
      "lat" : 36.0,
      "lon" : -120.0
    }
  }
}


