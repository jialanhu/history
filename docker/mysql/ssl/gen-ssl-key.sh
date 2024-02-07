openssl req -x509 -nodes -newkey rsa:2048 -keyout CA.key -out CA.crt -days 3650 -subj "/CN=MySQL_Server_8.0.36_Auto_Generated_CA_Certificate";
openssl req -SHA-256 -nodes -newkey rsa:2048 -keyout server.key -out server.csr -days 3650 -subj "/CN=MySQL_Server_8.0.36_Auto_Generated_Server_Certificate";
openssl req -SHA-256 -nodes -newkey rsa:2048 -keyout client.key -out client.csr -days 3650 -subj "/CN=MySQL_Server_8.0.36_Auto_Generated_Server_Certificate";
openssl x509 -req -in server.csr -days 365 -CA CA.crt -CAkey CA.key -set_serial 01 -out server.crt
openssl x509 -req -in client.csr -days 365 -CA CA.crt -CAkey CA.key -set_serial 01 -out client.crt

openssl verify -CAfile CA.crt server.crt client.crt;