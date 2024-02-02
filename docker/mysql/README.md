## run
```bash
docker compose up -d
```

### setup slave

```bash
docker exec -it mysql-slave /bin/bash

mysql -u root -p
# enter password

CHANGE MASTER TO MASTER_HOST='mysql-master',MASTER_USER='root',MASTER_PASSWORD='secret';
START SLAVE;

# check slave status
SHOW SLAVE STATUS \G
```
|||
|-|-|
|Slave_IO_Running|Yes|
|Slave_SQL_Running|Yes|