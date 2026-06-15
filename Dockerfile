# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=24.14.0-slim

FROM node:${NODE_VERSION} AS base
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

FROM base AS deps

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-audit --no-fund

FROM base AS development

ENV NODE_ENV=development
ENV NEXT_DEV_POLLING=1

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node scripts/docker/dev-entrypoint.sh /usr/local/bin/utekos-dev-entrypoint

RUN chmod +x /usr/local/bin/utekos-dev-entrypoint \
  && mkdir -p /app/.next /home/node/.npm \
  && chown -R node:node /app /home/node/.npm

USER node
EXPOSE 3000
ENTRYPOINT ["utekos-dev-entrypoint"]
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]

FROM base AS builder

ENV NODE_ENV=production
ENV NEXT_OUTPUT_STANDALONE=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN --mount=type=secret,id=app_env,required=false \
  if [ -f /run/secrets/app_env ]; then \
    set -a; \
    . /run/secrets/app_env; \
    set +a; \
  fi; \
  npm run build

FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public
RUN mkdir -p .next && chown node:node .next
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
