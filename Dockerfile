# ---- Base image
FROM node:20-alpine AS base
WORKDIR /app

# ---- Dependencies for building
FROM base AS builder
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

ENV SEED=true
ENV COUNT=30

RUN ["node", "dist/scripts/seed.js"]

FROM base AS production
RUN apk add --no-cache tini

COPY --chown=node:node --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup -g 1001 -S nodejs && adduser -S node -u 1001 -G nodejs

USER node

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
    --retries=3 CMD wget -qO- http://127.0.0.1:${PORT}/api/v1/health || exit 1

CMD ["node", "dist/main"]