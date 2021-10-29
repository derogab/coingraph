#!/bin/bash

# Replace ENVs in static files
for filename in /usr/share/nginx/html/static/js/*.js; do
    sed -i 's/{{url}}/$REACT_APP_DAEMON_SOCKET_URL/' $filename
    sed -i 's/{{port}}/$REACT_APP_DAEMON_SOCKET_PORT/' $filename
done

# Run nginx 
nginx -g 'daemon off;'
