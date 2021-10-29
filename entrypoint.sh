#!/bin/bash
echo "Starting coingraph client..."

# Replace ENVs in static files
for filename in /usr/share/nginx/html/static/js/*.js; do
    echo "Replacing ENVs in $filename ..."
    sed -i "s/http:\/\/localhost/$REACT_APP_DAEMON_SOCKET_URL/" $filename
    sed -i "s/8081/$REACT_APP_DAEMON_SOCKET_PORT/" $filename
done

echo "Coingraph client is ready!"

# Run nginx 
nginx -g 'daemon off;'
