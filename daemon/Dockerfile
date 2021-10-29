FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Copy app
COPY . .

# Expose ports 
EXPOSE 8080 8081

# Run command 
ENTRYPOINT [ "node", "app.js" ]
CMD []