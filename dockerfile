FROM node:24.3.0-alpine

RUN npm install -g npm@latest

RUN mkdir -p /app && chown -R node:node /app

COPY --chown=node:node package*.json ./

#Create app directory
WORKDIR /app

USER node

RUN npm install

#RUN npm run build

EXPOSE 3333

CMD ["npm", "install"]
CMD ["npm", "run", "dev"]
