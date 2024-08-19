mkdir -p ./certs/

openssl req -x509 -nodes -newkey rsa:2048 -keyout ./certs/ca-key.pem -out ./certs/ca.pem -days 3650 -subj "/CN=Localhost_CA_Certificate";
openssl req -SHA-256 -nodes -newkey rsa:2048 -keyout ./certs/server-key.pem -out ./certs/server-req.pem -days 3650 -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost";
openssl req -SHA-256 -nodes -newkey rsa:2048 -keyout ./certs/client-key.pem -out ./certs/client-req.pem -days 3650 -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost";
openssl x509 -req -in ./certs/server-req.pem -days 365 -CA ./certs/ca.pem -CAkey ./certs/ca-key.pem -set_serial 01 -out ./certs/server-cert.pem
openssl x509 -req -in ./certs/client-req.pem -days 365 -CA ./certs/ca.pem -CAkey ./certs/ca-key.pem -set_serial 01 -out ./certs/client-cert.pem

openssl verify -CAfile ./certs/ca.pem ./certs/server-cert.pem ./certs/client-cert.pem;