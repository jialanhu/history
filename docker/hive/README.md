### Usage
#### beeline
docker exec -it hiveserver2 beeline -u 'jdbc:hive2://hiveserver2:10000/'

#### Run queries
```
  show tables;
  create table hive_example(a string, b int) partitioned by(c int);
  alter table hive_example add partition(c=1);
  insert into hive_example partition(c=1) values('a', 1), ('a', 2),('b',3);
  select count(distinct a) from hive_example;
  select sum(b) from hive_example;
```