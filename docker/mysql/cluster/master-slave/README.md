## run
```bash
docker compose up -d
```

### setup slave

```bash
docker exec -it mysql-slave /bin/bash

mysql -u root --password=secret

CHANGE MASTER TO MASTER_HOST='mysql-master',MASTER_USER='root',MASTER_PASSWORD='secret',GET_MASTER_PUBLIC_KEY=1;
START SLAVE;

# check slave status
SHOW SLAVE STATUS \G
```
|||
|-|-|
|Slave_IO_Running|Yes|
|Slave_SQL_Running|Yes|

### set slave super_read_only
```bash
docker exec -it mysql-slave /bin/bash

mysql -u root --password=secret

SET GLOBAL super_read_only=ON;
```