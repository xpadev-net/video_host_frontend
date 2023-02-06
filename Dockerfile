ARG NODE_VERSION=18-slim

# Build phase
FROM node:$NODE_VERSION AS builder
LABEL org.opencontainers.image.source=https://github.com/xpadev-net/video_host_re
WORKDIR /app

# Prepare node_modules
COPY ./src/ ./
RUN yarn install --frozen-lockfile --production


# Run phase
FROM node:$NODE_VERSION AS runner

WORKDIR /app

COPY --from=builder /app ./

# Copy artifacts
CMD ["./start.sh"]