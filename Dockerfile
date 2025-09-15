# ---- Base image
FROM node:20-alpine AS base
WORKDIR /app

# ---- Dependencies for building
FROM base AS builder
COPY package*.json ./
COPY . .
RUN npm install -g @nestjs/cli
RUN npm i

RUN npm run build

ENV SEED=true
ENV COUNT=30

# RUN ["node", "./dist/scripts/seed.js"]

FROM node:20-alpine AS production
RUN apk add --no-cache tini

WORKDIR /application

# COPY --from=builder /app/data/items.json ./data/items.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
    --retries=3 CMD wget -qO- http://127.0.0.1:${PORT}/api/v1/health || exit 1

CMD ["node", "dist/main"]