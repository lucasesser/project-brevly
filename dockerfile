FROM node:24.3.0-alpine

#Create app directory
WORKDIR /app

COPY --chown=node:node package*.json ./

RUN chown -R node:node /app

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
