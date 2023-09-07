FROM node:alpine

WORKDIR /app/

ADD package.json package-lock.json ./
RUN npm i

ADD . /app/
RUN npm run build

FROM staticdeploy/app-server:cra-runtime
COPY --from=0 /app/build /build