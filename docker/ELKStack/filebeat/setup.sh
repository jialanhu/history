
# refresh env
docker compose up -d filebeat;

docker cp filebeat/filebeat.yml filebeat:/usr/share/filebeat/filebeat.yml;

docker restart filebeat;
