FROM node:22.22.3-alpine

WORKDIR /app

COPY frontend/ ./frontend/
COPY shared/ ./shared/
COPY *.json ./
COPY *.js ./

RUN npm ci 
RUN npm run lint && npm run format:check

WORKDIR /app/frontend

CMD ["node", "run", "dev"]
