read -p "Enter Domain Name: " domain;
read -p "Enter IP: " ip;

zone="
zone \"${domain}\" {
    type master;
    file \"/etc/bind/db.$domain\";
};
"

db="\$TTL    86400
@       IN      SOA     $domain. root.$domain. (
                        2023082301         ; Serial
                        3600               ; Refresh
                        600                ; Retry
                        86400              ; Expire
                        3600 )             ; Negative Cache TTL

@       IN      NS      dns.$domain.
@       IN      A       $ip
dns     IN      A       $ip
www     IN      CNAME   $domain.
"

command="echo '$zone' >> /etc/bind/named.conf.default-zones"
docker exec dns sh -c "$command"

command="echo '$db' >> /etc/bind/db.${domain}"
docker exec dns sh -c "$command"