openssl req -x509 -nodes -newkey rsa:2048 -keyout ./influxdb-selfsigned.key -out ./influxdb-selfsigned.crt -days 365