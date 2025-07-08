FROM node:22-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

# COPY ./ /usr/app
COPY ./ ./

RUN npm ci
RUN npm run test
RUN npm run clean
RUN npm run clean:server
RUN npm run build

RUN cp -r ./dist ./server/app

# RUN cd server
# RUN npm ci
RUN cd server && npm ci

ENV PORT=8083
ENV STATIC_FILES_PATH="./server/app"
# https://codewithyury.com/docker-run-vs-cmd-vs-entrypoint/
CMD ["node","server/index.js"]


