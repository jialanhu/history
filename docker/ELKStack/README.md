## run all
```bash
docker compose up -d
```
### elasticsearch
> generate `CA_FINGERPRINT` and `KIBANA_TOKEN`  
> reset [built-in-users](https://www.elastic.co/guide/en/elasticsearch/reference/current/built-in-users.html) password (randomly-generated)  
```bash
elasticsearch/setup.sh
```

### kibana
#### open kibana web
http://localhost:5601/
#### cat KIBANA_TOKEN
```bash
cat .env |grep KIBANA_TOKEN
```
#### generate kibana verification-code
```bash
docker exec kibana kibana-verification-code
```

### logstash
> input from jdbc

#### copy cert and setup jdbc_driver_library
```basj
logstash/setup.sh
```

### metricbeat
> refresh env
> refresh metricbeat config
> enable docker module and setup
```bash
metricbeat/setup.sh
```

<!-- TODO
#### filebeat
```bash
## edit filebeat.yml -> ca-fingerprint and es-password
docker cp filebeat/filebeat.yml filebeat:/usr/share/filebeat/filebeat.yml
docker exec -it filebeat /bin/bash
filebeat test config
filebeat setup -e
exit
docker restart filebeat
``` -->