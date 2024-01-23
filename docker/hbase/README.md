### Download Hbase
```bash
wget https://dlcdn.apache.org/hbase/2.5.7/hbase-2.5.7-bin.tar.gz
```

### Build Docker Image
```bash
docker build -t hbase:2.5.7 .
```

### Run
```bash
docker comopse up -d
```