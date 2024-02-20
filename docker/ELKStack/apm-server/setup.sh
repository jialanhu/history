# refresh env
docker compose up -d apm-server

# copy cert from elasticsearch to apm-server
docker exec apm-server mkdir -p /usr/share/apm-server/config/certs
docker cp elasticsearch:/usr/share/elasticsearch/config/certs/http_ca.crt ./http_ca.crt
docker cp ./http_ca.crt apm-server:/usr/share/apm-server/config/certs/http_ca.crt
rm ./http_ca.crt

docker cp ./apm-server/apm-server.yml apm-server:/usr/share/apm-server/apm-server.yml

docker restart apm-server