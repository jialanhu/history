### command
```bash
sudo docker compose -f docker-elk.yml up -d
```
#### elasticsearch
```bash
sudo docker exec -it elasticsearch /bin/bash
## get your ca fingerprint
openssl x509 -fingerprint -sha256 -in config/certs/http_ca.crt | awk -F= '{print $2}' | tr -d : | tr -d '\n'
## reset elasticsearch password
elasticsearch-reset-password -u elastic -i
## gen kabana token
elasticsearch-create-enrollment-token -s kibana
exit
```

#### kibana
```bash
## replace kibana.yml
sudo docker cp kibana/kibana.yml kibana:/usr/share/kibana/config/kibana.yml
sudo docker restart kibana
## get kibana verification-code
sudo docker exec kibana kibana-verification-code
## open kibana web
http://localhost:5601/

```

#### metricbeat
```bash
sudo docker cp metricbeat/metricbeat.yml metricbeat:/usr/share/metricbeat/metricbeat.yml
sudo docker exec -it metricbeat /bin/bash
metricbeat test config

metricbeat modules enable docker
## https://www.elastic.co/guide/en/beats/metricbeat/8.8/metricbeat-module-docker.html

metricbeat setup -e
## -e is optional and sends output to standard error instead of the configured log output.
exit

## restart metricbeat
sudo docker restart metricbeat
```

#### filebeat
```bash
sudo docker cp filebeat/filebeat.yml filebeat:/usr/share/filebeat/filebeat.yml
sudo docker exec -it filebeat /bin/bash
filebeat test config
filebeat setup -e
exit
sudo docker restart filebeat
```