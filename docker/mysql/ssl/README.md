## run
```bash
docker compose up -d
```

### setup 
```bash
docker cp ./my.cnf mysql-ssl:/etc/my.cnf
docker restart mysql-ssl
```

## get certs
> 
```bash
docker cp mysql-ssl:/var/lib/mysql/ca.pem ./
docker cp mysql-ssl:/var/lib/mysql/client-key.pem ./
docker cp mysql-ssl:/var/lib/mysql/client-cert.pem ./
```

## connect mysql
```bash
mysql -u root -h 127.0.0.1 --ssl-ca=./ca.pem --ssl-cert=./client-cert.pem --ssl-key=./client-key.pem --password=secret
```