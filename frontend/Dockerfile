FROM node:22.22.3-alpine as zona-frontend

WORKDIR /app

# Copy only package.json for better layer caching

COPY package*.json ./
COPY frontend/package*.json ./frontend/  

RUN npm ci 

# Copy rest of files

COPY frontend/ ./frontend/
COPY shared/ ./shared/
COPY *.json ./
COPY *.js ./

RUN npm run lint && npm run format:check

WORKDIR /app/frontend

CMD ["npm", "run", "dev"]
