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

> edit logstash/pipeline/logstash.conf

#### input from jdbc

> copy cert and setup jdbc_driver_library

```basj
logstash/setup.sh jdbc
```

#### input from other

```basj
logstash/setup.sh
```

### metricbeat

> refresh env
> refresh config
> enable docker module and setup

```bash
metricbeat/setup.sh
```

### filebeat

> refresh env
> refresh config

```bash
filebeat/setup.sh
```

### apm-server
####  Set up and configure
##### Install the APM integration
1. Open Kibana and select Add integrations > Elastic APM.
2. Click APM integration.
3. Click Add Elastic APM.
4. Click Save and continue.
5. Click Add Elastic Agent later.

#### Setup 
```bash
apm-server/setup.sh
```
