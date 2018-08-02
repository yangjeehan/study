엘라스틱설치
---------------
설치환경 
ubuntu - 16.04
elastic - 5.1.1

먼저 자바를 설치해야한다
#####자바설치 
> apt-get update
apt-get install software-properties-common -y
add-apt-repository ppa:webupd8team/java
apt-get update  
apt-get install oracle-java8-installer -y

#####엘라스틱설치 ( 여기선 5.1.1 버전을 설치했다 )
>wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.1.1.deb
dpkg -i elasticsearch-5.1.1.deb
service elasticsearch stop
service elasticsearch start

아래와 같은 명령어로 확인
>curl -XGET 'localhost:9200'
{
  "name" : "GNYONiW",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "AZBiU8d3TL-AiixyGTAw",
  "version" : {
    "number" : "5.1.1",
    "build_hash" : "5395e21",
    "build_date" : "2016-12-06T12:36:15.409Z",
    "build_snapshot" : false,
    "lucene_version" : "6.3.0"
  },
  "tagline" : "You Know, for Search"
}

사용방법 
##### 인덱스 삭제 
> curl -XDELETE localhost:9200/classes

#### 업데이트
> curl -XPUT localhost:9200/classes       

##### 인덱스 입력 
> curl -XPOST http://localhost:9200/classes/class/1/ -d '{"title":"Algorithm", "professor":"John" }'

##### json파일을 통해 입력도 가능하다 
> $ cat oneclass.json
{
    "title" : "test",
    "professor": "yyy",
    "rating" : 5
}

##### 파일을 통한 입력 
> curl -XPOST http://localhost:9200/classes/class/1/ -d @oneclass.json

##### 조회
> curl -XGET http://localhost:9200/classes/class/1/?pretty
{
  "_index" : "classes",
  "_type" : "class",
  "_id" : "1",
  "_version" : 2,
  "found" : true,
  "_source" : {
    "title" : "test",
    "professor" : "yyy",
    "rating" : 5
  }
}

##### 정리
> curl -XGET localhost:9200/classes/class/1 ( select * from class where id =1 ) 
curl -XPOST localhost:9200/classes/class/1 -d '{xxx}' ( insert into class values {xxx} )
curl -XPUT localhost:9200/classes/class/1  ( update class set xxx where id =1 ) 
curl -XDELETE localhost:9200/classes/class/1 ( delete from class where id =1 ) 

 
