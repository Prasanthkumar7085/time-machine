FROM node:latest

WORKDIR /app/

ADD package.json yarn.lock ./

RUN yarn

CMD ["yarn", "start"]