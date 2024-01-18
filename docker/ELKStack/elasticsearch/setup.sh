sed -i '4,$d' .env

echo "CA_FINGERPRINT=$(docker exec elasticsearch openssl x509 -fingerprint -sha256 -in config/certs/http_ca.crt |awk -F= '{print $2}' |tr -d : |tr -d '\n')" >> .env

echo "ELASTIC_PASSWORD=$(docker exec -u root elasticsearch elasticsearch-reset-password -u elastic -ab |awk -F: '{print $2}' |tr -d ' ' |tr -d '\n')"  >> .env
# echo "KIBANA_SYSTEM_PASSWORD=$(docker exec -u root elasticsearch elasticsearch-reset-password -u kibana_system -ab |awk -F: '{print $2}' |tr -d ' ' |tr -d '\n')"  >> .env
# echo "LOGSTASH_SYSTEM_PASSWORD=$(docker exec -u root elasticsearch elasticsearch-reset-password -u logstash_system -ab |awk -F: '{print $2}' |tr -d ' ' |tr -d '\n')"  >> .env
# echo "BEATS_SYSTEM_PASSWORD=$(docker exec -u root elasticsearch elasticsearch-reset-password -u beats_system -ab |awk -F: '{print $2}' |tr -d ' ' |tr -d '\n')"  >> .env
# echo "APM_SYSTEM_PASSWORD=$(docker exec -u root elasticsearch elasticsearch-reset-password -u apm_system -ab |awk -F: '{print $2}' |tr -d ' ' |tr -d '\n')"  >> .env
# echo "REMOTE_MONITORING_USER_PASSWORD=$(docker exec -u root elasticsearch elasticsearch-reset-password -u remote_monitoring_user -ab |awk -F: '{print $2}' |tr -d ' ' |tr -d '\n')"  >> .env

echo "KIBANA_TOKEN=$(docker exec -u root elasticsearch elasticsearch-create-enrollment-token -s kibana)"  >> .env