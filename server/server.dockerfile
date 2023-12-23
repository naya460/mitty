FROM node:20-alpine
ENV LANG ja_JP.utf8
WORKDIR /server
RUN apk add --no-cache \
  build-base \
  cairo-dev \
  pango-dev \
  jpeg-dev \
  giflib-dev \
  librsvg-dev \
  pixman-dev