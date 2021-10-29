# build environment
FROM node:lts as build

# Create app directory
WORKDIR /usr/src/app

# Set environments
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Copy app
COPY . .

# Build
RUN npm run build


# production environment
FROM nginx:alpine

# Create app directory
WORKDIR /usr/src/app

# Copy app
COPY entrypoint.sh .
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Make the entrypoint executable
RUN chmod +x ./entrypoint.sh

# Expose ports 
EXPOSE 80

# Run command 
ENTRYPOINT ["./entrypoint.sh"]
