### command
```bash
sudo docker compose -f docker-elk.yml up -d


sudo docker exec -it elasticsearch /bin/bash
## get your ca fingerprint
openssl x509 -fingerprint -sha256 -in config/certs/http_ca.crt | awk -F= '{print $2}' | tr -d : | tr -d '\n'
## reset elasticsearch password
elasticsearch-reset-password -u elastic -i
## gen kabana token
elasticsearch-create-enrollment-token -s kibana
exit


## get kibana verification-code
sudo docker exec kibana kibana-verification-code


## open kibana web
http://localhost:5601/


sudo docker exec -it metricbeat /bin/bash
## edit metricbeat.yml reference ./metricbeat/metricbeat.yml
apt update && apt upgrade -y && apt install vim -y
vim metricbeat.yml
metricbeat test config

metricbeat modules enable docker

## https://www.elastic.co/guide/en/beats/metricbeat/8.8/metricbeat-module-docker.html
vim modules.d/docker.yml

metricbeat setup -e
## -e is optional and sends output to standard error instead of the configured log output.
exit


## restart metricbeat
sudo docker restart metricbeat
```
