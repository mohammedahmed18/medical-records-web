#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

sudo docker rm --force medical-records-proxy

working_dir="$PWD/nginx"
nginx_dev_conf="$working_dir/nginx.dev.conf"
nginx_error_log="$working_dir/error.log"

rm -rf "$nginx_dev_conf"

config="
worker_processes  1;


events {
  worker_connections 1024;
}

http {

  server {
    listen 80;
    server_name _;
    
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3001;
    }


  }
}"

echo "$config" > "$nginx_dev_conf"


docker run \
  --name medical-records-proxy \
  --publish 80:80 \
  --publish 443:443 \
  --add-host=host.docker.internal:host-gateway \
  --volume "$nginx_dev_conf:/etc/nginx/nginx.conf:ro" \
  nginx:alpine\
  >/dev/null

echo "nginx server is running 🎉"
