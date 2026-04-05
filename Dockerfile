# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-slim AS builder

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# strip devDependencies in-place (native binaries already compiled)
RUN npm prune --omit=dev

# ── Stage 2: Run ─────────────────────────────────────────────────────────────
FROM node:20-slim

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist        ./dist
COPY --from=builder /app/server      ./server
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node_modules/.bin/tsx", "server/index.ts"]
