FROM node:lts-alpine3:10
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install
RUN npm run react-dev

EXPOSE 3000
CMD ["node", "server"]