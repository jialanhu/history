# metricbeat modules enable docker
## https://www.elastic.co/guide/en/beats/metricbeat/8.8/metricbeat-module-docker.html

## metricbeat setup -e;
## -e is optional and sends output to standard error instead of the configured log output.
docker compose up -d metricbeat; # refresh env
docker cp metricbeat/metricbeat.yml metricbeat:/usr/share/metricbeat/metricbeat_new.yml;
docker exec metricbeat bash -c '
    cd /usr/share/metricbeat;
    chown root metricbeat_new.yml;
    cp metricbeat_new.yml metricbeat.yml;
    rm metricbeat_new.yml;
    metricbeat test config;
    metricbeat modules enable docker;
    metricbeat setup -e;
';