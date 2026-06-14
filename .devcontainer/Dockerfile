FROM mcr.microsoft.com/devcontainers/javascript-node:24-bookworm

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    curl \
    gh \
    git \
    jq \
    postgresql-client \
    redis-tools \
    ripgrep \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable
