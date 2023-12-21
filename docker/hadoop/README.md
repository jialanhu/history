### Namenode UI
http://{{ip}}:9870/

### ResourceManager UI
http://location:8088/

### Running an example Job
yarn jar share/hadoop/mapreduce/hadoop-mapreduce-examples-3.X.X.jar pi 10 15

### HDFS
#### Create Folder
hadoop fs -ls /
hadoop fs -mkdir /hello

#### Put File
echo "hello" >> hello.txt
hadoop fs -put hello.txt /hello/

#### Get File
hadoop fs -get /hello/hello.txt

#### Cat File Content
hadoop fs -cat /hello/hello.txt

#### Remove File
hadoop fs -rm /hello/hello.txt