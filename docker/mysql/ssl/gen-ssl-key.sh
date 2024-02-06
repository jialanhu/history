openssl req -x509 -nodes -newkey rsa:2048 -keyout CA.key -out CA.crt -days 3650
openssl req -SHA-256 -nodes -newkey rsa:2048 -keyout server.key -out server.csr -days 3650
openssl req -SHA-256 -nodes -newkey rsa:2048 -keyout client.key -out client.csr -days 3650
openssl req -x509 -in server.csr -days 365 -CA CA.crt -CAkey CA.key -set_serial 01 -out server.crt
openssl req -x509 -in client.csr -days 365 -CA CA.crt -CAkey CA.key -set_serial 01 -out client.crt