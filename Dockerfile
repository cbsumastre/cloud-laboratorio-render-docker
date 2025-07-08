FROM node:22-alpine AS base

RUN mkdir -p /usr/app
WORKDIR /usr/app

# Prepare static files
FROM base AS build-front
COPY ./ ./
RUN npm ci
RUN npm run test
RUN npm run clean
RUN npm run clean:server
RUN npm run build

#Release
FROM base AS release
ENV STATIC_FILES_PATH="./public"
#RUN cp -r ./dist ./server/app
COPY --from=build-front /usr/app/dist ${STATIC_FILES_PATH}
# COPY ./server/package.json ./
# COPY ./server/package-lock.json ./
# COPY ./server/index.js ./
COPY --from=build-front /usr/app/server ./
RUN npm ci --omit=dev

ENV PORT=8083

# https://codewithyury.com/docker-run-vs-cmd-vs-entrypoint/
CMD ["node","index.js"]


