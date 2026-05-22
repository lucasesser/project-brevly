FROM node:24.3.0-alpine

WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY --chown=node:node package*.json ./

RUN chown -R node:node /app

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3333

CMD ["sh", "-c", "until pg_isready -h pg -p 5432; do echo waiting for db; sleep 1; done; echo running migrations; yarn db:migrate; echo starting server; yarn dev"]