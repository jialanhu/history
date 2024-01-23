FROM ubuntu:latest

RUN apt update && apt install openjdk-8-jdk -y
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64

COPY ./hbase-2.5.7-bin.tar.gz /root/hbase-2.5.7-bin.tar.gz
RUN tar -vxf /root/hbase-2.5.7-bin.tar.gz -C /root

WORKDIR /root/hbase-2.5.7

CMD ["/bin/bash", "-c", "bin/start-hbase.sh && tail -f"]
