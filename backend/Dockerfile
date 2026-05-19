FROM node:22.22.3-alpine as zona-backend

WORKDIR /app

# Copy only package.json for better layer caching

COPY package*.json ./
RUN npm ci && npm cache clean --force

# Install rest of dependencies

COPY backend/package*.json ./backend/  
RUN npm ci && npm cache clean --force

# Copy rest of files
COPY backend/ ./backend/
COPY shared/ ./shared/
COPY *.json ./
COPY *.js ./

RUN npm run lint && npm run format:check

WORKDIR /app/backend
RUN npm run build

CMD ["node", "./dist/backend/src/index.js"]
