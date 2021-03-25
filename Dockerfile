FROM node:14.16.0-alpine3.13
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
RUN npm install
# RUN npm run react-dev

EXPOSE 3000
CMD [ "npm", "start" ]