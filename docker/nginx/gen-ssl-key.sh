mkdir -p ./certs/
openssl genpkey -algorithm RSA -out ./certs/private.key
openssl req -new -key ./certs/private.key -out ./certs/csr.pem
openssl req -x509 -sha256 -days 365 -key ./certs/private.key -in ./certs/csr.pem -out ./certs/certificate.crt
