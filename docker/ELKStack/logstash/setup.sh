# refresh env
docker compose up -d logstash

# copy cert from elasticsearch to logstash
docker exec logstash mkdir -p /usr/share/logstash/config/certs
docker cp elasticsearch:/usr/share/elasticsearch/config/certs/http_ca.crt ./http_ca.crt
docker cp ./http_ca.crt logstash:/usr/share/logstash/config/certs/http_ca.crt
rm ./http_ca.crt

# setup jdbc_driver_library
if [ "$1" == "jdbc" ]; then
  filename="$(ls ./ | grep mysql-connector-j-*.jar)"
  if [ "$filename" == "" ]; then
    wget https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/8.0.33/mysql-connector-j-8.0.33.jar
  fi
  docker cp ./$filename logstash:/usr/share/logstash/$filename
fi

docker restart logstash