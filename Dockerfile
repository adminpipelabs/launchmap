# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# native deps for better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# strip devDependencies in-place (native binaries already compiled)
RUN npm prune --omit=dev

# ── Stage 2: Run ─────────────────────────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist        ./dist
COPY --from=builder /app/server      ./server
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["node_modules/.bin/tsx", "server/index.ts"]
