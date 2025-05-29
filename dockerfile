FROM node:22-alpine3.20 AS base

ENV DIR=/app

WORKDIR $DIR


FROM base AS dev

ENV NODE_ENV=development

RUN apk update && apk add --no-cache dumb-init=1.2.5-r3

COPY package*.json $DIR

RUN npm install

COPY tsconfig*.json $DIR

COPY src $DIR/src

EXPOSE $PORT

CMD ["npm", "run", "dev"]


FROM base AS build

RUN apk update && apk add --no-cache dumb-init=1.2.5-r3

COPY package*.json $DIR

RUN npm ci

COPY tsconfig*.json $DIR

COPY src $DIR/src

RUN npm run build && \ npm prune --production


FROM base AS production

ENV USER=node
ENV NODE_ENV=production

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/package.json .
COPY --from=build $DIR/package-lock.json .
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist


USER $USER
EXPOSE $PORT

CMD ["dumb-init", "node", "dist/index.js"]