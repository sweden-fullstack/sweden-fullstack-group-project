FROM node:22.22.3-alpine

WORKDIR /app

COPY backend/ ./backend/
COPY shared/ ./shared/
COPY *.json ./
COPY *.js ./

RUN npm ci 
RUN npm run lint && npm run format:check

WORKDIR /app/backend

RUN npm run build

CMD ["node", "./dist/backend/src/index.js"]
