docker compose up -d logstash; # refresh env
docker exec logstash mkdir -p /usr/share/logstash/config/certs
docker cp elasticsearch:/usr/share/elasticsearch/config/certs/http_ca.crt ./http_ca.crt
docker cp ./http_ca.crt logstash:/usr/share/logstash/config/certs/http_ca.crt
rm ./http_ca.crt

filename="$(ls ./ | grep mysql-connector-j-*.jar)"
if [ "$filename" != "" ]; then
  docker cp ./$filename logstash:/usr/share/logstash/$filename
fi

docker restart logstash