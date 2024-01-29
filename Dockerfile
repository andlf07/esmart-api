FROM node:18 as build

RUN apt-get update && apt-get install -y build-essential gcc autoconf automake zlib1g-dev libpng-dev libvips-dev && rm -rf /var/cache/apk/* > /dev/null 2>&1

WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN npm install
WORKDIR /opt/app
COPY ./ .
RUN npm run build

FROM node:18

RUN apt-get update && apt-get install -y libvips-dev
RUN rm -rf /var/cache/apk/*
WORKDIR /opt/app
COPY --from=build /opt/node_modules ./node_modules

ENV PATH /opt/node_modules/.bin:$PATH
COPY --from=build /opt/app ./
EXPOSE 8080
CMD ["npm", "run","start:prod"]