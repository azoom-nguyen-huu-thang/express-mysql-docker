FROM alpine:latest
RUN apk update \
  && apk add npm
WORKDIR /
COPY /package*.json ./
RUN npm install
COPY . .
RUN npm i -g prisma
RUN prisma generate
EXPOSE 3000
CMD ["npm", "start"]

