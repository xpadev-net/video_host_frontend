ARG NODE_VERSION=20-slim

# Build phase
FROM node:$NODE_VERSION AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Prepare node_modules
COPY ./ ./

# Run phase
FROM node:$NODE_VERSION AS runner

LABEL org.opencontainers.image.source=https://github.com/xpadev-net/video_host_frontend
WORKDIR /app

COPY --from=builder /app ./

# Copy artifacts
CMD ["./start.sh"]