### command
```bash
docker compose up -d
```
#### elasticsearch
```bash
elasticsearch/setup.sh
```

#### kibana
```bash
## open kibana web
http://localhost:5601/
## enter .env -> KIBANA_TOKE

## get kibana verification-code
docker exec kibana kibana-verification-code
```

#### metricbeat
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