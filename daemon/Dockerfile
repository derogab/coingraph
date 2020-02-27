FROM node:10
WORKDIR /usr/src/app
COPY . .
RUN yarn
EXPOSE 8080 8081
ENTRYPOINT [ "node", "app.js" ]
CMD []