# build environment
FROM node:lts as build
# Create app directory
WORKDIR /usr/src/app
# Set environments
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./
RUN yarn 
# Copy app
COPY . .
# Build
RUN yarn build

# production environment
FROM nginx:stable
# Copy app
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# Expose ports 
EXPOSE 80
# Run command 
CMD ["nginx", "-g", "daemon off;"]
