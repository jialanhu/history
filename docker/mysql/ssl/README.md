## Automatic SSL and RSA File Generation

### Run

```bash
docker compose up -d mysql-ssl-auto
```

### Setup

```bash
docker cp ./my.cnf mysql-ssl-auto:/etc/my.cnf

docker restart mysql-ssl-auto
```

### Get Certs

>

```bash
docker cp mysql-ssl-auto:/var/lib/mysql/ca.pem ./CA.crt
docker cp mysql-ssl-auto:/var/lib/mysql/client-key.pem ./client.key
docker cp mysql-ssl-auto:/var/lib/mysql/client-cert.pem ./client.crt
```

## Manual SSL and RSA File Generation

### Run

```bash
docker compose up -d mysql-ssl-manual
```

### Gen

```bash
./gen-ssl-key.sh
```

### Setup

```bash
docker cp ./CA.crt  mysql-ssl-manual:/var/lib/mysql/ca.pem
docker cp ./server.key mysql-ssl-manual:/var/lib/mysql/server-key.pem
docker cp ./server.crt mysql-ssl-manual:/var/lib/mysql/server-cert.pem
docker cp ./my.cnf mysql-ssl-manual:/etc/my.cnf

docker restart mysql-ssl-manual
```

## connect mysql

```bash
mysql -u root -h 127.0.0.1 --ssl-ca=./CA.crt --ssl-cert=./client.crt --ssl-key=./client.key --password=secret
```
