FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Copy app
COPY . .

# Expose ports 
EXPOSE 3000

# Run command 
CMD [ "yarn", "start" ]