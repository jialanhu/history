openssl req -x509 -nodes -newkey rsa:2048 -keyout ca-key.pem -out ca.pem -days 3650 -subj "/CN=MySQL_Server_8.0.36_Auto_Generated_CA_Certificate";
openssl req -SHA-256 -nodes -newkey rsa:2048 -keyout server-key.pem -out server-req.pem -days 3650 -subj "/CN=MySQL_Server_8.0.36_Auto_Generated_Server_Certificate";
openssl req -SHA-256 -nodes -newkey rsa:2048 -keyout client-key.pem -out client-req.pem -days 3650 -subj "/CN=MySQL_Client_8.0.36_Auto_Generated_Server_Certificate";
openssl x509 -req -in server-req.pem -days 365 -CA ca.pem -CAkey ca-key.pem -set_serial 01 -out server-cert.pem
openssl x509 -req -in client-req.pem -days 365 -CA ca.pem -CAkey ca-key.pem -set_serial 01 -out client-cert.pem

openssl verify -CAfile ca.pem server-cert.pem client-cert.pem;